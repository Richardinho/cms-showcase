import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MenuPageComponent } from './menu-page/menu-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IntroPageComponent } from './intro-page/intro-page.component';
import { ArticlePageComponent } from './article-page/article-page.component';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { LoginPageComponent } from './login-page/login-page.component';
import { MarkdownToHTMLPipe } from './pipes/markdown-to-html.pipe';
import { ViewArticlePageComponent } from './view-article-page/view-article-page.component';
import { EditArticlePageComponent } from './edit-article-page/edit-article-page.component';
import { AuthorisationService } from './services/authorisation.service';
import { MessageService } from './message-service/message.service';
import { MessageWidgetComponent } from './message-widget/message-widget.component';
import { articlesReducer } from './reducers/articles.reducer';
import { introReducer } from './reducers/intro.reducer';
import { uiReducer } from './reducers/ui.reducer';
import { logInReducer } from './reducers/logged-in.reducer';
import { metadataReducer } from './reducers/metadata.reducer';
import { StoreModule } from '@ngrx/store';
import { NavigationEffects } from './view-article-page/effects/navigation.effect';
// add this to styles page
import { SpinnerComponent } from './configuration-page/spinner';
import { DeleteArticleEffects } from './effects/delete-article.effect';
import { CreateArticleEffects } from './effects/create-article.effect';
import { StylesPageComponent } from './styles-page/styles-page.component';
import { MetadataService } from './services/metadata.service';
import { GetMetadataEffect } from './configuration-page/effects/get-metadata.effect';
import { PutMetadataEffect } from './configuration-page/effects/put-metadata.effect';
import { ConfigurationPageComponent } from './configuration-page/configuration-page.component';
import { SaveArticleEffects } from './effects/save-article.effect';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { GetArticleEffects } from './effects/get-article.effect';
import { LogInEffects } from './effects/login.effect';
import { GetIntroEffects } from './effects/intro.effect';
import { LoadArticleLinksEffects } from './article-page/effects/load-links';
import { PublishEffects } from './article-page/effects/publish';

@NgModule({
  declarations: [
		// are these necessary now?
    AppComponent,
		MenuPageComponent,
		IntroPageComponent,
    ArticlePageComponent,
    LoginPageComponent,
    MarkdownToHTMLPipe,
    ViewArticlePageComponent,
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
