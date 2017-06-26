import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, App, PopoverController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { EditPage } from '../edit/edit';
import { PlansProvider } from '../../providers/plans/plans';
import { PopoverPage } from '../popover/popover';
import { AuthProvider } from '../../providers/auth/auth';
import { DaysValidator } from  '../../validators/days';

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
  destinationForm: FormGroup;
  constructor(
    private app: App, 
    public navCtrl: NavController, 
    public modalCtrl: ModalController, 
    public viewCtrl: ViewController, 
    public planService: PlansProvider,
    public popoverCtrl: PopoverController,
    public navParams: NavParams,
    public storage: Storage,
    public authService: AuthProvider,
    public formBuilder: FormBuilder
    ) {
    this.destinationForm = formBuilder.group({
        country: ['', Validators.compose([Validators.required])],
        month: [''],
        days: ['', Validators.compose([DaysValidator.isValid, Validators.required])]
    });
  }

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
    console.log(this.user);
    let plan = {}
    if (!this.user) {
      plan = {
        country: this.country,
        month: this.month,
        days: this.days,
        id: '4321',
        user: this.user,

        //logged: this.logged
      }
    } else {
      plan = {
        country: this.country,
        month: this.month,
        days: this.days,
        id: this.user.result.user._id,
        user: this.user,

        //logged: this.logged
      }
    }
  	
    if(this.destinationForm.valid){
      let opts = { animate: true, animation: "transition",duration: 1000}
      if (!this.user) {
        this.planService.createPlan(plan, '4312');
      } else {
        this.planService.createPlan(plan, this.user.result.user._id);
      }
      
    	this.navCtrl.setRoot('edit', plan, opts);
      this.navCtrl.popToRoot();
    }else{
      this.navCtrl.popToRoot();
    }
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
 