import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, PopoverController } from 'ionic-angular';
import { PlansProvider } from '../../providers/plans/plans';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { PopoverPage } from '../popover/popover';
import { TemplatePage } from '../template/template';

/**
 * Generated class for the EditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage { 

  plan: object;
  numbers: number[];
  tab1Root: any;
  constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public modalCtrl: ModalController, 
  	public viewCtrl: ViewController, 
  	public planService: PlansProvider,
  	public popoverCtrl: PopoverController
  	) {
  		this.numbers = Array.apply(null, {length: this.navParams.get('days')}).map(Number.call, Number);
  		this.plan = this.navParams.get('plan');
  		this.tab1Root = TemplatePage;
	  }

  ionViewDidLoad() {
    console.log(this.plan);
  }

  ngOnInit() {
  	
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
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

}
