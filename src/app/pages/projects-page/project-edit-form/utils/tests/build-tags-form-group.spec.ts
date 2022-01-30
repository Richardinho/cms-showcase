import { buildTagsFormGroup } from '../build-tags-form-group';
import { FormControl } from '@angular/forms';

describe('buildTagsFormGroup()', () => {
	it('should construct object with form controls', () => {
		const result: any = buildTagsFormGroup('angular', 'css');

		expect(result.angular.value).toEqual(true);
		expect(result.react.value).toEqual(false);
		expect(result.css.value).toEqual(true);
		expect(result['html-5'].value).toEqual(false);
		expect(result.javascript.value).toEqual(false);
	});
});
