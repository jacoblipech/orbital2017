import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the UrlPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-url',
  templateUrl: 'url.html',
})
export class UrlPage {

	url1: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  	closeModal() {
		this.viewCtrl.dismiss();
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad UrlPage');
  }

}
