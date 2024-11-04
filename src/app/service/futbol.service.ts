import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, setDoc, getDoc } from '@angular/fire/firestore';
import Jugador from '../../interfaz/jugador';
import { Observable } from 'rxjs';
import Equipo from '../../interfaz/equipo';
import Partido from '../../interfaz/partido';
import Admin from '../../interfaz/admin';
@Injectable({
  providedIn: 'root'
})
export class FutbolService {
  private adminDoc: any; // Declara la variable aquí
  
  constructor(private firestore: Firestore) { 
    this.adminDoc = doc(this.firestore, 'admins/UgtBylRC1Cy22txMwnUA'); // Inicializa aquí
  }

  addJugador(jugador: Jugador) {
    const jugadorRef = collection(this.firestore, 'jugadores');
    return addDoc(jugadorRef, jugador);
  }

  getJugadores():Observable<Jugador[]> { // Cambia el tipo de retorno a Observable<Jugador[]>
    const jugadorRef = collection(this.firestore, 'jugadores');
    return collectionData(jugadorRef, { idField: 'id' }) as Observable<Jugador[]>;

  }

  deleteJugador(jugadorId: string) {
    const jugadorRef = doc(this.firestore, `jugadores/${jugadorId}`);
    return deleteDoc(jugadorRef);
  }

  updateJugador(jugador: Jugador) {
    const jugadorRef = doc(this.firestore, `jugadores/${jugador.id}`); // Usa el id del jugador
    return setDoc(jugadorRef, jugador); // Usa setDoc para actualizar el documento
  }
  
  
  addEquipo(equipo: Equipo) {
    const equipoRef = collection(this.firestore, 'equipos');
    return addDoc(equipoRef, equipo);
  }

  getEquipos():Observable<Equipo[]> {
    const equipoRef = collection(this.firestore, 'equipos');
    return collectionData(equipoRef, { idField: 'id' }) as Observable<Equipo[]>;
  }

  // Eliminar equipo
  deleteEquipo(id: string) {
    const equipoRef = doc(this.firestore, `equipos/${id}`);
    return deleteDoc(equipoRef);
  }

  // Método para actualizar un equipo
  updateEquipo(equipo: Equipo) {
    const equipoRef = doc(this.firestore, `equipos/${equipo.id}`); // Usa el id del equipo
    return setDoc(equipoRef, equipo); // Usa setDoc para actualizar el documento
  }

  addPartidos(partido: Partido) {
    const partidoRef = collection(this.firestore, 'partidos');
    return addDoc(partidoRef, partido);
  }

  getPartidos():Observable<Partido[]> {
    const partidoRef = collection(this.firestore, 'partidos');
    return collectionData(partidoRef, { idField: 'id' }) as Observable<Partido[]>;
  }

  // Eliminar partido
  deletePartido(id: string) {
    const partidoRef = doc(this.firestore, `partidos/${id}`);
    return deleteDoc(partidoRef);
  }

  // Método para actualizar un partido
  updatePartido(partido: Partido) {
    const partidoRef = doc(this.firestore, `partidos/${partido.id}`); // Usa el id del partido
    return setDoc(partidoRef, partido); // Usa setDoc para actualizar el documento
  }

  // Método para obtener la contraseña del admin
  async getAdminPassword(): Promise<string | null> {
    try {
      const docSnap = await getDoc(this.adminDoc);
      if (docSnap.exists()) {
        const admin = docSnap.data() as Admin; // Asegúrate de que Admin tenga la propiedad 'contrasena'
        return admin.contrasena; // Devuelve la contraseña
      } else {
        console.log("No existe el documento del administrador");
        return null;
      }
    } catch (error) {
      console.error("Error al obtener la contraseña del administrador:", error);
      return null;
    }
  }
} 





