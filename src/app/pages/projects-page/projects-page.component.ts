import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Project, AppState } from '../../model';
import { selectProjectLinks } from '../../selectors/project.selector';
import { projectsRequest, editProject } from '../../actions/projects.action';

@Component({
  templateUrl: './projects-page.component.html',
	styleUrls: ['./projects-page.component.scss'],
})
export class ProjectsPageComponent {

	projectLinks$: Observable<Array<Project>>;

  constructor(
    private store: Store<AppState>
  ) {}

	ngOnInit() {

		this.projectLinks$ = this.store.pipe(select(selectProjectLinks));

		this.store.dispatch(projectsRequest());
	}

	editProject(id: string) {
		this.store.dispatch(editProject({ id, edit: true }));
	}
}

