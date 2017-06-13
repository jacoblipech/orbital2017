import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlansProvider } from '../../providers/plans/plans';

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

  plans: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public planService: PlansProvider) {
  }

  ionViewDidLoad() {
    console.log(this.navParams.get('country'));
  }

}
