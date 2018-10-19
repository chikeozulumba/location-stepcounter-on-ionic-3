import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the SummaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html',
})
export class SummaryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  nextPage() {
    this.navCtrl.setRoot(HomePage, {}, {animation: 'md-transition', duration: 1000, animate: true, direction: 'back'});
  }

}
