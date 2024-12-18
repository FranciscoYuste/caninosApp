import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarEquiposComponent } from './modificar-equipos.component';

describe('ModificarEquiposComponent', () => {
  let component: ModificarEquiposComponent;
  let fixture: ComponentFixture<ModificarEquiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarEquiposComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
