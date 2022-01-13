import { TestBed } from '@angular/core/testing';
import { MessageWidgetComponent } from './message-widget/message-widget.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MessageService } from './message-service/message.service';


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
				AppComponent,
				MessageWidgetComponent,
      ],
			providers: [
				MessageService,
			],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'cms'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('cms');
  });

});
