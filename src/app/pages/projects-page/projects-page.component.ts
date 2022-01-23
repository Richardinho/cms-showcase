import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { DialogService } from '../../services/dialog.service';
import { Project, AppState } from '../../model';
import { selectProjectLinks } from '../../selectors/project.selector';
import {
	projectsRequest,
	editProject,
	deleteProject,
	projectDeletedResponse,
} from '../../actions/projects.action';

@Component({
  templateUrl: './projects-page.component.html',
	styleUrls: ['./projects-page.component.scss'],
})
export class ProjectsPageComponent {

	projectLinks$: Observable<Array<Project>>;

  constructor(
    private store: Store<AppState>,
    private dialogService: DialogService,
  ) {}

	ngOnInit() {

		this.projectLinks$ = this.store.pipe(select(selectProjectLinks));

		this.store.dispatch(projectsRequest());
	}

	editProject(id: string) {
		this.store.dispatch(editProject({ id, edit: true }));
	}

	deleteProject(id: string) {
		this.dialogService.confirm('Are you sure that you want to delete this project?')
			.subscribe((canDelete: any) => {
				if (canDelete) {
					this.store.dispatch(deleteProject({ id }));
				}
			});
	}
}

