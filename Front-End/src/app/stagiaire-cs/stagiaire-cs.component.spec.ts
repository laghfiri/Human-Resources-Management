import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StagiaireCSComponent } from './stagiaire-cs.component';

describe('StagiaireCSComponent', () => {
  let component: StagiaireCSComponent;
  let fixture: ComponentFixture<StagiaireCSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StagiaireCSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StagiaireCSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
