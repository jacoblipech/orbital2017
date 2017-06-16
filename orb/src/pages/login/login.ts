import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ModalController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  password: string;
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public authService: AuthProvider, public loadingCtrl: LoadingController, 
    public modalCtrl: ModalController) {
}

  ionViewDidLoad() {
    this.showLoader();
 
        //Check if already authenticated
        this.authService.checkAuthentication().then((res) => {
            console.log("Already authorized");
            this.loading.dismiss();
            let user = {
                email: this.authService.getUser(res),
                isLoggedIn: true
            };
            console.log(this.email);
            this.navCtrl.setRoot(HomePage, user);
            this.navCtrl.popToRoot();
        }, (err) => {
            console.log("Not already authorized");
            this.loading.dismiss();
        });
  }

  login(){
 
        this.showLoader();
 
        let credentials = {
            email: this.email,
            password: this.password
        };
 
        this.authService.login(credentials).then((result) => {
            this.loading.dismiss();
            console.log(result);
        }, (err) => {
            this.loading.dismiss();
            console.log(err);
        });
 
    }
 
    launchSignup(){
      let modal = this.modalCtrl.create(SignupPage);

      modal.present();
      this.viewCtrl.dismiss();
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
