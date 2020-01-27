import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { SpeciesPageComponent } from './species-page.component';
import {RouterTestingModule} from "@angular/router/testing";
import {DataService} from "../app.dataservice";
import { Lightbox } from 'ngx-lightbox';
import {Observable} from "rxjs";




describe('SpeciesPageComponent', () => {
  let component: SpeciesPageComponent;
  let fixture: ComponentFixture<SpeciesPageComponent>;
  const dataService  = new DataService(null);
  const lightbox: Lightbox = new Lightbox(null, null, null, null, null);
  let spyService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeciesPageComponent ],
      imports: [ FontAwesomeModule],
      providers:[{provide: DataService, useValue: dataService}, {provide: Lightbox, useValue: lightbox} ],
    })
    .compileComponents();
    spyService = spyOn(dataService, 'getArten').and.returnValue(new Observable(null));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeciesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
