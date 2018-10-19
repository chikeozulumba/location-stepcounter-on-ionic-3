import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
@IonicPage()
@Component({
  selector: 'page-initial',
  templateUrl: 'initial.html',
})
export class InitialPage {
  displayBtn: Boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage, private storage: Storage, public toastCtrl: ToastController) {
    // this.storage.remove('user');
  }

  loginUser () {
    let auth = {
      loggedIn: true,
      status: 0,
      charity: {}
    }
    this.storage.set('user', auth).then(() => {
      return this.toast();
    });
  }

  ngOnInit () {
    this.storage.get('user')
    .then((val) => {
      if (val === null) this.displayBtn = true;
      else this.toast();
    });
  }

  toast() {
    let toast = this.toastCtrl.create({
      message: `Signed In`,
      duration: 2000,
      position: `bottom`
    });

    toast.onDidDismiss(() => {
      setTimeout(() => {
        this.navCtrl.setRoot(HomePage, {}, {animation: 'md-transition', duration: 1000, animate: true, direction: 'forward'});
      }, 4000);
    });

    toast.present();
  }

}
