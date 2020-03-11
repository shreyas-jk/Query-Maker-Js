import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryMakerComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: QueryMakerComponent;
  let fixture: ComponentFixture<QueryMakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryMakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
