import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JustificationComponent } from './justification.component';

describe('JustificationComponent', () => {
  let component: JustificationComponent;
  let fixture: ComponentFixture<JustificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JustificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JustificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
