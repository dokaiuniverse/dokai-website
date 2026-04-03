type News = {
  id: string;
  slug: string;
  category: string;
  title: string;
  date: Date;
  view: number;
  chapters: NewsChapter[];
  url: string;
};

type NewsChapter = {
  title: string;
  contents: NewsChapterContent[];
};

type NewsChapterContent = {
  type: "TEXT" | "MEDIA" | "LINK";
  content: string | MediaSource | string;
};
