import {
	Component,
	EventEmitter,
	Inject,
	Input,
	Output,
} from '@angular/core';

import {
	FormArray,
	FormGroup,
	FormControl,
	Validators,
} from '@angular/forms';

import { AppState } from '../../../model';
import { LOGIN_SERVICE, ILoginService } from '../../../services/interfaces/login.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store'
import { startWith, tap, mergeMap, map } from 'rxjs/operators';

import { JWTToken } from '../../../selectors/jwt-token.selector';
import { tagsValidator, isNewProject } from './utils/tags.validator';
import { Project } from '../../../model';

import { IProjectService, PROJECT_SERVICE } from '../../../services/interfaces/project.service';
import { MessageService, ERROR, INFO } from '../../../services/message.service';

import { tagData } from '../../../tag-data';
import { formDataToProject } from './utils/form-data-to-project';

@Component({
	selector: 'project-edit-form',
  templateUrl: './project-edit-form.component.html',
	styleUrls: ['./project-edit-form.component.scss'],
})
export class ProjectEditFormComponent {

  constructor(
		@Inject(PROJECT_SERVICE) private projectService: IProjectService,
		private store: Store<AppState>,
		private messageService: MessageService,
  ) {}

	@Input()
	project: Project;

	@Output()
	onShowEdit: EventEmitter<{ id: string, show: boolean }> = new EventEmitter();

	@Output()
	onSavedProject: EventEmitter<Project> = new EventEmitter();

	form: FormGroup;
	loadingProgress: boolean = false;

	ngOnInit() {

		this.form = new FormGroup({
			id: new FormControl(this.project.id),
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
	}

	save() {
		return () => {
			this.loadingProgress = true;
			this.store.pipe(
				select(JWTToken),
				mergeMap((token) => this.projectService.updateProject(this.form.value, token)),
			).subscribe({

					next: () => {
						this.loadingProgress = false;
						this.onSavedProject.emit(this.form.value);
						this.form.markAsPristine();
						this.messageService.show('project saved to server', INFO);
					},

					error: () => {
						this.loadingProgress = false;
						this.messageService.show('an error occurred', ERROR);
					},
				});
		}
	}


	close() {
		this.onShowEdit.emit({
			id: this.project.id,
			show: false,
		});
	}

	cancel() {
		this.close();
	}

	get disabled() {
		return this.form.pristine || this.form.invalid || this.loadingProgress;
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
}
