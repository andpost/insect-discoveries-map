import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPageComponent } from './map-page.component';
import {DataService} from "../app.dataservice";
import {Observable} from "rxjs";
declare let L;

describe('MapPageComponent', () => {
  let component: MapPageComponent;
  let fixture: ComponentFixture<MapPageComponent>;
  const dataService  = new DataService(null);
  let spyService;



  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapPageComponent ],
      providers:[{provide: DataService, useValue: dataService}],
    })
    .compileComponents();
    spyService = spyOn(dataService, 'getInsektenFunde').and.returnValue(new Observable(null));

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('is selected', () => {
    const isselected = component.isSelected(null, null);
    expect(isselected).toBeTruthy();
  });
});
