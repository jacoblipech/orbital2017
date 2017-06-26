import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  email: string;
  password: string;
  loading: any;
  isLoggedIn: boolean;
  signUpForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public viewCtrl: ViewController, public authService: AuthProvider, 
    public loadingCtrl: LoadingController, public formBuilder: FormBuilder,private alertCtrl: AlertController) {

    this.signUpForm = formBuilder.group({
        email: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.+[a-zA-Z0-9-.]'), Validators.required])],
        password: ['', Validators.compose([Validators.minLength(8), 
          // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'), 
          Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  presentFailAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error! Please try again!',
      
      buttons: ['Dismiss']
    });
    alert.present();
  }
 
   presentAlert(error) {
    let alert = this.alertCtrl.create({
      title: error,
      
      buttons: ['Dismiss']
    });
    alert.present();
  }

  register(){
 
    this.showLoader();
 
    let details = {
        email: this.email,
        password: this.password,
    };

    let user = {
        email: this.email,
        isLoggedIn: true,
        result: {}
    };
 
  if(this.signUpForm.valid){
    this.authService.createAccount(details).then((result) => {
      user.result = result;
      this.loading.dismiss();
      this.isLoggedIn = true;
      console.log(result);
      this.viewCtrl.dismiss(user);
    }, (err) => {
      this.loading.dismiss();
      if (err.status == 422)
      this.presentAlert('This user already exists.');
    });
  }else {
      this.loading.dismiss();
      this.presentFailAlert();
      // this.viewCtrl.dismiss();
  }
 
  }

  showLoader(){
 
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
 
    this.loading.present();
 
  }

  closeModal() {
  	this.viewCtrl.dismiss();
  }
}
