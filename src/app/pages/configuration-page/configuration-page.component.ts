import {
	Component,
	Inject,
	OnInit,
} from '@angular/core';

import { AppState } from '../../model';

import { mergeMap } from 'rxjs/operators';
import { JWTToken } from '../../selectors/jwt-token.selector';

import { Store, select } from '@ngrx/store';

import { METADATA_SERVICE, IMetadataService } from '../../services/interfaces/metadata.service';

import {
  FormControl,
  FormGroup,
  Validators } from '@angular/forms';

// should it be called MetadataPageComponent?
@Component({
  templateUrl: './configuration-page.component.html',
  styleUrls: ['./configuration-page.component.scss'],
})
export class ConfigurationPageComponent implements OnInit {
	form: FormGroup;
	loadingInProgress: boolean;

  constructor(
    private store: Store<AppState>,
		@Inject(METADATA_SERVICE) private metadataService: IMetadataService,
  ) {}

  ngOnInit() {
		this.form = new FormGroup({
			github_url: new FormControl('', Validators.required),
		});

		this.store.pipe(
			select(JWTToken),
			mergeMap(token => this.metadataService.getMetadata(token)),
		).subscribe(metadata => {
				this.form.patchValue(metadata);
			});
  }

  update() {
		return () => {

			this.loadingInProgress = true;

			this.store.pipe(
				select(JWTToken),
				mergeMap(token => this.metadataService.putMetadata(token, this.form.value)),
			).subscribe(() => {
				this.loadingInProgress = false;
				this.form.markAsPristine();
			});
		};
  }

	get disabled() {
		return this.form.pristine || this.form.invalid || this.loadingInProgress;
	}

	get githubUrl() {
		return this.form.get('github_url');
	}
}

