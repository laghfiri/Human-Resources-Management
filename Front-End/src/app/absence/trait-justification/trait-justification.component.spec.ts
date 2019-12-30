import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitJustificationComponent } from './trait-justification.component';

describe('TraitJustificationComponent', () => {
  let component: TraitJustificationComponent;
  let fixture: ComponentFixture<TraitJustificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraitJustificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraitJustificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
