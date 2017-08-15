import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams, ViewController } from 'ionic-angular';
// import { UrlPage } from '../url/url';

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

	duration: string;
	activity: string;
    url1: string;
    url2: string;
    url3: string;
    url4: string;
    url5: string;
    expenses: string;
    address: string;
    openingHours: string;
    remarks: string;
    
	constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public viewCtrl: ViewController) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ActivityPage');
	}

	closeModal() {
		this.viewCtrl.dismiss();
	}

	save() {
		let activity = {
			duration: this.duration,
			activity: this.activity,
		    url1: this.url1,
		    url2: this.url2,
		    url3: this.url3,
		    url4: this.url4,
		    url5: this.url5,
		    expenses: this.expenses,
		    address: this.address,
		    openingHours: this.openingHours,
		    remarks: this.remarks,
		    comments: [],
		    likes: 0,
		    alternatives: []
		}
		this.viewCtrl.dismiss(activity);
	}

	// enterURL1() {
	// 	let modal = this.modalCtrl.create(UrlPage);
 //   		modal.onDidDismiss(data => {
        
 //        if (data) {
 //          this.url1 = data;
 //        } else {
 //          //this.logged = false;
 //        }
 //    });
 //  		modal.present();
	// }

}
