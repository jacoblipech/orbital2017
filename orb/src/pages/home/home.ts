import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, App, PopoverController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { EditPage } from '../edit/edit';
import { PlansProvider } from '../../providers/plans/plans';
import { PopoverPage } from '../popover/popover';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage({
  name: 'welcome',
  segment: 'home'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  country: string;
  month: any;
  days: number;
  logged: boolean = true;
  user: any;
  constructor(
    private app: App, 
    public navCtrl: NavController, 
    public modalCtrl: ModalController, 
    public viewCtrl: ViewController, 
    public planService: PlansProvider,
    public popoverCtrl: PopoverController,
    public navParams: NavParams,
    public storage: Storage,
    public authService: AuthProvider
    ) {}

  ngOnInit() {

    if (this.navParams.data != false) {
      this.storage.get('currUser').then(data => {
        console.log(data);
        this.user = data;
      });
    } else {
      this.storage.set('currUser', null);
    }
  }

  launchLoginPage() {

  	let modal = this.modalCtrl.create(LoginPage);
    modal.onDidDismiss(data => {
        
        if (data) {
          this.user = data;
          //this.logged = true;
          this.storage.set('currUser', data);
        } else {
          //this.logged = false;
        }
        
    });
  	modal.present();
  }

  launchSignupPage() {

  	let modal = this.modalCtrl.create(SignupPage);
    modal.onDidDismiss(data => {
        
        if (data) {
          this.user = data;
          //this.logged = true;
          this.storage.set('currUser', data);
        } else {
          //this.logged = false;
        }
        
        console.log(data);
    });
  	modal.present();
  }

  goToHome() {
    let opts = { animate: true, animation: "transition",duration: 1000}
    this.navCtrl.setRoot('welcome');
    this.navCtrl.popToRoot();
  }

  logForm() {
    this.storage.get('currUser').then(data => {
      console.log(data);
      this.user = data;
    });
    console.log(this.user)
  	let plan = {
  		country: this.country,
  		month: this.month,
  		days: this.days,
      id: this.user.result.user._id,
      user: this.user,

      //logged: this.logged
  	}
    let opts = { animate: true, animation: "transition",duration: 1000}
    this.planService.createPlan(plan);
  	this.navCtrl.setRoot('edit', plan, opts);
    this.navCtrl.popToRoot();
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

  logout() {
    console.log(this.user);
    this.authService.logout();
    this.user = null;
    //this.logged = false;
    console.log(this.user);
  }

}
 