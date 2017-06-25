import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AlternativeModel } from '../../app/models/alternative-model';
/**
 * Generated class for the AlternativesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-alternatives',
  templateUrl: 'alternatives.html',
})
export class AlternativesPage {

  alternatives: any = this.navParams.data;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log(this.alternatives);
  }

  closeModal() {
	this.viewCtrl.dismiss();
  }

}
