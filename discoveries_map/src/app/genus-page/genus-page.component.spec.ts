import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenusPageComponent } from './genus-page.component';

describe('GenusPageComponent', () => {
  let component: GenusPageComponent;
  let fixture: ComponentFixture<GenusPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenusPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenusPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
