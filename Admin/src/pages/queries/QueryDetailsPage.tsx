import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Mail, MessageCircleReply, Phone, Send, User } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useContactQuery, useReplyQuery } from "@/hooks/useQueries";
import { ROUTES } from "@/constants/routes";
import { formatDateTime, getInitials } from "@/lib/utils";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Modal } from "@/components/modals/Modal";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

export default function QueryDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: query, isLoading } = useContactQuery(id);
  const reply = useReplyQuery();
  const [replyOpen, setReplyOpen] = useState(false);
  const [message, setMessage] = useState("");

  if (isLoading || !query) return <Skeleton className="h-96 w-full" />;

  return (
    <div className="space-y-6">
      <PageHeader
        title={query.subject}
        description={`From ${query.name} · ${formatDateTime(query.createdAt)}`}
        actions={
          <>
            <Button asChild variant="outline">
              <Link to={ROUTES.QUERIES}>
                <ArrowLeft className="h-4 w-4" /> Back
              </Link>
            </Button>
            <Button onClick={() => setReplyOpen(true)}>
              <MessageCircleReply className="h-4 w-4" /> Reply
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Message</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 rounded-lg bg-muted/40 p-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback>{getInitials(query.name)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-semibold">{query.name}</p>
                <p className="text-xs text-muted-foreground">{query.email}</p>
              </div>
              <StatusBadge status={query.status} />
              <StatusBadge status={query.priority} />
            </div>
            <p className="rounded-lg border border-border bg-white p-4 text-sm leading-relaxed">
              {query.message}
            </p>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <User className="h-4 w-4" /> {query.name}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> {query.email}
              </p>
              {query.phone && (
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4" /> {query.phone}
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Manage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Status</Label>
                <Select defaultValue={query.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="in-progress">In progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Priority</Label>
                <Select defaultValue={query.priority}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Assigned to</Label>
                <Input defaultValue={query.assignedTo?.name ?? ""} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="relative space-y-3 border-l border-border pl-4">
                {query.timeline.map((t) => (
                  <li key={t.id}>
                    <span className="absolute -left-[7px] flex h-3 w-3 items-center justify-center rounded-full bg-leaf-500 ring-2 ring-white" />
                    <p className="text-sm font-medium">{t.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.actor} · {formatDateTime(t.at)}
                    </p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>

      <Modal
        open={replyOpen}
        onOpenChange={setReplyOpen}
        title={`Reply to ${query.name}`}
        description={query.email}
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setReplyOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (!message.trim()) return;
                reply.mutateAsync({ id: query.id, message }).then(() => {
                  toast.success("Reply sent");
                  setMessage("");
                  setReplyOpen(false);
                });
              }}
            >
              <Send className="h-4 w-4" /> Send reply
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <Input defaultValue={`Re: ${query.subject}`} />
          <Textarea
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your reply…"
          />
        </div>
      </Modal>
    </div>
  );
}
