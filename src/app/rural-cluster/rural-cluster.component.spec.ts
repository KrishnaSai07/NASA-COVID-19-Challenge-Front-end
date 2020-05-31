import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuralClusterComponent } from './rural-cluster.component';

describe('RuralClusterComponent', () => {
  let component: RuralClusterComponent;
  let fixture: ComponentFixture<RuralClusterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuralClusterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuralClusterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
