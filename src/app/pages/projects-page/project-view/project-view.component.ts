import {
	Component,
	Input,
	EventEmitter,
	Output,
	Inject,
} from '@angular/core';

import {
	mergeMap,
	filter,
	tap,
	withLatestFrom,
} from 'rxjs/operators';

import { Store, select } from '@ngrx/store';
import { JWTToken } from '../../../selectors/jwt-token.selector';
import { DialogService } from '../../../services/dialog.service';
import { IProjectService, PROJECT_SERVICE } from '../../../services/interfaces/project.service';
import { ILoginService, LOGIN_SERVICE } from '../../../services/interfaces/login.service';
import { AppState, Project } from '../../../model';

@Component({
  selector: 'cms-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent {

	@Input() project: Project;

	@Output() onShowEdit: EventEmitter<{ id: string, show: boolean }> = new EventEmitter();

	@Output() onDelete: EventEmitter<string> = new EventEmitter();

	deletingProject: boolean = false;

  constructor(
    private dialogService: DialogService,
		@Inject(LOGIN_SERVICE) private loginService: ILoginService,
		@Inject(PROJECT_SERVICE) private projectService: IProjectService,
		private store: Store<AppState>,
  ) {}

	editProject() {
		this.onShowEdit.emit({ id: this.project.id, show: true });
	}

	deleteProject() {
		return () => {
			this.dialogService.confirm('Are you sure that you want to delete this project?')
			.pipe(
				filter(canDelete => canDelete),
				withLatestFrom(this.store.pipe(select(JWTToken))),
				tap(() => {
					this.deletingProject = true;
				}),
				mergeMap(([_, token]) => {

					return this.projectService.deleteProject(this.project.id, token);
				}),
			)
			.subscribe(() => {
				this.deletingProject = false;
				this.onDelete.emit(this.project.id);
			});
		}
	}

	get tags() {

		return Object.keys(this.project.tags).reduce((memo, key) => {
			if (this.project.tags[key]) {
				return [
					...memo,
					key,
				];
			}

			return memo;
		}, []);
	}
}
