import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EffectOfMigrationComponent } from './effect-of-migration.component';

describe('EffectOfMigrationComponent', () => {
  let component: EffectOfMigrationComponent;
  let fixture: ComponentFixture<EffectOfMigrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EffectOfMigrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EffectOfMigrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
