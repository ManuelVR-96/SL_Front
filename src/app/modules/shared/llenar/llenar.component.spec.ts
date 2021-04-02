import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlenarComponent } from './llenar.component';

describe('LlenarComponent', () => {
  let component: LlenarComponent;
  let fixture: ComponentFixture<LlenarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LlenarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LlenarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
