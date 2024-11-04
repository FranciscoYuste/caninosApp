import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideFirebaseApp(() => initializeApp({"projectId":"caninos-app","appId":"1:289071062481:web:2e93bf4afdf65067da94f0","storageBucket":"caninos-app.appspot.com","apiKey":"AIzaSyBzVuyoOAo0MRPZVg68Ko6rpmOkRKZqQxU","authDomain":"caninos-app.firebaseapp.com","messagingSenderId":"289071062481"})), provideFirestore(() => getFirestore())]
};
