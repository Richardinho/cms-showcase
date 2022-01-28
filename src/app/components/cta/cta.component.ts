import { Component, Input } from '@angular/core';

@Component({
	selector: 'cms-cta',
  templateUrl: './cta.component.html',
  styleUrls: ['./cta.component.scss'],
})
export class CTAComponent {

	@Input() loading: boolean;
	@Input() disabled: boolean;
	@Input() onClick: any;

	clickHandler() {
		this.onClick();
	}
}
