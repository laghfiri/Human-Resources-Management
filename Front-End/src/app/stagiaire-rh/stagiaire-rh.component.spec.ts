import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StagiaireRHComponent } from './stagiaire-rh.component';

describe('StagiaireRHComponent', () => {
  let component: StagiaireRHComponent;
  let fixture: ComponentFixture<StagiaireRHComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StagiaireRHComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StagiaireRHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
