import { Component, Input } from '@angular/core';
import {
	FormArray,
	FormGroup,
	FormControl,
	Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { tagsValidator, isNewProject } from './utils/tags.validator';
import { Project, AppState } from '../../model';
import { Observable } from 'rxjs';
import {
	editProject,
	saveProject,
	deleteLocalProject,
	saveNewProjectRequest,
} from '../../actions/projects.action';

import { tagData } from '../../services/article.service';

const formDataToProject = (project: any, id: string): Project => {
	const result: any = {};

	result.title = project.title;
	result.href = project.href;
	result.id = id;
	result.published = project.published;

	const [tag1=null, tag2=null, tag3=null] = Object.keys(project.tags).sort().reduce((result, tag) => {
		if (project.tags[tag]) {
			return [...result, tag];
		}

		return result;
	}, []);	

	result.tag1 = tag1;
	result.tag2 = tag2;
	result.tag3 = tag3;

	return result as Project;
};

const buildTagsFormGroup = (...tags) => {

	const result = tagData.reduce((result, tag) => {
		return { ...result, [tag]: new FormControl(tags.includes(tag)) };
	}, {});

	return result;new FormGroup(result);
};

@Component({
	selector: 'project-edit-form',
  templateUrl: './project-edit-form.component.html',
	styleUrls: ['./project-edit-form.component.scss'],
})
export class ProjectEditFormComponent {

  constructor(
    private store: Store<AppState>
  ) {}

	@Input()
	project: Project;

	newProject: boolean;

	form: FormGroup;

	ngOnInit() {
		this.form = new FormGroup({
			title: new FormControl(this.project.title, Validators.required),
			href: new FormControl(this.project.href, Validators.required),
			published: new FormControl(this.project.published),
			tags: new FormGroup(
				buildTagsFormGroup(
					this.project.tag1,
					this.project.tag2,
					this.project.tag3), tagsValidator),
		});

		this.newProject = isNewProject(this.project.id);
	}

	save() {
		const metadata = { 
			project: formDataToProject(this.form.value, this.project.id)
		};

		const action = saveProject(metadata);

		this.store.dispatch(action);
	}

	saveNewProject() {
		const metadata = {
			project: formDataToProject(this.form.value, this.project.id),
		};

		const action = saveNewProjectRequest(metadata);

		this.store.dispatch(action);
	}

	cancel() {
		const metadata = { 
			id: this.project.id,
			edit: false,
		};

		const action = editProject(metadata);

		this.store.dispatch(action);
	}

	cancelNewProject() {
		const metadata = {
			id: this.project.id,
		}

		const action = deleteLocalProject(metadata);

		this.store.dispatch(action);
	}

	get tagList() {
		return tagData;
	}

	get tags() {
		return this.form.get('tags');
	}

	get title() {
		return this.form.get('title');
	}

	get href() {
		return this.form.get('href');
	}

	get formDisabled() {
		return this.form.invalid;
	}
}
