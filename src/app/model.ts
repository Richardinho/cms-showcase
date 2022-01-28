import { FormControlStatus } from '@angular/forms';
/*
 *  This is as the article is stored in the database, and as we receive it from the server
 *  We need to convert it into a different form for display and form controls
 */

interface Tag {
  name: string;
  value: boolean;
}

export interface RawArticle {
	id: string;
	title: string;
	date_created: string;
	date_edited: string;
	body: string;
	author: string;
	summary: string;
	tag1: string | null;
	tag2: string | null;
	tag3: string | null;
	published: boolean;
}

export interface Article {
  id: string;
  title: string;
  body: string;
  summary: string;
  published: boolean;
	tag1: string;
	tag2: string;
	tag3: string;
	// deprecate
  saved?: boolean;
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
	underEdit: boolean;
	published: boolean;
	tag1: string;
	tag2: string;
	tag3: string;
	saved?: boolean;
}

export interface RawIntro {
	intro_text: string
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

