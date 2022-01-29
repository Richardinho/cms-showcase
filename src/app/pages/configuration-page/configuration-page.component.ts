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
	form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) {}

  ngOnInit() {

		this.form = new FormGroup({
			github_url: new FormControl('', Validators.required),
		});

		/*
		 *  when form data changes, put this into store
		 */ 

		this.form.valueChanges.subscribe((value) => {
			const metadata = {
				metadata: value,
			};

			const action = putMetadataIntoStore(metadata);

			this.store.dispatch(action);
		});

		this.showLoader$ = this.store.pipe(
			select(selectLoadingTokens),
			map((loadingTokens: Array<string>) => {
				return loadingTokens.includes('__configuration_github_url__')
			}),
			startWith(false),
		);

		/*
		 *  get metadata from store
		 */

    this.metadata$ = this.store.pipe(select(selectMetadata));

		/*
		 *  when data in store changes, put this data into form
		 */

    this.metadata$.subscribe(metadata => {
      this.form
        .patchValue({
					github_url: metadata.github_url
				}, { emitEvent: false})
    });

    this.disabled$ = combineLatest(
			this.showLoader$,
			this.form.statusChanges.pipe(
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

		/*
		 *  dispatch request to fetch data from store
		 */

			this.store.dispatch(metadataRequest());
  }

  update() {
		return () => {
		  const action = updateMetadataRequest({
				metadata: this.form.value,
				loadingToken: '__configuration_github_url__',
			});

			this.store.dispatch(action);
		};
  }

	get githubUrl() {
		return this.form.get('github_url');
	}
}

