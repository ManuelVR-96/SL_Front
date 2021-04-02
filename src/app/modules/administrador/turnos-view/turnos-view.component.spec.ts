import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosViewComponent } from './turnos-view.component';

describe('TurnosViewComponent', () => {
  let component: TurnosViewComponent;
  let fixture: ComponentFixture<TurnosViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
