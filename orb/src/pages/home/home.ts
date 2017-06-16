import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, App, PopoverController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { EditPage } from '../edit/edit';
import { PlansProvider } from '../../providers/plans/plans';
import { PopoverPage } from '../popover/popover';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  country: string;
  month: any;
  days: number;
  logged: boolean = false;
  user: object;
  constructor(
    private app: App, 
    public navCtrl: NavController, 
    public modalCtrl: ModalController, 
    public viewCtrl: ViewController, 
    public planService: PlansProvider,
    public popoverCtrl: PopoverController,
    public navParams: NavParams,
    public storage: Storage
    ) {}

  ngOnInit() {
    this.storage.get('currUser').then(data => {
    console.log(data);
    if (data) {
      this.logged = true;
    } else {
      this.logged = false;
    }
    this.user= data;

    });
    console.log(this.user); 
  }

  launchLoginPage() {

  	let modal = this.modalCtrl.create(LoginPage);
    modal.onDidDismiss(data => {
        this.user = data;
        this.storage.set('currUser', data);
        if (data) {
          this.logged = true;
        }
    });
  	modal.present();
  }

  launchSignupPage() {

  	let modal = this.modalCtrl.create(SignupPage);
    modal.onDidDismiss(data => {
        this.user = data;
        this.storage.set('currUser', data);
        console.log(data);
        if (data) {
          this.logged = true;
        }
    });
  	modal.present();
  }

  goToHome() {
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }

  logForm() {
  	let plan = {
  		country: this.country,
  		month: this.month,
  		days: this.days,
      user: this.user,
      logged: this.logged
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
 