import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarPartidosComponent } from './eliminar-partidos.component';

describe('EliminarPartidosComponent', () => {
  let component: EliminarPartidosComponent;
  let fixture: ComponentFixture<EliminarPartidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarPartidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarPartidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
