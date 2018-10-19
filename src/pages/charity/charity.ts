import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-charity',
  templateUrl: 'charity.html',
})
export class CharityPage {
  charities: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public toastCtrl: ToastController) {
    this.charities = {
      oac: {
        name: "One African Child",
        about: `One African Child Foundation for Creative Learning is dedicated to supporting African children in marginalized communities, one child at a time. We believe in raising proactive agents of change in local communities.`,
        image: `../../assets/charity/oac.jpg`
      },
      pelumi: {
        name: "Pelumi Obisesan",
        about: `Our vision at Teens Going for Gold Network is to groom teenagers to become financially self-reliant, socially conscious and value driven in order to promote the quality of education and reduce the rates of poverty and unemployment in Nigeria.`,
        image: `../../assets/charity/pelumi.jpg`
      },
      stos: {
        name: "Slum To School",
        about: `Slum2School is bringing together friends, change agents, organizations and the most passionate problem solvers to volunteer, sponsor and support a thousand more children to school this year across 15 communities.`,
        image: `../../assets/charity/slum2school.jpg`
      }
    }
  }

  oac () {
    let chosen = this.charities.oac;
    this.storage.get('user').then(user => {
      let val = user;
      val.charity = chosen;
      val.status = 1;
      this.storage.set('user', val).then(r => {
        this.toast(chosen.name);
      });
    });
  }

  pelumi () {
    let chosen = this.charities.pelumi;
    this.storage.get('user').then(user => {
      let val = user;
      val.charity = chosen;
      val.status = 1;
      this.storage.set('user', val).then(r => {
        this.toast(chosen.name);
      });
    });
  }

  stos () {
    let chosen = this.charities.stos;
    this.storage.get('user').then(user => {
      let val = user;
      val.charity = chosen;
      val.status = 1;
      this.storage.set('user', val).then(r => {
        this.toast(chosen.name);
      });
    });
  }

  toast(t) {
    let toast = this.toastCtrl.create({
      message: `${t} chosen.`,
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
