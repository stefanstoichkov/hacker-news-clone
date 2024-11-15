export interface PostDetails {
    id: string;
    title: string;
    text: string | null;
    points: number;
    author: string;
    created_at: string;
    children: Comment[];
  }
  