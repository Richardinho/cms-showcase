import { Component, Input } from '@angular/core';
import {
	FormArray,
	FormGroup,
	FormControl,
	Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { tagsValidator, isNewProject } from './utils/tags.validator';
import { Project, AppState } from '../../model';

//  selectors
import { selectShowLoader } from '../../selectors/show-loader.selector';
import { selectLoadingTokens } from '../../selectors/ui.selector';

// actions
import {
	editProject,
	saveProject,
	deleteLocalProject,
	saveNewProjectRequest,
} from '../../actions/projects.action';

import { tagData } from '../../services/article.service';
import { formDataToProject } from './utils/form-data-to-project';
import { buildTagsFormGroup } from './utils/build-tags-form-group';


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

	savingProject$: Observable<boolean>;
	savingNewProject$: Observable<boolean>;

	saveProjectToken: string;
	saveNewProjectToken: string;

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

		this.saveProjectToken = this.project.id + 'sp';

		this.savingProject$ = this.store.pipe(
			select(selectLoadingTokens),
			map((loadingTokens: Array<string>) => {
				return loadingTokens.includes(this.saveProjectToken);
			}),
		);

		this.saveNewProjectToken = this.project.id + 'snp';

		this.savingNewProject$ = this.store.pipe(
			select(selectLoadingTokens),
			map((loadingTokens: Array<string>) => {
				return loadingTokens.includes(this.saveNewProjectToken);
			}),
		);
	}

	save() {
		const metadata = { 
			project: formDataToProject(this.form.value, this.project.id),
			loadingToken: this.saveProjectToken,
		};

		const action = saveProject(metadata);

		this.store.dispatch(action);
	}

	saveNewProject() {
		const metadata = {
			project: formDataToProject(this.form.value, this.project.id),
			loadingToken: this.saveNewProjectToken,
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

	get title() {
		return this.form.get('title');
	}

	get href() {
		return this.form.get('href');
	}

	get tags() {
		return this.form.get('tags');
	}

	get tagList() {
		return tagData;
	}

	// todo: base this on form validity AND saved state
	get formDisabled() {
		return this.form.invalid;
	}
}
