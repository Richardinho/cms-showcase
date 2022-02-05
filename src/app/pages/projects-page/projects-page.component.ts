import { Component, Inject } from '@angular/core';
import { Project } from '../../model';

import { PROJECT_SERVICE, IProjectService } from '../../services/interfaces/project.service';
import { LOGIN_SERVICE, ILoginService } from '../../services/interfaces/login.service';

@Component({
  templateUrl: './projects-page.component.html',
	styleUrls: ['./projects-page.component.scss'],
})
export class ProjectsPageComponent {

	projectLinks: Array<Project>;
	projectsUnderEdit = [];

  constructor(
		@Inject(PROJECT_SERVICE) private projectService: IProjectService,
		@Inject(LOGIN_SERVICE) private loginService: ILoginService,
  ) {}

	ngOnInit() {
		const token = this.loginService.getToken();

		this.projectService.getProjects(token)
		.subscribe((projectLinks) => {
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
		const token = this.loginService.getToken();

		this.projectService.createProject(token).subscribe((newProject) => {
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

