export type BlogTag = {
  id: string;
  name: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  created_at: string;
  updated_at: string;
  is_draft: boolean;
  tags: BlogTag[];
};
