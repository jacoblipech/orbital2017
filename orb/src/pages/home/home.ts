import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, App, PopoverController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { EditPage } from '../edit/edit';
import { PlansProvider } from '../../providers/plans/plans';
import { PopoverPage } from '../popover/popover';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  country: string;
  month: any;
  days: number;
  user: object = this.navParams.data;
  constructor(
    private app: App, 
    public navCtrl: NavController, 
    public modalCtrl: ModalController, 
    public viewCtrl: ViewController, 
    public planService: PlansProvider,
    public popoverCtrl: PopoverController,
    public navParams: NavParams
    ) {}

  ionViewDidLoad() {
    console.log(this.navParams.data);
  }

  launchLoginPage() {

  	let modal = this.modalCtrl.create(LoginPage);

  	modal.present();
  }

  launchSignupPage() {

  	let modal = this.modalCtrl.create(SignupPage);

  	modal.present();
  }

  goToHome() {
    this.navCtrl.setRoot('HomePage');
    this.navCtrl.popToRoot();
  }

  logForm() {
  	let plan = {
  		country: this.country,
  		month: this.month,
  		days: this.days
  	}
    this.planService.createPlan(plan);
  	this.app.getRootNav().setRoot(EditPage, plan);
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

}
 