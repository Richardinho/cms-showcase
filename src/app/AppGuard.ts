import { Injectable } from '@angular/core';
import { AppState } from './model';
import { Store, select } from '@ngrx/store';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	UrlTree,
	Router,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { JWTToken } from './selectors/jwt-token.selector';

@Injectable({
	providedIn: 'root',
})
export class AppGuard implements CanActivate {

	constructor(private store: Store<AppState>, private router: Router) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): UrlTree | Observable<boolean | UrlTree> {
			return this.store.pipe(select(JWTToken), map(jwt => {
				if (jwt) {
					return true;
				} 

				return this.router.parseUrl('/login');
			}));
	}

}
