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
            this.navCtrl.setRoot(HomePage);
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

        let user = {
                email: this.email,
                isLoggedIn: true,
                result: {}
        };
 
        this.authService.login(credentials).then((result) => {
            user.result = result;
            this.loading.dismiss(user);
            console.log(user);
            this.viewCtrl.dismiss(user);
        }, (err) => {
            this.loading.dismiss(user);
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
