import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarAgendasComponent } from './consultar-agendas.component';

describe('ConsultarAgendasComponent', () => {
  let component: ConsultarAgendasComponent;
  let fixture: ComponentFixture<ConsultarAgendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarAgendasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarAgendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
