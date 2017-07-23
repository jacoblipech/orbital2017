import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ModalController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailComposer } from '@ionic-native/email-composer';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the InvitePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-invite',
  templateUrl: 'invite.html',
})
export class InvitePage {

  email: string;
  inviteForm
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public authService: AuthProvider, public loadingCtrl: LoadingController, 
    public modalCtrl: ModalController, public formBuilder: FormBuilder, private emailComposer: EmailComposer, private alertCtrl: AlertController) {

  	this.inviteForm = formBuilder.group({
        email: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.+[a-zA-Z0-9-.]'), Validators.required])],
        
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitePage');
  }

  presentAlert() {
	  let alert = this.alertCtrl.create({
	    title: 'Email Sent!',
	    buttons: ['Dismiss']
	  });
	  alert.present();
  }

  send() {
  	
  		let email = {
		  to: this.email,
		  subject: 'Join me on this adventure!',
		  body: 'Hey man wassup',
		  isHtml: true
		};

	// Send a text message using default options
	this.emailComposer.open(email);
  	this.closeModal();
  	this.presentAlert();
  }

  closeModal() {
  	this.viewCtrl.dismiss();
  }

}
