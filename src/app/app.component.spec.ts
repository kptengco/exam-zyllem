import { TestBed, async } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        RouterModule.forRoot([])
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have router-outlets for header, footer and body`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const appNode = fixture.nativeElement;

    expect(appNode.querySelector('router-outlet[name="header"]')).toBeTruthy();
    expect(appNode.querySelector('.content-wrapper router-outlet')).toBeTruthy();
    expect(appNode.querySelector('router-outlet[name="footer"]')).toBeTruthy();
    expect(appNode.querySelectorAll('router-outlet').length).toEqual(3);
  });
});
