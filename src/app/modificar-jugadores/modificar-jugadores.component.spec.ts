import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarJugadoresComponent } from './modificar-jugadores.component';

describe('ModificarJugadoresComponent', () => {
  let component: ModificarJugadoresComponent;
  let fixture: ComponentFixture<ModificarJugadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarJugadoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarJugadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
