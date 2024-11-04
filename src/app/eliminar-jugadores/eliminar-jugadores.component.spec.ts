import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarJugadoresComponent } from './eliminar-jugadores.component';

describe('EliminarJugadoresComponent', () => {
  let component: EliminarJugadoresComponent;
  let fixture: ComponentFixture<EliminarJugadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarJugadoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarJugadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
