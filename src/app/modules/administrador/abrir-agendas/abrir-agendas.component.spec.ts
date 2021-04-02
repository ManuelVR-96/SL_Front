import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbrirAgendasComponent } from './abrir-agendas.component';

describe('AbrirAgendasComponent', () => {
  let component: AbrirAgendasComponent;
  let fixture: ComponentFixture<AbrirAgendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbrirAgendasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbrirAgendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
