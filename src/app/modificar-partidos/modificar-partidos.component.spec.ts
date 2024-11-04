import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarPartidosComponent } from './modificar-partidos.component';

describe('ModificarPartidosComponent', () => {
  let component: ModificarPartidosComponent;
  let fixture: ComponentFixture<ModificarPartidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarPartidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarPartidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
 