'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  Check,
  Clock,
  Flame,
  Gift,
  Heart,
  RotateCcw,
  Share2,
  ShoppingBag,
  Sparkles,
  Star,
  Trophy,
  X,
  Zap,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { awardPoints, recordQuizResult } from '@/store/slices/rewards-slice';
import { QUIZ_QUESTIONS, type QuizQuestion } from '@/data/quiz';
import { cn } from '@/lib/utils';

type Phase = 'intro' | 'playing' | 'result';

const QUESTION_COUNT = 8;
const TIME_PER_QUESTION = 15;
const BASE_POINTS = 10;
const TIME_BONUS_MAX = 10;
const STREAK_BONUS = 5;

function pickQuestions(): QuizQuestion[] {
  const pool = [...QUIZ_QUESTIONS];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j]!, pool[i]!];
  }
  return pool.slice(0, QUESTION_COUNT);
}

export function QuizClient() {
  const dispatch = useAppDispatch();
  const totalPoints = useAppSelector((s) => s.rewards.points);
  const bestScore = useAppSelector((s) => s.rewards.bestScore);
  const quizAttempts = useAppSelector((s) => s.rewards.quizAttempts);

  const [phase, setPhase] = useState<Phase>('intro');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [floaters, setFloaters] = useState<{ id: number; text: string }[]>([]);
  const [showBurst, setShowBurst] = useState<{ id: number; ok: boolean } | null>(null);
  const floaterId = useRef(0);

  const current = questions[index];
  const progress = questions.length ? ((index + (locked ? 1 : 0)) / questions.length) * 100 : 0;

  // Timer
  useEffect(() => {
    if (phase !== 'playing' || locked) return;
    if (timeLeft <= 0) {
      handleLock(null);
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, phase, locked]);

  const start = useCallback(() => {
    const qs = pickQuestions();
    setQuestions(qs);
    setIndex(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setCorrectCount(0);
    setSelected(null);
    setLocked(false);
    setTimeLeft(TIME_PER_QUESTION);
    setPointsEarned(0);
    setFloaters([]);
    setShowBurst(null);
    setPhase('playing');
  }, []);

  const pushFloater = (text: string) => {
    floaterId.current += 1;
    const id = floaterId.current;
    setFloaters((prev) => [...prev, { id, text }]);
    setTimeout(() => setFloaters((prev) => prev.filter((f) => f.id !== id)), 1100);
  };

  function handleLock(choice: number | null) {
    if (locked || !current) return;
    setLocked(true);
    setSelected(choice);

    const isCorrect = choice === current.correctIndex;
    let gained = 0;
    if (isCorrect) {
      const timeBonus = Math.round((timeLeft / TIME_PER_QUESTION) * TIME_BONUS_MAX);
      const streakBonus = streak * STREAK_BONUS;
      gained = BASE_POINTS + timeBonus + streakBonus;
      setScore((s) => s + gained);
      setCorrectCount((c) => c + 1);
      setStreak((s) => {
        const next = s + 1;
        setMaxStreak((m) => Math.max(m, next));
        return next;
      });
      pushFloater(`+${gained}`);
      setShowBurst({ id: Date.now(), ok: true });
    } else {
      setStreak(0);
      setShowBurst({ id: Date.now(), ok: false });
    }

    setTimeout(() => {
      if (index + 1 >= questions.length) {
        finalize(score + gained, isCorrect ? correctCount + 1 : correctCount, Math.max(maxStreak, isCorrect ? streak + 1 : 0));
      } else {
        setIndex((i) => i + 1);
        setSelected(null);
        setLocked(false);
        setTimeLeft(TIME_PER_QUESTION);
        setShowBurst(null);
      }
    }, 1450);
  }

  function finalize(finalScore: number, finalCorrect: number, finalStreak: number) {
    const accuracyBonus = finalCorrect === questions.length ? 25 : 0;
    const completion = 10;
    const total = finalScore + accuracyBonus + completion;
    setPointsEarned(total);
    dispatch(awardPoints({ points: total, source: 'Glow Quiz' }));
    dispatch(recordQuizResult({ score: finalScore, streak: finalStreak }));
    setPhase('result');
    toast.success(`+${total} Glow Points earned`, {
      description: 'Redeem them at checkout on your next order.',
    });
  }

  const sharedHeader = (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="grid size-9 place-items-center rounded-2xl bg-primary/15 text-primary">
          <Sparkles className="size-4" />
        </span>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            Glow Quiz
          </p>
          <h1 className="font-heading text-2xl font-semibold leading-tight sm:text-3xl">
            Play. Learn. Earn.
          </h1>
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-full border bg-card px-3.5 py-1.5 text-sm font-medium">
        <Gift className="size-4 text-primary" />
        <span className="tabular-nums">{totalPoints}</span>
        <span className="text-muted-foreground">Glow Points</span>
      </div>
    </div>
  );

  return (
    <div>
      {sharedHeader}

      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <IntroPanel
            key="intro"
            onStart={start}
            bestScore={bestScore}
            attempts={quizAttempts}
            points={totalPoints}
          />
        )}

        {phase === 'playing' && current && (
          <motion.div
            key={`q-${index}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="shadow-luxury relative overflow-hidden rounded-3xl border bg-card p-6 sm:p-8"
          >
            {/* HUD */}
            <div className="grid grid-cols-3 gap-3 text-xs sm:text-sm">
              <Stat icon={Trophy} label="Score" value={score.toLocaleString()} />
              <Stat
                icon={Flame}
                label="Streak"
                value={`${streak}×`}
                accent={streak >= 3}
              />
              <Stat
                icon={Clock}
                label="Time"
                value={`${timeLeft}s`}
                accent={timeLeft <= 5}
              />
            </div>

            {/* Progress bar */}
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-primary/60"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Question {index + 1} of {questions.length} · {current.category}
            </p>

            {/* Timer ring */}
            <div className="mt-6 flex items-start gap-5">
              <TimerRing seconds={TIME_PER_QUESTION} timeLeft={timeLeft} active={!locked} />
              <h2 className="flex-1 text-balance font-heading text-xl font-semibold leading-snug sm:text-2xl">
                {current.prompt}
              </h2>
            </div>

            {/* Options */}
            <ul className="mt-6 grid gap-2.5">
              {current.options.map((opt, i) => {
                const isCorrect = i === current.correctIndex;
                const isPicked = i === selected;
                const showCorrect = locked && isCorrect;
                const showWrong = locked && isPicked && !isCorrect;
                return (
                  <li key={i}>
                    <motion.button
                      type="button"
                      whileTap={{ scale: locked ? 1 : 0.98 }}
                      disabled={locked}
                      onClick={() => handleLock(i)}
                      className={cn(
                        'group flex w-full items-center gap-3 rounded-2xl border bg-background p-4 text-left transition-all',
                        !locked && 'hover:border-primary/50 hover:bg-primary/5',
                        showCorrect &&
                          'border-emerald-500/60 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100',
                        showWrong && 'border-rose-500/60 bg-rose-500/10',
                        locked && !showCorrect && !showWrong && 'opacity-60',
                      )}
                    >
                      <span
                        className={cn(
                          'grid size-8 shrink-0 place-items-center rounded-xl border text-xs font-semibold',
                          showCorrect && 'border-emerald-500 bg-emerald-500 text-white',
                          showWrong && 'border-rose-500 bg-rose-500 text-white',
                          !showCorrect && !showWrong && 'bg-muted',
                        )}
                      >
                        {showCorrect ? (
                          <Check className="size-4" />
                        ) : showWrong ? (
                          <X className="size-4" />
                        ) : (
                          String.fromCharCode(65 + i)
                        )}
                      </span>
                      <span className="flex-1 text-sm font-medium sm:text-base">{opt}</span>
                    </motion.button>
                  </li>
                );
              })}
            </ul>

            {/* Explanation */}
            <AnimatePresence>
              {locked && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={cn(
                    'mt-5 flex gap-3 rounded-2xl border p-4 text-sm',
                    selected === current.correctIndex
                      ? 'border-emerald-500/30 bg-emerald-500/5'
                      : 'border-rose-500/30 bg-rose-500/5',
                  )}
                >
                  <Sparkles className="size-4 shrink-0 text-primary" aria-hidden />
                  <p>
                    <span className="font-semibold">
                      {selected === current.correctIndex
                        ? 'Spot on!'
                        : selected === null
                          ? 'Time’s up. '
                          : 'Not quite. '}
                    </span>
                    {current.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Floaters */}
            <div className="pointer-events-none absolute right-6 top-6 text-right">
              <AnimatePresence>
                {floaters.map((f) => (
                  <motion.span
                    key={f.id}
                    initial={{ opacity: 0, y: 0, scale: 0.8 }}
                    animate={{ opacity: 1, y: -40, scale: 1 }}
                    exit={{ opacity: 0, y: -70 }}
                    transition={{ duration: 1 }}
                    className="block font-heading text-2xl font-semibold text-primary"
                  >
                    {f.text}
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>

            {/* Burst */}
            <AnimatePresence>
              {showBurst && (
                <FeedbackBurst key={showBurst.id} ok={showBurst.ok} />
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {phase === 'result' && (
          <ResultPanel
            key="result"
            score={score}
            correct={correctCount}
            total={questions.length}
            pointsEarned={pointsEarned}
            balance={totalPoints}
            maxStreak={maxStreak}
            onReplay={start}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function IntroPanel({
  onStart,
  bestScore,
  attempts,
  points,
}: {
  onStart: () => void;
  bestScore: number;
  attempts: number;
  points: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.25 }}
      className="shadow-luxury relative overflow-hidden rounded-3xl border bg-card p-6 sm:p-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-primary/15 blur-3xl"
      />
      <div className="relative">
        <Badge variant="soft" className="rounded-full">
          <Sparkles className="mr-1 size-3" /> 60 seconds of glow
        </Badge>
        <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight sm:text-4xl">
          Think you know your <em className="italic text-primary">skincare</em>?
        </h2>
        <p className="mt-3 max-w-xl text-muted-foreground">
          {QUESTION_COUNT} dermatologist-vetted questions. Answer fast, keep a streak, and rack up{' '}
          <strong className="text-foreground">Glow Points</strong> you can redeem at checkout.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <RuleCard
            icon={Clock}
            title={`${TIME_PER_QUESTION}s per question`}
            body="Faster answers = bigger time bonus."
          />
          <RuleCard
            icon={Flame}
            title="Streak multiplier"
            body={`Each correct in a row adds +${STREAK_BONUS} bonus pts.`}
          />
          <RuleCard
            icon={Gift}
            title="Real rewards"
            body="100 pts = $1 off your next order."
          />
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Button size="lg" onClick={onStart} className="rounded-full px-7">
            Start the quiz
            <ArrowRight className="size-4" />
          </Button>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Trophy className="size-3.5 text-primary" />
              Best: <strong className="text-foreground tabular-nums">{bestScore}</strong>
            </span>
            <span className="inline-flex items-center gap-1">
              <Zap className="size-3.5 text-primary" />
              Played: <strong className="text-foreground tabular-nums">{attempts}</strong>
            </span>
            <span className="inline-flex items-center gap-1">
              <Gift className="size-3.5 text-primary" />
              Balance: <strong className="text-foreground tabular-nums">{points}</strong>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function RuleCard({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Clock;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border bg-background/60 p-4">
      <Icon className="size-5 text-primary" />
      <p className="mt-2 font-medium">{title}</p>
      <p className="text-xs text-muted-foreground">{body}</p>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-2xl border bg-background/60 px-3 py-2',
        accent && 'border-primary/40 bg-primary/5 text-primary',
      )}
    >
      <Icon className="size-4" />
      <div className="leading-tight">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="font-heading font-semibold tabular-nums">{value}</p>
      </div>
    </div>
  );
}

function TimerRing({
  seconds,
  timeLeft,
  active,
}: {
  seconds: number;
  timeLeft: number;
  active: boolean;
}) {
  const radius = 26;
  const circ = 2 * Math.PI * radius;
  const ratio = Math.max(0, Math.min(1, timeLeft / seconds));
  const offset = circ * (1 - ratio);
  const danger = timeLeft <= 5 && active;
  return (
    <div className="relative grid size-16 shrink-0 place-items-center">
      <svg className="size-16 -rotate-90" viewBox="0 0 64 64" aria-hidden>
        <circle cx="32" cy="32" r={radius} fill="none" className="stroke-muted" strokeWidth="5" />
        <motion.circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          strokeWidth="5"
          strokeLinecap="round"
          className={cn('stroke-primary', danger && 'stroke-rose-500')}
          strokeDasharray={circ}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.6, ease: 'linear' }}
        />
      </svg>
      <span
        className={cn(
          'absolute font-heading text-lg font-semibold tabular-nums',
          danger && 'text-rose-600',
        )}
      >
        {timeLeft}
      </span>
    </div>
  );
}

function FeedbackBurst({ ok }: { ok: boolean }) {
  if (ok) {
    const pieces = Array.from({ length: 14 });
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {pieces.map((_, i) => {
          const angle = (i / pieces.length) * Math.PI * 2;
          const dist = 120 + Math.random() * 60;
          return (
            <motion.span
              key={i}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
              animate={{
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                opacity: 0,
                scale: 1,
                rotate: Math.random() * 360,
              }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute left-1/2 top-1/2 size-2 rounded-sm"
              style={{
                backgroundColor: i % 3 === 0 ? 'hsl(var(--primary))' : i % 3 === 1 ? '#f5d491' : '#a3d9b1',
              }}
            />
          );
        })}
      </div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0.4 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pointer-events-none absolute inset-0 bg-rose-500/15"
    />
  );
}

function ResultPanel({
  score,
  correct,
  total,
  pointsEarned,
  balance,
  maxStreak,
  onReplay,
}: {
  score: number;
  correct: number;
  total: number;
  pointsEarned: number;
  balance: number;
  maxStreak: number;
  onReplay: () => void;
}) {
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
  const rank = useMemo(() => {
    if (accuracy === 100) return { title: 'Skin Sage', emoji: '🌿', color: 'text-emerald-600' };
    if (accuracy >= 80) return { title: 'Glow Guru', emoji: '✨', color: 'text-primary' };
    if (accuracy >= 60) return { title: 'Routine Rookie', emoji: '💧', color: 'text-sky-600' };
    return { title: 'Curious Beginner', emoji: '🌱', color: 'text-amber-600' };
  }, [accuracy]);

  const badges: { label: string; icon: typeof Trophy; earned: boolean }[] = [
    { label: 'Perfect Run', icon: Trophy, earned: correct === total },
    { label: `Streak ${maxStreak}×`, icon: Flame, earned: maxStreak >= 3 },
    { label: 'Sharp Eye', icon: Star, earned: accuracy >= 75 },
    { label: 'First Quiz', icon: Heart, earned: true },
  ];

  const share = async () => {
    const text = `I scored ${score} on the Leaf & Lume Glow Quiz (${accuracy}%) and earned ${pointsEarned} Glow Points!`;
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({ title: 'Glow Quiz', text });
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        toast.success('Score copied to clipboard');
      }
    } catch {
      /* user cancelled */
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
      className="shadow-luxury relative overflow-hidden rounded-3xl border bg-card p-6 sm:p-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-0 size-72 rounded-full bg-primary/15 blur-3xl"
      />
      <div className="relative grid gap-8 sm:grid-cols-[1.1fr_1fr] sm:items-center">
        <div>
          <Badge variant="soft" className="rounded-full">
            <Award className="mr-1 size-3" /> Quiz complete
          </Badge>
          <h2 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">
            You&apos;re a <span className={cn('italic', rank.color)}>{rank.title}</span> {rank.emoji}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {correct}/{total} correct · {accuracy}% accuracy · top streak {maxStreak}×
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <ResultStat label="Score" value={score.toLocaleString()} />
            <ResultStat label="Earned" value={`+${pointsEarned}`} accent />
            <ResultStat label="Balance" value={balance.toLocaleString()} />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {badges.map((b) => {
              const Icon = b.icon;
              return (
                <span
                  key={b.label}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium',
                    b.earned
                      ? 'border-primary/40 bg-primary/10 text-primary'
                      : 'border-dashed border-muted-foreground/30 text-muted-foreground/60',
                  )}
                >
                  <Icon className="size-3.5" />
                  {b.label}
                </span>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border bg-primary/5 p-5">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Gift className="size-4" />
            Use your Glow Points
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Every <strong className="text-foreground">100 pts</strong> unlocks{' '}
            <strong className="text-foreground">$1 off</strong> at checkout. They&apos;re saved to
            your browser and waiting on your next order.
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <Button asChild className="rounded-full">
              <Link href="/shop">
                <ShoppingBag className="size-4" /> Shop & redeem
              </Link>
            </Button>
            <Button variant="outline" onClick={onReplay} className="rounded-full">
              <RotateCcw className="size-4" /> Play again
            </Button>
            <Button variant="ghost" onClick={share} className="rounded-full">
              <Share2 className="size-4" /> Share my score
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ResultStat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border bg-background/70 p-3',
        accent && 'border-primary/40 bg-primary/10',
      )}
    >
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p
        className={cn(
          'mt-1 font-heading text-xl font-semibold tabular-nums',
          accent && 'text-primary',
        )}
      >
        {value}
      </p>
    </div>
  );
}
