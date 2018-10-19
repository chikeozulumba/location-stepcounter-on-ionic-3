import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SummaryPage } from '../summary/summary';

/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {

  timer: any = "05";
  steps: any = 10;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.steps = this.navParams.get('steps');
    this.timer = this.navParams.get('timer');
    console.log(this.timer, this.steps)
  }

  nextPage() {
    this.navCtrl.setRoot(SummaryPage, {}, {animation: 'md-transition', duration: 1000, animate: true, direction: 'forward'});
  }

}
