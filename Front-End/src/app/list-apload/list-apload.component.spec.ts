import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAploadComponent } from './list-apload.component';

describe('ListAploadComponent', () => {
  let component: ListAploadComponent;
  let fixture: ComponentFixture<ListAploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
