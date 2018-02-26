import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcupanteComponent } from './ocupante.component';

describe('OcupanteComponent', () => {
  let component: OcupanteComponent;
  let fixture: ComponentFixture<OcupanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcupanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcupanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
