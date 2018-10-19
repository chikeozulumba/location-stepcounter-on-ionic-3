import {filter} from 'rxjs/operator/filter';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import {Storage} from '@ionic/storage';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class LocationTrackerProvider {

  isTracking: boolean;
  positionSubscription: Subscription;
  public watch: any;
  public lat: number = 0;
  public lng: number = 0;
  public positions: any = [];
  public previousTracks: any = [];
  public backgroundTracks: any = [];

  constructor(private geolocation: Geolocation,
              private backgroundGeolocation: BackgroundGeolocation,
              public zone: NgZone,
              private storage: Storage) {

  }

  startTracking(): void {
    this.getForegroundLocation();
    this.startBackgroundLocation();
  }

  stopTracking(): void {
    let newRoute = { finished: new Date().getTime(), path: this.positions };
    this.previousTracks.push(newRoute);
    this.storage.set('routes', this.previousTracks);

    this.isTracking = false;
    this.positionSubscription.unsubscribe();
    this.backgroundGeolocation.stop();
  }

  getForegroundLocation(): void {
    let options = {
      frequency: 3000,
      enableHighAccuracy: true
    };

    this.watch = this.geolocation.watchPosition(options).subscribe((position: Geoposition) => {
      this.positions.push({lat: position.coords.latitude, lng: position.coords.longitude});
      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    });
  }

  startBackgroundLocation(): void {
    // Background Tracking
    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true,
      interval: 2000
    };

    this.backgroundGeolocation.configure(config).subscribe((location) => {
      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;
      });
      this.backgroundTracks.push({lat: this.lat, lng: this.lng});

    }, (err) => {
      console.log(err);

    });

    // Turn ON the background-geolocation system.
    this.backgroundGeolocation.start();
  }

}
