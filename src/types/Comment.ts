export interface Comment {
    id: string;
    author: string;
    text: string | null;
    created_at: string;
    children: Comment[];
  }
  