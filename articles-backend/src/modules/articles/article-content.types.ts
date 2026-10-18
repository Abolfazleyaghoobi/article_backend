
export interface ParagraphBlock {
  type: "paragraph";
  text: string;
}

export interface HeadingBlock {
  type: "heading";
  level: 2 | 3 | 4;
  text: string;
}

export interface ListBlock {
  type: "list";
  style: "ordered" | "unordered";
  items: string[];
}

export interface CodeBlock {
  type: "code";
  language: string;
  code: string;
}

export interface ImageBlock {
  type: "image";
  url: string;
  alt: string;
  caption?: string;
}

export interface LinkBlock {
  type: "link";
  text: string;
  url: string;
}

export type ArticleContentBlock =
  | ParagraphBlock
  | HeadingBlock
  | ListBlock
  | CodeBlock
  | ImageBlock
  | LinkBlock;

export type ArticleContent = ArticleContentBlock[];
