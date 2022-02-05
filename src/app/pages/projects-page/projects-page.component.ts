import { Component, Inject } from '@angular/core';
import { Project, AppState } from '../../model';
import  { mergeMap, withLatestFrom } from 'rxjs/operators';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { PROJECT_SERVICE, IProjectService } from '../../services/interfaces/project.service';
import { LOGIN_SERVICE, ILoginService } from '../../services/interfaces/login.service';
import { selectJWTToken } from '../../selectors/article.selector';

@Component({
  templateUrl: './projects-page.component.html',
	styleUrls: ['./projects-page.component.scss'],
})
export class ProjectsPageComponent {

	projectLinks: Array<Project>;
	projectsUnderEdit = [];

  constructor(
		@Inject(PROJECT_SERVICE) private projectService: IProjectService,
		private store: Store<AppState>,
		private route: ActivatedRoute,
  ) {}

	ngOnInit() {

		this.route.paramMap.pipe(
			withLatestFrom(this.store.pipe(select(selectJWTToken))),
			mergeMap(([_, token]) => this.projectService.getProjects(token)),
		).subscribe((projectLinks) => {
			this.projectLinks = projectLinks;
		});
	}

	deleteProject(id: string) {
		this.projectsUnderEdit = this.projectsUnderEdit.filter((projectId) => {
			return projectId !== id;
		});

		this.projectLinks = this.projectLinks.filter(project => project.id !== id);
	}

	createProject() {
		this.store.pipe(
			select(selectJWTToken),
			mergeMap((token) => this.projectService.createProject(token)),
		).subscribe((newProject) => {
			this.projectLinks = [ newProject, ...this.projectLinks];
			this.projectsUnderEdit = [ ...this.projectsUnderEdit, newProject.id ];
			});
	}

	saveProject(project: Project) {
		this.projectLinks = this.projectLinks.map(projectLink => {
			if(project.id === projectLink.id) {
				return project;
			}

			return projectLink;
		});
	}

	showEditView(id: string) {
		return this.projectsUnderEdit.includes(id);
	}

	setEditView({ id, show }) {
		if (show) {
			this.projectsUnderEdit = [ ...this.projectsUnderEdit, id ];
		} else {
			this.projectsUnderEdit = this.projectsUnderEdit.filter((projectId) => {
				return projectId !== id;
			});
		}
	}

	trackByFn(index, item) {
		return item.id;
	}
}

