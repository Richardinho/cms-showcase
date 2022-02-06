import {
	Component,
	Inject,
	OnInit,
} from '@angular/core';

import { Metadata, AppState } from '../../model';

import { mergeMap } from 'rxjs/operators';
import { JWTToken } from '../../selectors/jwt-token.selector';
import { ERROR, INFO, MessageService } from '../../services/message.service';

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
		private messageService: MessageService,
  ) {}

  ngOnInit() {
		this.form = new FormGroup({
			github_url: new FormControl('', Validators.required),
		});

		this.store.pipe(
			select(JWTToken),
			mergeMap(token => this.metadataService.getMetadata(token)),
		).subscribe({
				next: (metadata: Metadata) => {
					this.form.patchValue(metadata);
				},

				error: (err) => {
					this.messageService.show('An error occurred. Please check your network', ERROR);
				},
			});
  }

  update() {
		return () => {

			this.loadingInProgress = true;

			this.store.pipe(
				select(JWTToken),
				mergeMap(token => this.metadataService.putMetadata(token, this.form.value)),
			).subscribe({
					next: () => {
						this.loadingInProgress = false;
						this.form.markAsPristine();
						this.messageService.show('Changes saved to server', INFO);
					},

					error: () => {
						this.loadingInProgress = false;
						this.messageService.show('An error occurred', ERROR);
					},
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

