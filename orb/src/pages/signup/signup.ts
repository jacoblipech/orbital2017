import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

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
    public loadingCtrl: LoadingController, public formBuilder: FormBuilder) {

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

    });
  }else {
      this.loading.dismiss();
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
