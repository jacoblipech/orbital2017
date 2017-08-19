import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, PopoverController } from 'ionic-angular';
import { PlansProvider } from '../../providers/plans/plans';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { InvitePage } from '../invite/invite';
import { HomePage } from '../home/home';
import { PopoverPage } from '../popover/popover';
import { TemplatePage } from '../template/template';
import { AuthProvider } from '../../providers/auth/auth';
import { ActivityProvider } from '../../providers/activity/activity';
import { AlternativeModel } from '../../app/models/alternative-model';
import { ActivityPage } from '../activity/activity';
import { AlternativesPage } from '../alternatives/alternatives';
import { UrlPage } from '../url/url';

/**
 * Generated class for the EditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'edit',
  segment: 'edit/:id'
})

@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})

export class EditPage { 

  //getting data about plan from home!

  plan: any = this.navParams.data;
  user: any;
  dayLength: any;
  tab1Root: any;
  plansID: string;
  username: any;
  activities: any[] = [];
  comment: string = '';
  comments: any[] = [];
  likes:number = 0;
  days:number = 1;
  constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public modalCtrl: ModalController, 
  	public viewCtrl: ViewController, 
  	public planService: PlansProvider,
  	public popoverCtrl: PopoverController, 
    public authService: AuthProvider,
    public storage: Storage, public activityService: ActivityProvider,
  	) {
      this.storage.get('currUser').then(data => {
        this.user = data; 
        this.username = this.user.email.split("@")[0];
      });
	  }
  ionViewWillLoad() {
    this.storage.get('currUser').then(user => {
      console.log(user);
        this.authService.getUser(user.result.user._id).subscribe(data => {
          //console.log(data.plans[data.plans.length-1]);
          this.plansID = data.plans[data.plans.length-1];
          if (this.plan.home == false) {
            
            this.plansID = data.plans[this.plan.index];
          }
          
          //console.log(this.plansID);
          this.planService.getPlan(this.plansID).subscribe(data => {       
            this.plan = data
            this.dayLength = this.plan.days.length;
            var actlength = data.activities.length;
            for(var i2 = 0; i2 < actlength; i2++){
              this.activityService.getActivity(data.activities[i2]).subscribe(dat => {
                // if data exists
                if (dat != null) {
                  // make an empty comments array
                  var commentsArr = [];
                  var j = 0;
                  var datlength = dat.comments.length;
                  // for all comments in the activity, get the data from back end and push it into 
                  // the comments array
                  while (j < datlength) {
                    console.log('variable j: ' + j + ' and comments is: ' + dat.comments[j])
                    this.activityService.getComment(dat.comments[j]).subscribe(comment => {
                      console.log(comment, j);
                      commentsArr.push(comment);

                    })
                    j++;
                  }
                }
                // replace the activity's comments array with the new comments array
                // cuz the current activity's comments array only contain id
                if (dat != null) {
                  dat.comments = commentsArr;
                }
                
                console.log(dat);
                if (dat && dat.days == this.days){
                  this.activities.push(dat);
                  //console.log(this.activities);
                }
              }); 
              
            }
            //console.log(this.activities);
           // console.log(this.plan);
            
          });
        });
      });
      
  }
  increaseDay() {
    if (this.days < this.dayLength) {
      this.days++;
      this.activities = [];
      this.storage.get('currUser').then(user => {
      console.log(user);
        this.authService.getUser(user.result.user._id).subscribe(data => {
          console.log(data.plans[data.plans.length-1]);
          this.plansID = data.plans[data.plans.length-1];
          //console.log(this.plansID);
          this.planService.getPlan(this.plansID).subscribe(data => {       
            this.plan = data
            var actlength = data.activities.length;
            //this.activities = data.activities;
            for(var i2 = 0; i2 < actlength; i2++){
              this.activityService.getActivity(data.activities[i2]).subscribe(dat => {
                // if data exists
                if (dat != null) {
                  // make an empty comments array
                  var commentsArr = [];
                  var j = 0;
                  var datlength = dat.comments.length;
                  // for all comments in the activity, get the data from back end and push it into 
                  // the comments array
                  while (j < datlength) {
                    console.log('variable j: ' + j + ' and comments is: ' + dat.comments[j])
                    this.activityService.getComment(dat.comments[j]).subscribe(comment => {
                      console.log(comment, j);
                      commentsArr.push(comment);
                    })
                    j++;
                  }
                }
                // replace the activity's comments array with the new comments array
                // cuz the current activity's comments array only contain id
                if (dat != null) {
                  dat.comments = commentsArr;
                }
                
                console.log(dat);
                if (dat && dat.days == this.days){
                  this.activities.push(dat);
                }
              }); 
              
            }
          });
        });
      });
    }
  }

  decreaseDay() {
    if (this.days > 1) {
      this.days--;
      this.activities = [];
      this.storage.get('currUser').then(user => {
      console.log(user);
        this.authService.getUser(user.result.user._id).subscribe(data => {
          console.log(data.plans[data.plans.length-1]);
          this.plansID = data.plans[data.plans.length-1];
          //console.log(this.plansID);
          this.planService.getPlan(this.plansID).subscribe(data => {       
            this.plan = data
            var actlength = data.activities.length;
            //this.activities = data.activities;
            for(var i2 = 0; i2 < actlength; i2++){
              this.activityService.getActivity(data.activities[i2]).subscribe(dat => {
                // if data exists
                if (dat != null) {
                  // make an empty comments array
                  var commentsArr = [];
                  var j = 0;
                  var datlength = dat.comments.length;
                  // for all comments in the activity, get the data from back end and push it into 
                  // the comments array
                  while (j < datlength) {
                    console.log('variable j: ' + j + ' and comments is: ' + dat.comments[j])
                    this.activityService.getComment(dat.comments[j]).subscribe(comment => {
                      console.log(comment, j);
                      commentsArr.push(comment);
                    })
                    j++;
                  }
                }
                // replace the activity's comments array with the new comments array
                // cuz the current activity's comments array only contain id
                if (dat != null) {
                  dat.comments = commentsArr;
                }
                
                console.log(dat);
                if (dat && dat.days == this.days){
                  this.activities.push(dat);
                }
              }); 
              
            }
          });
        });
      });
    }
  }
  delete(chip, index) {
    console.log(chip);
    var commentIndex = this.activities[index].comments.indexOf(chip);
    // send in id of comment and delete it from back end
    this.activityService.deleteComment(chip._id, chip.originActivity);
    if (index > -1) {
      // delete the comment in front end
      this.activities[index].comments.splice(commentIndex,1);
      
    }
  }

  addComment(comment, index) {
    console.log(comment,'HELLLOOO',this.plan);
    // formValue is the comment content and we add the username to the formValue object
    let formValue = {
      comment: comment,
      user: this.username
    }
    
    // add the comment content into the activities array for front end
    this.activities[index].comments.push(formValue)
    console.log(formValue,'HELLLOOO',this.plan);
    // this is to refresh the actvity id cuz when you create an activity the id has not been included in the front end,
    // so we do this so the front end now has an activity id and we can use that info later
    this.storage.get('currUser').then(user => {
        this.authService.getUser(user.result.user._id).subscribe(data => {
          this.plansID = data.plans[data.plans.length-1];
          this.planService.getPlan(this.plansID).subscribe(data => {       
            this.plan = data
          });
        });
    });
    console.log(this.plan.activities[index])
    // make a new comment which has username, content, and the activity ID it is under
    let newComment = {
      user:this.username,
      comment:formValue.comment,
      originActivity:this.plan.activities[index]
    }
    this.activityService.createAndAddComment(newComment, this.plan.activities[index]); 
    // this.activities[index].addComment(formValue);
    this.comment = ''
  }
  increase(index) {
    // increase likes for front end
    this.activities[index].likes++;
    let lik = {
      likes: this.activities[index].likes
    }
    // send likes to back end and update the activity
    this.activityService.addLikes(this.activities[index]._id,lik)
  }

  launchActivityPage() {

    let modal = this.modalCtrl.create(ActivityPage);

    modal.onDidDismiss(activity => {
      if(activity){
        //console.log(activity)
        //let currActivity = new AlternativeModel(activity, [], 0, []);
        activity.days = this.days;
        this.activities.push(activity);
        //console.log(currActivity);
        console.log(this.plansID);
        this.activityService.createActivity(activity, this.plansID);        
      }
    });

    modal.present();
  }

  launchAnotherPage(index) {

    let modal = this.modalCtrl.create(ActivityPage);

    modal.onDidDismiss(activity => {
      if(activity){
        activity.originActivity = this.activities[index]._id;
        this.activities[index].alternatives.push(activity);
        console.log(this.activities[index]);
        this.activityService.addAlternative(activity, this.activities[index]._id);      
      }
    });

    modal.present();
  }

  launchAlternativesPage(index) {

    let modal = this.modalCtrl.create(AlternativesPage, this.activities[index]);

    modal.present();
  }

  deleteActivity(activity){
 
    //Remove locally
      let index = this.activities.indexOf(activity);
 
      if(index > -1){
        this.activities.splice(index, 1);
      }   
 
    //Remove from database
    this.activityService.deleteActivity(activity._id);
  }

  editActivity(currActivity){

    let modal = this.modalCtrl.create(ActivityPage, currActivity);

    modal.onDidDismiss(activity => {
      if(activity){
        this.activityService.editActivity(currActivity._id, activity);
               
      }
    });

    modal.present();
  }

  launchInvitePage() {
    let modal = this.modalCtrl.create(InvitePage, this.plan);
    modal.present();
  }

  launchLoginPage() {
    let modal = this.modalCtrl.create(LoginPage);
    modal.onDidDismiss(data => {
        
        if (data) {
          this.user = data;
          //this.logged = true;
          this.storage.set('currUser', data);
        } else {
          //this.logged = false;
        }
    });
    modal.present();
  }

  launchSignupPage() {
    let modal = this.modalCtrl.create(SignupPage);
    modal.onDidDismiss(data => {
        
        if (data) {
          this.user = data;
          //this.logged = true;
          this.storage.set('currUser', data);
        } else {
          //this.logged = false;
        }
        // console.log(data);
    });
    modal.present();
  }

  goToHome() {
    let opts = { animate: true, animation: "transition", direction: 'forward' ,duration: 1000}
    this.navCtrl.setRoot('welcome', true, opts);
    this.navCtrl.popToRoot();
  }

  presentPopover(myEvent) {
    this.authService.getUser(this.user.result.user._id).subscribe(user => {
      let popover = this.popoverCtrl.create('plans', user);
      popover.present({
        ev: myEvent
      });
    });  
  }

  logout() {
    // console.log(this.user);
    this.authService.logout();
    this.user = null;
    this.navCtrl.setRoot('welcome', false);
    this.navCtrl.popToRoot();
    // console.log(this.user);
  }

  // enterURL1() {
  //   let modal = this.modalCtrl.create(UrlPage);
  //      modal.onDidDismiss(data => {
  //         this.activity[i].url1 = data;
  //     });
  //     modal.present();
  // }

  // enterURL2() {
  //   let modal = this.modalCtrl.create(UrlPage);
  //      modal.onDidDismiss(data => {
  //         this.url2 = data;
  //     });
  //     modal.present();
  // }

  // enterURL3() {
  //   let modal = this.modalCtrl.create(UrlPage);
  //      modal.onDidDismiss(data => {
  //         this.url3 = data;
  //     });
  //     modal.present();
  // }

  // enterURL4() {
  //   let modal = this.modalCtrl.create(UrlPage);
  //      modal.onDidDismiss(data => {
  //         this.url4 = data;
  //     });
  //     modal.present();
  // }

  // enterURL5() {
  //   let modal = this.modalCtrl.create(UrlPage);
  //      modal.onDidDismiss(data => {
  //         this.url5 = data;
  //     });
  //     modal.present();
  // }

}
