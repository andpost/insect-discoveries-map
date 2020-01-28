import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoveriesPageComponent } from './discoveries-page.component';

describe('DiscoveriesPageComponent', () => {
  let component: DiscoveriesPageComponent;
  let fixture: ComponentFixture<DiscoveriesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscoveriesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoveriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
