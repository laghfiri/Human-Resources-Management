import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemanderComponent } from './demander.component';

describe('DemanderComponent', () => {
  let component: DemanderComponent;
  let fixture: ComponentFixture<DemanderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemanderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemanderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
