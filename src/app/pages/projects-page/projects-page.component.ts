import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../model';
import { Observable } from 'rxjs';
import { selectProjects } from '../../selectors/ui.selector';
import { projectsRequest } from '../../actions/projects.action';
import {
	FormArray,
	FormGroup,
	FormControl,
	Validators,
} from '@angular/forms';

@Component({
  templateUrl: './projects-page.component.html',
	styleUrls: ['./projects-page.component.scss'],
})
export class ProjectsPageComponent {

	projects$: Observable<any>;

  constructor(
    private store: Store<AppState>
  ) {}

	hasError(project, property) {
		return project.get(property)?.errors?.required;
	}

	form: FormGroup = new FormGroup({
		projects : new FormArray([
			new FormGroup({
				title: new FormControl('apple'),
				href: new FormControl('google.com') }),
		]),
	});

	ngOnInit() {
		this.projects$ = this.store.pipe(select(selectProjects));
		this.projects$.subscribe((projects) => {

			// might be a simpler way of doing this
			
			this.projectsForm.clear();
			projects.forEach((project) => {
				this.projectsForm.push(new FormGroup({
					title: new FormControl(project.title, Validators.required),
					href: new FormControl(project.href, Validators.required),
				}));
			});
		});

		this.store.dispatch(projectsRequest());

	}

	get projectsForm() {
	   return this.form.get('projects') as FormArray;
	}
}

