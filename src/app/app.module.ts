import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { ListeComponent } from './liste/liste.component';
import { AppartementComponent } from './appartement/appartement.component';
import { MapComponent } from './map/map.component';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';

import {FirebaseService} from './firebase.service';

const firebaseConfig = {
  apiKey: "AIzaSyAj48kfpNGVEXnTFIpmvxW0J0bJRqKVd2Y",
  authDomain: "immopotam-bf965.firebaseapp.com",
  databaseURL: "https://immopotam-bf965-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "immopotam-bf965",
  storageBucket: "immopotam-bf965.appspot.com",
  messagingSenderId: "1068729125208",
  appId: "1:1068729125208:web:815f644d27924c270b7d2d",
  measurementId: "G-NNEVRGQBGE"
};


@NgModule({
  declarations: [
    AppComponent,
    ListeComponent,
    AppartementComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    provideDatabase(() => getDatabase()),
    provideFirebaseApp(() => initializeApp({"projectId":"immopotam-bf965","appId":"1:1068729125208:web:815f644d27924c270b7d2d","databaseURL":"https://immopotam-bf965-default-rtdb.europe-west1.firebasedatabase.app","storageBucket":"immopotam-bf965.appspot.com","apiKey":"AIzaSyAj48kfpNGVEXnTFIpmvxW0J0bJRqKVd2Y","authDomain":"immopotam-bf965.firebaseapp.com","messagingSenderId":"1068729125208","measurementId":"G-NNEVRGQBGE"})),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR'},
    FirebaseService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
