import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictHotspotComponent } from './predict-hotspot.component';

describe('PredictHotspotComponent', () => {
  let component: PredictHotspotComponent;
  let fixture: ComponentFixture<PredictHotspotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictHotspotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictHotspotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
