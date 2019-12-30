import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEmpComponent } from './info-emp.component';

describe('InfoEmpComponent', () => {
  let component: InfoEmpComponent;
  let fixture: ComponentFixture<InfoEmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoEmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
