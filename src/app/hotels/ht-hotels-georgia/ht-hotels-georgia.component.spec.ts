import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtHotelsGeorgiaComponent } from './ht-hotels-georgia.component';

describe('HtHotelsGeorgiaComponent', () => {
  let component: HtHotelsGeorgiaComponent;
  let fixture: ComponentFixture<HtHotelsGeorgiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HtHotelsGeorgiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HtHotelsGeorgiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
