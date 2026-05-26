export type QuizCategory =
  | 'ingredients'
  | 'routine'
  | 'spf'
  | 'myths'
  | 'concerns'
  | 'science';

export interface QuizQuestion {
  id: string;
  category: QuizCategory;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    category: 'ingredients',
    prompt: 'Which ingredient is best known for deep, multi-layer hydration?',
    options: ['Salicylic acid', 'Hyaluronic acid', 'Benzoyl peroxide', 'Witch hazel'],
    correctIndex: 1,
    explanation:
      'Hyaluronic acid holds up to 1000× its weight in water and plumps the skin at multiple depths.',
  },
  {
    id: 'q2',
    category: 'routine',
    prompt: 'In a morning routine, when should sunscreen be applied?',
    options: [
      'Before cleanser',
      'Between toner and serum',
      'As the very last step',
      'Only if you go outside',
    ],
    correctIndex: 2,
    explanation:
      'Sunscreen goes on as the final step every morning so it can form an unbroken protective film on top.',
  },
  {
    id: 'q3',
    category: 'spf',
    prompt: 'What does the “30” in SPF 30 actually measure?',
    options: [
      'Hours of protection',
      'Percentage of UV blocked',
      'How much longer skin can resist UVB burn',
      'Protection from blue light',
    ],
    correctIndex: 2,
    explanation:
      'SPF measures how much longer your skin tolerates UVB before burning — not hours of wear.',
  },
  {
    id: 'q4',
    category: 'myths',
    prompt: 'True or false: Oily skin doesn’t need a moisturiser.',
    options: ['True', 'False'],
    correctIndex: 1,
    explanation:
      'Skipping moisturiser can push oily skin to overproduce sebum. Lightweight, non-comedogenic hydration is key.',
  },
  {
    id: 'q5',
    category: 'ingredients',
    prompt: 'Which ingredient is famous for brightening dull skin and fading dark spots?',
    options: ['Niacinamide', 'Squalane', 'Centella asiatica', 'Shea butter'],
    correctIndex: 0,
    explanation:
      'Niacinamide (vitamin B3) interrupts melanin transfer to surface cells, evening tone over time.',
  },
  {
    id: 'q6',
    category: 'routine',
    prompt: 'Which actives generally should NOT be layered in the same routine?',
    options: [
      'Niacinamide + hyaluronic acid',
      'Vitamin C + ceramides',
      'Retinol + AHA exfoliants',
      'Squalane + peptides',
    ],
    correctIndex: 2,
    explanation:
      'Stacking retinol with strong AHAs can over-exfoliate and trigger irritation. Alternate them on different nights.',
  },
  {
    id: 'q7',
    category: 'concerns',
    prompt: 'For sensitive, reactive skin, which ingredient is the gentlest pick?',
    options: ['Glycolic acid', 'Centella asiatica (cica)', 'Fragrance complex', 'Pure menthol'],
    correctIndex: 1,
    explanation:
      'Cica calms redness and supports the skin barrier — it’s a hero for sensitivity-prone skin.',
  },
  {
    id: 'q8',
    category: 'science',
    prompt: 'Which skin layer does most of your routine actually treat?',
    options: ['Hypodermis', 'Dermis', 'Stratum corneum', 'Subcutaneous fat'],
    correctIndex: 2,
    explanation:
      'Topical skincare mainly acts on the stratum corneum — the outermost layer of the epidermis.',
  },
  {
    id: 'q9',
    category: 'myths',
    prompt: 'How often should sunscreen be reapplied while outdoors?',
    options: ['Once is enough', 'Every 2 hours', 'Only after swimming', 'Only at noon'],
    correctIndex: 1,
    explanation: 'Reapply every two hours outdoors, and right after sweating or towelling off.',
  },
  {
    id: 'q10',
    category: 'ingredients',
    prompt: 'Which ingredient supports the moisture barrier by mimicking natural skin lipids?',
    options: ['Ceramides', 'Alcohol denat.', 'Charcoal', 'Sulfur'],
    correctIndex: 0,
    explanation:
      'Ceramides replace the lipid “mortar” between skin cells, sealing moisture and shielding from irritants.',
  },
  {
    id: 'q11',
    category: 'concerns',
    prompt: 'For visible pores and oily T-zone, which active is most studied?',
    options: ['Coconut oil', 'Salicylic acid (BHA)', 'Argan oil', 'Shea butter'],
    correctIndex: 1,
    explanation:
      'Salicylic acid is oil-soluble so it dissolves debris inside pores, refining texture over time.',
  },
  {
    id: 'q12',
    category: 'science',
    prompt: 'Roughly how long is a full skin cell turnover cycle for a healthy adult?',
    options: ['2 days', '7 days', '~28 days', '6 months'],
    correctIndex: 2,
    explanation:
      'It takes around 28 days — that’s why results from a new routine usually appear after a full cycle.',
  },
];
