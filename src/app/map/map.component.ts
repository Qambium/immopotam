import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as L from 'leaflet';
import { FirebaseService } from '../firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor( public db : FirebaseService, private router : Router){}

  public map : any;
  public appartements : any[] = [];

  public appartsLayer! : any;



  ngOnInit() : void {





  }

  ngAfterViewInit() : void {
    this.initMap();

    this.db.appartements.subscribe((result : any[])=>{
      // this.appartements.(appartements.snapshot.val());
      this.appartements = result ;

      var ROUTER = this.router;

      var points : any[] = []
      this.appartements.forEach((ap : any)=>{
        var point = L.marker(L.latLng(ap.latlng));
        point.on('click', (event : any)=>{
          ROUTER.navigate(['/appartement', ap.id]);
        })
        // point.addTo(this.map);
        points.push(point);
      });

      try {
        this.map.removeLayer(this.appartsLayer);
      } catch (error) {

      }

      this.appartsLayer = L.featureGroup(points);
      this.appartsLayer.addTo(this.map);

      this.map.fitBounds(this.appartsLayer.getBounds());



    });

    this.db.getAll();
  }

  ngOnDestroy() : void {
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
    //
    // var point = L.marker(L.latLng(this.appartement.latlng));
    // point.addTo(this.map);
    // if(this.appartement.latlng.lat != null &&  this.appartement.latlng.lat > 0){
    //   this.map.panTo(point.getLatLng());
    // }
    //
    // this.map.on('click', (event : any)=>{
    //   this.appartement.latlng = event.latlng;
    //   point.setLatLng(L.latLng(this.appartement.latlng));
    //   this.map.panTo(point.getLatLng());
    //
    // });

  }
}
