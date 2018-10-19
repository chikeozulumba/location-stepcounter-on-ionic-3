import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { ResultPage } from '../result/result';

declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  steps: any;
  geo: any = [];
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  marker: any;
  currentMapTrack = null;
  isTracking = false;
  trackedRoute = [];
  previousTracks = [];
  positionSubscription: Subscription;
  warning: boolean = false;
  statement: String = "Please wait, Map loading!";
  nextBtn: Boolean = false;
  km: any = 0;

  duration: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private plt: Platform, private geolocation: Geolocation, private storage: Storage) {
      this.geo = this.navParams.get('geo');
      this.steps = this.navParams.get('steps');
      this.duration = this.navParams.get('duration');
      console.log(this.duration, this.steps);
      this.geo.length < 1 ? this.warning = true : this.warning = false;
      this.plt.ready().then(() => {
        this.loadHistoricRoutes();
        const mapOptions = {
          zoom: 13,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false
        };

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.geolocation.getCurrentPosition().then((pos) => {
          const latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
          this.map.setCenter(latLng);
          this.map.setZoom(18);
          // Set Marker
          this.marker = new google.maps.Marker({
            position: latLng,
            title: 'Your Location!'
          });
          this.marker.setMap(this.map);
         }).then(() => {
            this.redrawPath(this.geo);
            this.nextBtn = true;
            this.statement = "MOVE WITH MSAADA";

            const latLngA = this.geo[0];
            const latLngB = this.geo[this.geo.length-1];
            if (this.geo.length > 1) {
              this.km = new google.maps.geometry.spherical.computeDistanceBetween (latLngA, latLngB);
            }
            console.log(this.km);

         }).catch((error) => {
           console.log('Error getting location', error);
         });
      });
  }

  rad (x) {
    return x * Math.PI / 180;
  };

  getDistance (p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = this.rad(p2.lat - p1.lat);
    var dLong = this.rad(p2.lng - p1.lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(p1.lat())) * Math.cos(this.rad(p2.lat())) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
  };

  nextResults() {
    this.navCtrl.setRoot(ResultPage, { timer: this.duration, steps: this.steps }, {animation: 'md-transition', duration: 1000, animate: true, direction: 'forward'});
  }

  redrawPath(path) {
    if (path.length > 1) {
      this.currentMapTrack = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: '#ff00ff',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
      this.currentMapTrack.setMap(this.map);
      console.log("yes");
    }
  }

  loadHistoricRoutes() {
    this.storage.get('routes').then(data => {
      if (data) {
        this.previousTracks = data;
      }
    });
  }

}
