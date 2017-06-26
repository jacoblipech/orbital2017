import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, PopoverController } from 'ionic-angular';
import { PlansProvider } from '../../providers/plans/plans';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { InvitePage } from '../invite/invite';
import { HomePage } from '../home/home';
import { PopoverPage } from '../popover/popover';
import { TemplatePage } from '../template/template';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the EditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'edit',
  segment: 'edit/:id'
})
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage { 

  plan: any = this.navParams.data;
  user: object = this.navParams.get('user');
  numbers: number[];
  tab1Root: any;
  constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public modalCtrl: ModalController, 
  	public viewCtrl: ViewController, 
  	public planService: PlansProvider,
  	public popoverCtrl: PopoverController, 
    public authService: AuthProvider,
    public storage: Storage
  	) {
  		this.numbers = Array.apply(null, {length: this.navParams.get('days')}).map(Number.call, Number);
  		this.tab1Root = 'template';
	  }

  ionViewWillLoad() {
    //console.log(this.plan);
    //console.log(this.user);
    console.log(this.authService.getUser(this.navParams.get('id')));
  }

  ngOnInit() {
  	//this.authService.getUser(this.navParams.get('id'));
  }

  launchInvitePage() {
    let modal = this.modalCtrl.create(InvitePage);
    modal.present();
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
    let opts = { animate: true, animation: "transition", direction: 'forward' ,duration: 1000}
    this.navCtrl.setRoot('welcome', true, opts);
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
    this.navCtrl.setRoot('welcome', false);
    this.navCtrl.popToRoot();
    console.log(this.user);
  }

}
