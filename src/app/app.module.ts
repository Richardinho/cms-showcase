import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { articleServiceProvider } from './providers/article-service.provider';
import { loginServiceProvider } from './providers/login-service.provider';
import { introServiceProvider } from './providers/intro-service.provider';
import { metadataServiceProvider } from './providers/metadata-service.provider';
import { projectServiceProvider } from './providers/project-service.provider';

import { ArticlePageComponent } from './pages/article-page/article-page.component';
import { ConfigurationPageComponent } from './pages/configuration-page/configuration-page.component';
import { EditArticlePageComponent } from './pages/edit-article-page/edit-article-page.component';
import { IntroPageComponent } from './pages/intro-page/intro-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { StylesPageComponent } from './pages/styles-page/styles-page.component';
import { ViewArticlePageComponent } from './pages/view-article-page/view-article-page.component';

import { MarkdownToHTMLPipe } from './pipes/markdown-to-html.pipe';
import { MessageService } from './services/message.service';

import { MessageWidgetComponent } from './components/message-widget/message-widget.component';
import { ProjectEditFormComponent } from './pages/projects-page/project-edit-form/project-edit-form.component';
import { CTAComponent } from './components/cta/cta.component';

// reducers
import { logInReducer } from './reducers/logged-in.reducer';

// add this to styles page
import { SpinnerComponent } from './pages/configuration-page/spinner';

import { LogInEffects } from './effects/login.effect';

import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProjectViewComponent } from './pages/projects-page/project-view/project-view.component';

@NgModule({
  declarations: [
		CTAComponent,
		IntroPageComponent,
		MenuPageComponent,
		PageNotFoundComponent,
		ProjectEditFormComponent,
		ProjectsPageComponent,
    AppComponent,
    ArticlePageComponent,
    CheckboxComponent,
    ConfigurationPageComponent,
    EditArticlePageComponent,
    LoginPageComponent,
    MarkdownToHTMLPipe,
    MessageWidgetComponent,
    SpinnerComponent,
    StylesPageComponent,
    ViewArticlePageComponent,
    ProjectViewComponent,
  ],
  imports: [
    ReactiveFormsModule,
		FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      jwt_token: logInReducer,
    }),
		StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    EffectsModule.forRoot([
      LogInEffects,
    ])
  ],
  providers: [
    MessageService,
		metadataServiceProvider,
		introServiceProvider,
		articleServiceProvider,
		loginServiceProvider,
		projectServiceProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
