import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasClienteComponent } from './citas-cliente.component';

describe('CitasClienteComponent', () => {
  let component: CitasClienteComponent;
  let fixture: ComponentFixture<CitasClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitasClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
