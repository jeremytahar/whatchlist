import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OmdbSearch } from './omdb-search';

describe('OmdbSearch', () => {
  let component: OmdbSearch;
  let fixture: ComponentFixture<OmdbSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OmdbSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(OmdbSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
