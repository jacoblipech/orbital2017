import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { EditPage } from '../edit/edit';
import { PlansProvider } from '../../providers/plans/plans';
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

  plan: any;
  user: any = this.navParams.data;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public planService: PlansProvider) {
  }

  ionViewWillLoad() {
    console.log(this.user);
  }

  close() {
    this.viewCtrl.dismiss();
  }

  goToPlan(index) {
    this.planService.getPlan(this.user.plans[index]).subscribe(plan => {
      // plan should have user id so next page can load
      plan.id = this.user._id;
      console.log(plan)
      let opts = { animate: true, animation: "transition", duration: 1000}
      this.navCtrl.setRoot('edit', plan, opts);
      this.navCtrl.popToRoot();
    });
    this.close()
  }

}
