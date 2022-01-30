import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { DialogService } from '../../services/dialog.service';
import { Project, AppState } from '../../model';

// selectors
import { selectProjects } from '../../selectors/project.selector';
import { selectLoadingTokens } from '../../selectors/ui.selector';

// actions
import {
	openEditForm,
	deleteProjectRequest,
	saveProjectRequest,
} from '../../actions/projects.action';

@Component({
  selector: 'cms-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {

	@Input() project: Project;

	deletingProject$: Observable<boolean>;

	deleteProjectToken: string;

  constructor(
    private store: Store<AppState>,
    private dialogService: DialogService,
  ) {}

  ngOnInit(): void {

		this.deleteProjectToken = this.project.id + 'dp';

    this.deletingProject$ = this.store.pipe(
			select(selectLoadingTokens),
			map((loadingTokens: Array<string>) => {
				return loadingTokens.includes(this.deleteProjectToken);
			}),
		);
  }

	editProject() {
		const metadata = {
			id: this.project.id,
			edit: true
		};

		this.store.dispatch(openEditForm(metadata));
	}

	publishProject(published: boolean) {
		// todo: rewrite according to conventions
		const updatedProject: Project = {
			...this.project,
			published,
		};

		this.store.dispatch(saveProjectRequest({
			loadingToken: '',
			project: updatedProject
		}));
	}

	deleteProject() {
		this.dialogService.confirm('Are you sure that you want to delete this project?')
			.subscribe((canDelete: any) => {
				if (canDelete) {
					this.store.dispatch(deleteProjectRequest({
						loadingToken: this.deleteProjectToken,
						id: this.project.id,
					}));
				}
			});
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
