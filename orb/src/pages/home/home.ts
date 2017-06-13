import { Component } from '@angular/core';
import { NavController, ModalController, ViewController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { EditPage } from '../edit/edit';
import { PlansProvider } from '../../providers/plans/plans';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  country: string;
  month: any;
  days: number;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public viewCtrl: ViewController, public planService: PlansProvider) {

  }

  launchLoginPage() {

  	let modal = this.modalCtrl.create(LoginPage);

  	modal.present();
  }

  launchSignupPage() {

  	let modal = this.modalCtrl.create(SignupPage);

  	modal.present();
  }

  logForm() {
  	let plan = {
  		country: this.country,
  		month: this.month,
  		days: this.days
  	}
    this.planService.createPlan(plan);
  	this.navCtrl.push(EditPage, plan);
  }

}
 