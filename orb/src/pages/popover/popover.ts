import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { EditPage } from '../edit/edit';
import { PlansProvider } from '../../providers/plans/plans';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the PopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'plans'
})
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  plans: any[] = [];
  user: any = this.navParams.data;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public planService: PlansProvider,
    public storage: Storage, public authService: AuthProvider) {
  }

  ionViewWillLoad() {
    console.log(this.user);
    for (var i = 0; i < this.user.plans.length; i++) {
      this.planService.getPlan(this.user.plans[i]).subscribe(plan => {
        this.plans.push(plan);
      });
    }
  }

  close() {
    this.viewCtrl.dismiss();
  }

  goToPlan(index) {
    this.planService.getPlan(this.user.plans[index]).subscribe(plan => {
      // plan should have user id so next page can load
      plan.id = this.user._id;
      plan.home = false;
      plan.index = index;
      console.log(plan)
      let opts = { animate: true, animation: "transition", duration: 1000}
      this.navCtrl.setRoot('edit', plan, opts);
      this.navCtrl.popToRoot();
    });
    this.close()
  }
  delete(index) {
    console.log("deleting");
    if (index > -1) {
      this.plans.splice(index, 1);
    }
    let planID = this.user.plans[index];
    this.authService.deletePlan(this.user._id, planID);
    //this.planService.deletePlan(planID);
  }

}
