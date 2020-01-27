import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPageComponent } from './index-page.component';
import {DataService} from "../app.dataservice";
import {Observable} from "rxjs";

describe('IndexPageComponent', () => {
  let component: IndexPageComponent;
  let fixture: ComponentFixture<IndexPageComponent>;
  const dataService = new DataService(null);
  let spyService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers:[{provide: DataService, useValue: dataService}],
      declarations: [ IndexPageComponent ],
    })
    .compileComponents();
    spyService = spyOn(dataService, 'getArten').and.returnValue(new Observable(null));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



});
