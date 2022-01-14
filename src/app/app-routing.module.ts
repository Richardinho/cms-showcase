import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditArticlePageComponent } from './pages/edit-article-page/edit-article-page.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ArticlePageComponent } from './pages/article-page/article-page.component';
import { IntroPageComponent } from './pages/intro-page/intro-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ViewArticlePageComponent } from './pages/view-article-page/view-article-page.component';
import { ConfigurationPageComponent } from './pages/configuration-page/configuration-page.component';
import { StylesPageComponent } from './pages/styles-page/styles-page.component';

import { AppGuard } from './AppGuard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: '',
    component: MenuPageComponent,
		canActivate: [AppGuard],
  },
	{
		path: 'intro',
		component: IntroPageComponent,
		canActivate: [AppGuard],
	},
	{
		path: 'article-list',
		component: ArticlePageComponent,
		canActivate: [AppGuard],
	},
  {
    path: 'view-article/:id',
    component: ViewArticlePageComponent,
		canActivate: [AppGuard],
  },
  {
    path: 'edit-article/:id',
    component: EditArticlePageComponent,
		canActivate: [AppGuard],
  },
  {
    path: 'metadata',
    component: ConfigurationPageComponent,
		canActivate: [AppGuard],
  },
  {
    path: 'styles',
    component: StylesPageComponent,
		canActivate: [AppGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
