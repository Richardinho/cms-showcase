
export interface RawIntro {
	intro_text: string
}

export interface RawArticle {
	author: string;
	body: string;
	date_created: string | null;
	date_edited: string | null;
	id: string;
	published: boolean; // note that projects have this as 1 or 0
	summary: string;
	tag1: string | null;
	tag2: string | null;
	tag3: string | null;
	title: string;
}

export interface RawProject {
	href: string;
	id: string;
	published: "1" | "0";
	tag1: string | null;
	tag2: string | null;
	tag3: string | null;
	title: string;
}

export interface RawArticleLink {
	id: string;
	published: false;
	summary: string;
	tag1: string | null;
	tag2: string | null;
	tag3: string | null;
	title: string;
}

export interface RawMetadata {
	email: string;
	github_url: string;
	location: string;
	website: string;
}

export interface Article {
  id: string;
  title: string;
  body: string;
  summary: string;
  published: boolean;
	tags?: {
		[tag: string]: boolean;
	},
  saved: boolean;
}


interface Tag {
  name: string;
  value: boolean;
}

export interface ArticleLink {
	id: string;
	published: boolean;
	title: string;
}

export interface EditArticleView {

	id: string;
	title: string;
	body: string;
	summary: string;
	tags: {
		[tag: string]: boolean;
	}
}

export interface Project {
	id: string;
	title: string;
	href: string;
	underEdit?: boolean;
	published: boolean;
	tags: {
		[tag: string]: boolean;
	},
	saved?: boolean;
}

export interface Intro {
	body: string;
	saved: boolean;
}

export interface Metadata {
  github_url: string;
	saved: boolean;
}

export interface Articles {
  [id: string]: Article;
}

export interface UI {
  saving: boolean;
  id_of_article_under_edit: string;
  articleLinks: Array<any>;
	loadingTokens: Array<string>;
}

export interface AppState {
  articles: Articles;
	projects: Array<Project>;
  ui: UI;
  jwt_token: string;
  metadata: Metadata;
	intro: Intro;
}

