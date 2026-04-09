import { render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  it('creates the app', async () => {
    const { fixture } = await render(AppComponent, {
      imports: [RouterTestingModule],
    });
    expect(fixture.componentInstance).toBeTruthy();
  });
});
