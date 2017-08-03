import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ActivityPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {

	activity: string;
    url: string;
    expenses: string;
    address: string;
    openingHours: string;
    nearestLandmark: string;
    remarks: string;
    imageUrl: string;
	constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ActivityPage');
	}

	closeModal() {
		this.viewCtrl.dismiss();
	}

	save() {
		let activity = {
			activity: this.activity,
		    url: this.url,
		    expenses: this.expenses,
		    address: this.address,
		    openingHours: this.openingHours,
		    nearestLandmark: this.nearestLandmark,
		    remarks: this.remarks,
		    imageUrl: this.imageUrl,
		    comments: [],
		    likes: 0,
		    alternatives: []
		}
		this.viewCtrl.dismiss(activity);
	}

}
