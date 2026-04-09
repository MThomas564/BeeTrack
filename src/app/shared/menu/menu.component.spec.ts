import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuComponent } from './menu.component';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MenuComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuComponent],
      imports: [RouterTestingModule, MenubarModule, ButtonModule, NoopAnimationsModule],
    }).compileComponents();
  });

  it('creates the component', () => {
    const fixture = TestBed.createComponent(MenuComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('initialises menu items on init', () => {
    const fixture = TestBed.createComponent(MenuComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.items).toBeDefined();
    expect(fixture.componentInstance.items!.length).toBeGreaterThan(0);
  });

  it('toggles dark mode', () => {
    const fixture = TestBed.createComponent(MenuComponent);
    fixture.detectChanges();
    const initial = fixture.componentInstance.darkMode;
    fixture.componentInstance.toggleDarkMode();
    expect(fixture.componentInstance.darkMode).toBe(!initial);
  });
});
