import { Component, OnInit } from '@angular/core';
import { AppState } from '../../model';
import { combineLatest, Observable, merge, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { metadataRequest } from '../../actions/metadata.action';
import {
	putMetadataIntoStore,
	updateMetadataRequest } from '../../actions/update-metadata.action';

import { selectMetadata } from '../../selectors/metadata.selector';
import { selectLoadingTokens } from '../../selectors/ui.selector';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators } from '@angular/forms';

// should it be called MetadataPageComponent?
@Component({
  templateUrl: './configuration-page.component.html',
  styleUrls: ['./configuration-page.component.scss'],
})
export class ConfigurationPageComponent implements OnInit {
  metadata$: Observable<any>;
  showLoader$: Observable<boolean>;
	disabled$: Observable<boolean>;
	formGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) {}


  update() {
		return () => {
		  const action = updateMetadataRequest({
				metadata: this.formGroup.value,
				loadingToken: '__configuration_github_url__',
			});

			this.store.dispatch(action);
		};
  }

  ngOnInit() {
		// configure loader component
		this.formGroup = new FormGroup({
			github_url: new FormControl('', Validators.required),
		});

		this.formGroup.valueChanges.subscribe((value) => {
			this.store.dispatch(putMetadataIntoStore({ metadata: value }));
		});

		this.showLoader$ = this.store.pipe(
			select(selectLoadingTokens),
			map((loadingTokens: Array<string>) => {
				return loadingTokens.includes('__configuration_github_url__')
			}),
			startWith(false),
		);

    this.metadata$ = this.store.pipe(select(selectMetadata));
    this.metadata$.subscribe(metadata => {
      this.formGroup
        .patchValue({
					github_url: metadata.github_url
				}, { emitEvent: false})
    });

    this.disabled$ = combineLatest(
			this.showLoader$,
			this.formGroup.statusChanges.pipe(
				map(status => {
					return (status !== 'VALID');
				}),
				startWith(false),
		  ),
			this.metadata$.pipe(map((data) => {
				return data.saved;
			}))).pipe(
				map(([loading, invalid, saved]) => {
					return loading || invalid || saved;
				})
			);

		// when metadata in store is updated, update form

		//  dispatch action to request metadata from server
    this.store.dispatch(metadataRequest());
  }

	get githubUrl() {
		return this.formGroup.get('github_url');
	}
}

