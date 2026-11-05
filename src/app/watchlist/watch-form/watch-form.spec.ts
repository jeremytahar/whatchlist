import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WatchForm } from './watch-form';

describe('WatchForm', () => {
  let component: WatchForm;
  let fixture: ComponentFixture<WatchForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchForm],
    }).compileComponents();

    fixture = TestBed.createComponent(WatchForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
