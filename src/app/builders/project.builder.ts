import { Project } from '../model';

export class ProjectBuilder {
	private _id: string = '';
	private _title: string = '';
	private _href: string = '';
	private _published: boolean = false;
	private _tags: { [tag: string] : boolean } = {
		angular: false,
		react: false,
		javascript: false,
		css: false,
		'html-5': false,
	};

  id(id: string) {
		this._id = id;

		return this;
	}

	title(title: string) {
		this._title = title;

		return this;
	}

	href(href: string) {
		this._href = href;

		return this;
	}

	published(published: boolean) {
		this._published = published;

		return this;
	}

	tag(tag: string, selected: boolean) {
		this._tags[tag] = selected;

		return this;
	}

	build() {
		return {
			id: this._id,
			title: this._title,
			href: this._href,
			published: this._published,
			tags: this._tags,
		} as Project;
	};
};
