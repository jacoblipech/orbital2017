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
import { AlertController } from 'ionic-angular';


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
  username: any;
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
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController
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
        this.username = this.user.email.split("@")[0];
        // console.log(this.username);
        
      });
    } else {
      this.storage.set('currUser', null);
    }
  }

  presentLoginAlert() {
    let alert = this.alertCtrl.create({
      title: 'Logged In!',
      subTitle: 'Continue your planning!',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  presentFailAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error! Please try again!',
      
      buttons: ['Dismiss']
    });
    alert.present();
  }

  presentLogoutAlert() {
    let alert = this.alertCtrl.create({
      title: 'Logged Out!',
      subTitle: 'Comeback Soon!',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  presentSignupAlert() {
    let alert = this.alertCtrl.create({
      title: 'Signed Up!',
      subTitle: 'Go start planning!',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  launchLoginPage() {
  	let modal = this.modalCtrl.create(LoginPage);
    modal.onDidDismiss(data => {
        
        if (data) {
          this.user = data;
          var name = this.user + '';
          this.username = this.user.email.split("@")[0];
          //this.logged = true;
          this.storage.set('currUser', data);
          this.presentLoginAlert();
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
          var name = this.user + '';
          this.username = this.user.email.split("@")[0];
          //this.logged = true;
          this.storage.set('currUser', data);
          this.presentSignupAlert();
        } else {
          //this.logged = false;
        }
        // console.log(data);
    });
  	modal.present();
  }

  //navigate to home page
  goToHome() {
    let opts = { animate: true, animation: "transition",duration: 1000}
    this.navCtrl.setRoot('welcome');
    this.navCtrl.popToRoot();
  }

  //the function to populate the data from home to edit page
  logForm() {
    let num = [];
    for (var i=0; i < this.days; i++) {
            num[i] = i;
    }
    this.storage.get('currUser').then(data => {
      // console.log(data);
      this.user = data;
    });
    // console.log(this.user);
    let plan = {}
    // if user is not logged in, random id to retrieve data
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
        days: num,
        id: this.user.result.user._id,
        user: this.user,
        home: true
        //logged: this.logged
      }
    }
  	
    if(this.destinationForm.valid){
      let opts = { animate: true, animation: "transition", duration: 1000}
      if (!this.user) {
        this.planService.createPlan(plan, '4321');
      } else {
        this.planService.createPlan(plan, this.user.result.user._id);
      }
      
      //set edit page as the root page! Is this necessary?
      //passing the plan data into the next params
    	this.navCtrl.setRoot('edit', plan, opts);
      this.navCtrl.popToRoot();
    }else{
      this.navCtrl.popToRoot();
    }
  }

  //for the plans page which is not configured yet
  presentPopover(myEvent) {
    this.authService.getUser(this.user.result.user._id).subscribe(user => {
      let popover = this.popoverCtrl.create('plans', user);
      popover.present({
        ev: myEvent
      });
    });  
  }

  logout() {
    console.log(this.user);
    this.authService.logout();
    this.user = null;
    //this.logged = false;
    console.log(this.user);
    this.presentLogoutAlert();
  }

}
 