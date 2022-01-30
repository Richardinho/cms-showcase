import { Component, Input } from '@angular/core';
import {
	FormArray,
	FormGroup,
	FormControl,
	Validators,
} from '@angular/forms';

import { Observable } from 'rxjs';
import { startWith, tap, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { tagsValidator, isNewProject } from './utils/tags.validator';
import { Project, AppState } from '../../../model';

//  selectors
import { selectLoadingTokens } from '../../../selectors/ui.selector';
import { selectProjects } from '../../../selectors/project.selector';

// actions
import {
	openEditForm,
	saveProjectRequest,
	deleteLocalProject,
	saveNewProjectRequest,
	putProjectIntoStore,
} from '../../../actions/projects.action';

import { tagData } from '../../../tag-data';
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

	showLoader$: Observable<boolean>;
	showNewProjectLoader$: Observable<boolean>;

	project$: Observable<Project>;
	saveProjectToken: string;
	saveNewProjectToken: string;

	ngOnInit() {

		this.form = new FormGroup({
			title: new FormControl(this.project.title, Validators.required),
			href: new FormControl(this.project.href, Validators.required),
			published: new FormControl(this.project.published),
			tags: new FormGroup({
				'angular': new FormControl(this.project.tags['angular']),
				'html-5': new FormControl(this.project.tags['html-5']),
				'javascript': new FormControl(this.project.tags['javascript']),
				'react': new FormControl(this.project.tags['react']),
				'css': new FormControl(this.project.tags['css']),
			}, tagsValidator),
		});

		this.newProject = isNewProject(this.project.id);

		/*
		 *  when form data changes, put this into store
		 */ 


		this.form.valueChanges.subscribe((value) => {

			const metadata = {
				data: {
					...value,
					id: this.project.id,
				},
			};

			const action = putProjectIntoStore(metadata);

			this.store.dispatch(action);
		});


		/*
		 *  get article from store
		 */

		/*
		this.project$ = this.store.pipe(
			select(selectProjects),
			map((projects) => {
				return projects.find(project => project.id === this.id);
			}),
		);
		*/

		/*
		 *  when data in store changes, put this data into form
		 */

		/*
		this.project$.subscribe(project => {

			const formData = {
				title: project.title,
				href: project.href,
				published: project.published,
				tags: project.tags,
			};
			this.form.patchValue(formData, {emitEvent: false});
		});
		*/


		/*
		 *  show loader animation when request is in transit
		 */

		this.saveProjectToken = this.project.id + 'sp';

		this.showLoader$ = this.store.pipe(
			select(selectLoadingTokens),
			map((loadingTokens: Array<string>) => {
				return loadingTokens.includes(this.saveProjectToken);
			}),
		);

		this.saveNewProjectToken = this.project.id + 'snp';

		this.showNewProjectLoader$ = this.store.pipe(
			select(selectLoadingTokens),
			map((loadingTokens: Array<string>) => {
				return loadingTokens.includes(this.saveNewProjectToken);
			}),
		);

		/*
		 *  the update CTA should be disabled when:
		 *  1. changes are in transit to server
		 *  2. form input is invalid
		 *  3. there are no local changes requiring to be saved 
		 */

		 const formInvalid$ = this.form.statusChanges.pipe(
			 map(status => (status !== 'VALID')),
			 startWith(false),
		 );


	}

	save() {
		return () => {
			const metadata = { 
				loadingToken: this.saveProjectToken,
				project: this.project,
			};

			const action = saveProjectRequest(metadata);

			this.store.dispatch(action);
		};
	}

	saveNewProject() {
		return () => {
			const metadata = {
				project: formDataToProject(this.form.value, this.project.id),
				loadingToken: this.saveNewProjectToken,
			};

			const action = saveNewProjectRequest(metadata);

			this.store.dispatch(action);
		};
	}

	cancel() {
		const metadata = { 
			id: this.project.id,
			edit: false,
		};

		const action = openEditForm(metadata);

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
