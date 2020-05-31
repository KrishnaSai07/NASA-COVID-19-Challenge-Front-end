import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrbanVsRuralComponent } from './urban-vs-rural.component';

describe('UrbanVsRuralComponent', () => {
  let component: UrbanVsRuralComponent;
  let fixture: ComponentFixture<UrbanVsRuralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrbanVsRuralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrbanVsRuralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
