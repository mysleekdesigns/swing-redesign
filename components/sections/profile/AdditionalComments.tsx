import { MessageSquare, Edit3, Clock } from "lucide-react";

interface Comment {
  id: string;
  title: string;
  content: string;
  category: string;
  timestamp: string;
}

interface AdditionalCommentsProps {
  comments: Comment[];
  formatActivityTime: (timestamp: string) => string;
}

export function AdditionalComments({ comments, formatActivityTime }: AdditionalCommentsProps) {
  if (!comments || comments.length === 0) return null;

  return (
    <div className="p-4 sm:p-6 rounded-3xl bg-card border border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          Additional Notes
        </h2>
        <button className="p-2 rounded-lg hover:bg-muted transition-colors">
          <Edit3 className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="p-4 rounded-2xl bg-muted/30 border border-border hover:bg-muted/50 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-foreground">{comment.title}</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium capitalize">
                {comment.category}
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-2">{comment.content}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{formatActivityTime(comment.timestamp)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}