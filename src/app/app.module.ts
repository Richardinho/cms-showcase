import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { IntroPageComponent } from './pages/intro-page/intro-page.component';
import { ArticlePageComponent } from './pages/article-page/article-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ViewArticlePageComponent } from './pages/view-article-page/view-article-page.component';
import { EditArticlePageComponent } from './pages/edit-article-page/edit-article-page.component';
import { ConfigurationPageComponent } from './pages/configuration-page/configuration-page.component';
import { StylesPageComponent } from './pages/styles-page/styles-page.component';

import { MarkdownToHTMLPipe } from './pipes/markdown-to-html.pipe';
import { AuthorisationService } from './services/authorisation.service';
import { MessageService } from './message-service/message.service';
import { MessageWidgetComponent } from './message-widget/message-widget.component';
import { articlesReducer } from './reducers/articles.reducer';
import { introReducer } from './reducers/intro.reducer';
import { uiReducer } from './reducers/ui.reducer';
import { logInReducer } from './reducers/logged-in.reducer';
import { metadataReducer } from './reducers/metadata.reducer';
import { NavigationEffects } from './pages/view-article-page/effects/navigation.effect';
// add this to styles page
import { SpinnerComponent } from './pages/configuration-page/spinner';
import { DeleteArticleEffects } from './effects/delete-article.effect';
import { CreateArticleEffects } from './effects/create-article.effect';
import { MetadataService } from './services/metadata.service';
import { GetMetadataEffect } from './pages/configuration-page/effects/get-metadata.effect';
import { PutMetadataEffect } from './pages/configuration-page/effects/put-metadata.effect';
import { SaveArticleEffects } from './effects/save-article.effect';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { GetArticleEffects } from './effects/get-article.effect';
import { LogInEffects } from './effects/login.effect';
import { GetIntroEffects } from './effects/intro.effect';
import { LoadArticleLinksEffects } from './pages/article-page/effects/load-links';
import { PublishEffects } from './pages/article-page/effects/publish';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
		MenuPageComponent,
		IntroPageComponent,
    ArticlePageComponent,
    LoginPageComponent,
    MarkdownToHTMLPipe,
    ViewArticlePageComponent,
		PageNotFoundComponent,
    EditArticlePageComponent,
    MessageWidgetComponent,
    ConfigurationPageComponent,
    SpinnerComponent,
    StylesPageComponent,
    CheckboxComponent,
  ],
  imports: [
    ReactiveFormsModule,
		FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      articles: articlesReducer,
			intro: introReducer,
      ui: uiReducer,
      // change name of this reducer
      jwt_token: logInReducer,
      metadata: metadataReducer,
    }),
    EffectsModule.forRoot([
      DeleteArticleEffects,
      SaveArticleEffects,
      LogInEffects,
			GetIntroEffects,
      GetArticleEffects,
      NavigationEffects,
      LoadArticleLinksEffects,
      PublishEffects,
      CreateArticleEffects,
      GetMetadataEffect,
      PutMetadataEffect,
    ])
  ],
  providers: [
    AuthorisationService,
    MessageService,
    MetadataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
