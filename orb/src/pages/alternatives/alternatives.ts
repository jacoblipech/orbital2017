import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AlternativeModel } from '../../app/models/alternative-model';
import { ActivityProvider } from '../../providers/activity/activity';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth/auth';
import { PlansProvider } from '../../providers/plans/plans';
/**
 * Generated class for the AlternativesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-alternatives',
  templateUrl: 'alternatives.html',
})
export class AlternativesPage {

  alternatives: any = this.navParams.data;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public activityService: ActivityProvider,public planService: PlansProvider,
    public authService: AuthProvider,
    public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log(this.alternatives);
    //var dat = this.alternatives;
    if (this.alternatives != null) {
      var alternativesArr = []
      var j = 0;
      var datlength = this.alternatives.alternatives.length;
      while (j < datlength) {
        //console.log('variable j: ' + j + ' and comments is: ' + dat.comments[j])
        this.activityService.getAlternative(this.alternatives.alternatives[j]).subscribe(alter => {
          console.log(alter, j);
          alternativesArr.push(alter);

        })
        j++;
      }
    }
    if (this.alternatives != null) {
      this.alternatives.alternatives = alternativesArr;
    }
    console.log(this.alternatives);
  }

  closeModal() {
	this.viewCtrl.dismiss();
  }

}
