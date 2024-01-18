import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { FirebaseService } from '../firebase.service';


@Component({
  selector: 'app-appartement',
  templateUrl: './appartement.component.html',
  styleUrls: ['./appartement.component.css']
})
export class AppartementComponent implements OnInit, AfterViewInit {

  constructor(
    private route : ActivatedRoute,
    public db : FirebaseService){}

  public map! : any;

  public nav = "annonce";
  public afficherModifier = true;
  public modifier = false;

  public toggleModifier() : void {
    if(this.modifier){
      this.modifier = false;
      setTimeout(() => {
        this.initMap();
      }, 200);
    } else {
      this.modifier = true;
    }

  }

  public navigate(n : string) : void {
    this.nav = n;
    this.afficherModifier = false;
    this.modifier = false;
    if(this.nav == 'annonce'){
      this.afficherModifier = true;
      // this.modifier = true;

      setTimeout(() => {

        this.initMap();
        // this.map.invalidateSize(true);
      }, 500);
    }
    this.update();

  }

  public update() : void {


    // Mise à jour du total des dépenses.
    var dep = 0;
    this.appartement.depenses.list.forEach((depense : any)=>{
      dep += depense.montant;
    });

    this.appartement.depenses.total = dep;

  }

  public appartement : any = {};

  updateCredit() : void {

    var emprunt = (this.appartement.depenses.total + this.appartement.prixFinal) - this.appartement.credit.apport;

    var duree = this.appartement.credit.duree * 12 ;
    var monthlyIntrestRate = this.appartement.credit.taux / 1200;
    var monthlyPayement = ((emprunt * monthlyIntrestRate) / (1 - (Math.pow((1 + monthlyIntrestRate), duree * -1))));

    this.appartement.credit.mensualites = monthlyPayement;


    if(this.appartement.credit.mensualites > 0){
      this.appartement.credit.total = monthlyPayement * duree;
      this.appartement.credit.interets = this.appartement.credit.total - emprunt;
    } else {
      this.appartement.credit.total = emprunt;
      this.appartement.credit.mensualites = 0;
      this.appartement.credit.interets = 0;
    }

    this.updateRendement();
  }

  updateRendement() : void {
    this.appartement.rendement = ((this.appartement.loyer * 12) - this.appartement.charges.annuelles) / (this.appartement.credit.interets + this.appartement.prixFinal + this.appartement.depenses.total);
  }

  ngOnInit() : void {

    this.db.appartement.subscribe((appart : any)=>{
      this.appartement = appart;
      if(this.appartement.lien == ""){
        this.afficherModifier = true;
        this.modifier = true;
      }
    });
    var id = this.route.snapshot.paramMap.get('id');
    if(id != null){
      this.db.getOne(id);
    } else {
      // router
    }

  }

  initMap() : void {

    this.map = L.map("map", {
      center: [ 48.32297254687718, 7.425127029418946 ],
      zoom: 13,
      zoomControl: false,
      attributionControl : false
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    var point = L.marker(L.latLng(this.appartement.latlng));
    point.addTo(this.map);
    if(this.appartement.latlng.lat != null &&  this.appartement.latlng.lat > 0){
      this.map.panTo(point.getLatLng());
    }

    this.map.on('click', (event : any)=>{
      this.appartement.latlng = event.latlng;
      point.setLatLng(L.latLng(this.appartement.latlng));
      this.map.panTo(point.getLatLng());

    });

  }

  ngAfterViewInit() : void {

    this.initMap();

  }

  getDepenses() : any[] {
    var ret : any[] = [];
    var keys = Object.keys(this.appartement.depenses.list);
    keys.forEach((k:string)=>{
      ret.push(this.appartement.depenses.list[k]);
    });
    return ret;
  }

  ajouterDepense() : void {
    var i = this.getDepenses().length ;
    this.appartement.depenses.list[i.toString()] = {intitule:'Nouvelle dépense...', montant:0};
  }

}
