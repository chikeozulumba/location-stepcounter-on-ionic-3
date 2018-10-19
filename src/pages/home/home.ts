import {Storage} from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import { Observable } from 'rxjs/Observable';
import { Stepcounter } from '@ionic-native/stepcounter';
import { InitialPage } from '../initial/initial';
import { MapPage } from '../map/map';
import { CharityPage } from '../charity/charity';
// import { Timer } from 'easytimer.js';
declare var Timer;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {
  user: any = null;
  tracking: boolean;
  name: String;
  running: Boolean = false;
  begin: String = "Start";
  counting: any = 0;
  steps: Number = 0;

  timer: any = new Timer();
  duration: any = 0;

  totalSeconds = 0;

  constructor(private toastCtrl: ToastController, private navCtrl: NavController,
              private locationTracker: LocationTrackerProvider,
              private stepcounter: Stepcounter, private storage: Storage) {
                console.log(this.startTime());
  }

  ngOnInit () {
    this.storage.get('user')
    .then((val) => {
      console.log(val);
      if (val === null) {
          this.navCtrl.setRoot(InitialPage, {}, {animation: 'md-transition', duration: 1000, animate: true, direction: 'forward'});
          let toast = this.toastCtrl.create({
            message: `Unauthorized!`,
            duration: 3000,
            position: `bottom`
          });

          toast.onDidDismiss(() => {
            setTimeout(() => {
              toast.present();
            }, 4000);
          });
      } else if (val.status === 0) {
        this.navCtrl.setRoot(CharityPage, {}, {animation: 'md-transition', duration: 1000, animate: true, direction: 'forward'});
        let toast = this.toastCtrl.create({
          message: `Kindly choose a charity`,
          duration: 5000,
          position: `bottom`
        });

        toast.present();
      }
    });
  }

  getSteps () {
    this.stepcounter.getStepCount().then( res => {
      this.counting = res;
    });
  }

  startTime () {
    setInterval(setTime, 1000);
    function setTime() {
      ++this.totalSeconds;
      this.duration = pad(this.totalSeconds % 60);
      function pad(val) {
        var valString = val + "";
        if (valString.length < 2) {
          return "0" + valString;
        } else {
          return valString;
        }
      }
    }
  }
// setInterval(setTime, 1000);



  start(): void {
    if (this.running === false) {
      this.timer.start();
      this.begin = "FINISH";
      // this.startTme();
      // setInterval(console.log(this.duration), 1000);
      setInterval(this.stepcounter.getStepCount().then( res => {
        this.counting = res;
      }), 2000);
      this.stepcounter.start(0).then(
        res => {
          setInterval(this.stepcounter.getStepCount().then( res => {
            this.counting = res;
          }), 2000)},
        err => console.log(err));
      this.running = true;
      this.tracking = true;

      // setInterval(console.log(this.duration), 2000);
      this.locationTracker.startTracking();
    } else {
      this.stepcounter.getStepCount().then( res => {
        this.locationTracker.stopTracking();
        this.duration = this.timer.getTimeValues().toString();
        this.begin = "START";
        this.counting = res;
        this.steps = res;
        this.running = false;
        // GO TO MAP VIEW
        this.navCtrl.setRoot(MapPage, {
          geo: this.locationTracker.positions,
          steps: this.steps,
          duration: this.duration
        });
        console.log(this.locationTracker.positions);
      }).catch(err => {
        // this.locationTracker.stopTracking();
        this.begin = "START";
        this.running = false;
        // GO TO MAP VIEW
        this.navCtrl.setRoot(MapPage, {
          geo: this.locationTracker.positions,
          steps: this.steps,
          duration: this.duration
        }, {animation: 'md-transition', duration: 1000, animate: true, direction: 'forward'});
        console.log(this.locationTracker.positions);
      });
    }
  }

}
