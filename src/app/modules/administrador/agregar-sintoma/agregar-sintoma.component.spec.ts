import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarSintomaComponent } from './agregar-sintoma.component';

describe('AgregarSintomaComponent', () => {
  let component: AgregarSintomaComponent;
  let fixture: ComponentFixture<AgregarSintomaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarSintomaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarSintomaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
