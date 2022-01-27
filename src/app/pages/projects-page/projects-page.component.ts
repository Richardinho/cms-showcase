import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { DialogService } from '../../services/dialog.service';
import { Project, AppState } from '../../model';
import { selectProjects } from '../../selectors/project.selector';
import { selectShowLoader } from '../../selectors/show-loader.selector';
import {
	projectsRequest,
	editProject,
	deleteProject,
	projectDeletedResponse,
	saveProject,
	createProjectRequest,
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

		this.projectLinks$ = this.store.pipe(select(selectProjects));
		this.store.dispatch(projectsRequest());
	}


	createProject() {
		const action = createProjectRequest();

		this.store.dispatch(action);
	}

}

