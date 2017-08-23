webpackJsonp([2],{

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__edit__ = __webpack_require__(289);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditPageModule", function() { return EditPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EditPageModule = (function () {
    function EditPageModule() {
    }
    return EditPageModule;
}());
EditPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__edit__["a" /* EditPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__edit__["a" /* EditPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__edit__["a" /* EditPage */]
        ]
    })
], EditPageModule);

//# sourceMappingURL=edit.module.js.map

/***/ }),

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_plans_plans__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__signup_signup__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__invite_invite__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_auth_auth__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_activity_activity__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__activity_activity__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__alternatives_alternatives__ = __webpack_require__(206);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











/**
 * Generated class for the EditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var EditPage = (function () {
    function EditPage(navCtrl, navParams, modalCtrl, viewCtrl, planService, popoverCtrl, authService, storage, activityService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.planService = planService;
        this.popoverCtrl = popoverCtrl;
        this.authService = authService;
        this.storage = storage;
        this.activityService = activityService;
        //getting data about plan from home!
        this.plan = this.navParams.data;
        this.altCounter = 0;
        this.alt = undefined;
        this.activities = [];
        this.comment = '';
        this.comments = [];
        this.likes = 0;
        this.days = 1;
        this.storage.get('currUser').then(function (data) {
            _this.user = data;
            _this.username = _this.user.email.split("@")[0];
        });
    }
    EditPage.prototype.ionViewWillLoad = function () {
        var _this = this;
        this.storage.get('currUser').then(function (user) {
            console.log(user);
            _this.authService.getUser(user.result.user._id).subscribe(function (data) {
                //console.log(data.plans[data.plans.length-1]);
                _this.plansID = data.plans[data.plans.length - 1];
                if (_this.plan.home == false) {
                    _this.plansID = data.plans[_this.plan.index];
                }
                //console.log(this.plansID);
                _this.planService.getPlan(_this.plansID).subscribe(function (data) {
                    _this.plan = data;
                    _this.dayLength = _this.plan.days.length;
                    var actlength = data.activities.length;
                    for (var i2 = 0; i2 < actlength; i2++) {
                        _this.activityService.getActivity(data.activities[i2]).subscribe(function (dat) {
                            // if data exists
                            if (dat != null) {
                                // make an empty comments array
                                var commentsArr = [];
                                var j = 0;
                                var datlength = dat.comments.length;
                                // for all comments in the activity, get the data from back end and push it into 
                                // the comments array
                                while (j < datlength) {
                                    console.log('variable j: ' + j + ' and comments is: ' + dat.comments[j]);
                                    _this.activityService.getComment(dat.comments[j]).subscribe(function (comment) {
                                        console.log(comment, j);
                                        commentsArr.push(comment);
                                    });
                                    j++;
                                }
                            }
                            // replace the activity's comments array with the new comments array
                            // cuz the current activity's comments array only contain id
                            if (dat != null) {
                                dat.comments = commentsArr;
                            }
                            console.log(dat);
                            if (dat && dat.days == _this.days) {
                                _this.activities.push(dat);
                                //console.log(this.activities);
                            }
                        });
                    }
                    //console.log(this.activities);
                    // console.log(this.plan);
                });
            });
        });
    };
    EditPage.prototype.increaseDay = function () {
        var _this = this;
        if (this.days < this.dayLength) {
            this.days++;
            this.activities = [];
            this.storage.get('currUser').then(function (user) {
                console.log(user);
                _this.authService.getUser(user.result.user._id).subscribe(function (data) {
                    console.log(data.plans[data.plans.length - 1]);
                    _this.plansID = data.plans[data.plans.length - 1];
                    //console.log(this.plansID);
                    _this.planService.getPlan(_this.plansID).subscribe(function (data) {
                        _this.plan = data;
                        var actlength = data.activities.length;
                        //this.activities = data.activities;
                        for (var i2 = 0; i2 < actlength; i2++) {
                            _this.activityService.getActivity(data.activities[i2]).subscribe(function (dat) {
                                // if data exists
                                if (dat != null) {
                                    // make an empty comments array
                                    var commentsArr = [];
                                    var j = 0;
                                    var datlength = dat.comments.length;
                                    // for all comments in the activity, get the data from back end and push it into 
                                    // the comments array
                                    while (j < datlength) {
                                        console.log('variable j: ' + j + ' and comments is: ' + dat.comments[j]);
                                        _this.activityService.getComment(dat.comments[j]).subscribe(function (comment) {
                                            console.log(comment, j);
                                            commentsArr.push(comment);
                                        });
                                        j++;
                                    }
                                }
                                // replace the activity's comments array with the new comments array
                                // cuz the current activity's comments array only contain id
                                if (dat != null) {
                                    dat.comments = commentsArr;
                                }
                                console.log(dat);
                                if (dat && dat.days == _this.days) {
                                    _this.activities.push(dat);
                                }
                            });
                        }
                    });
                });
            });
        }
    };
    EditPage.prototype.decreaseDay = function () {
        var _this = this;
        if (this.days > 1) {
            this.days--;
            this.activities = [];
            this.storage.get('currUser').then(function (user) {
                console.log(user);
                _this.authService.getUser(user.result.user._id).subscribe(function (data) {
                    console.log(data.plans[data.plans.length - 1]);
                    _this.plansID = data.plans[data.plans.length - 1];
                    //console.log(this.plansID);
                    _this.planService.getPlan(_this.plansID).subscribe(function (data) {
                        _this.plan = data;
                        var actlength = data.activities.length;
                        //this.activities = data.activities;
                        for (var i2 = 0; i2 < actlength; i2++) {
                            _this.activityService.getActivity(data.activities[i2]).subscribe(function (dat) {
                                // if data exists
                                if (dat != null) {
                                    // make an empty comments array
                                    var commentsArr = [];
                                    var j = 0;
                                    var datlength = dat.comments.length;
                                    // for all comments in the activity, get the data from back end and push it into 
                                    // the comments array
                                    while (j < datlength) {
                                        console.log('variable j: ' + j + ' and comments is: ' + dat.comments[j]);
                                        _this.activityService.getComment(dat.comments[j]).subscribe(function (comment) {
                                            console.log(comment, j);
                                            commentsArr.push(comment);
                                        });
                                        j++;
                                    }
                                }
                                // replace the activity's comments array with the new comments array
                                // cuz the current activity's comments array only contain id
                                if (dat != null) {
                                    dat.comments = commentsArr;
                                }
                                console.log(dat);
                                if (dat && dat.days == _this.days) {
                                    _this.activities.push(dat);
                                }
                            });
                        }
                    });
                });
            });
        }
    };
    EditPage.prototype.delete = function (chip, index) {
        console.log(chip);
        var commentIndex = this.activities[index].comments.indexOf(chip);
        // send in id of comment and delete it from back end
        this.activityService.deleteComment(chip._id, chip.originActivity);
        if (index > -1) {
            // delete the comment in front end
            this.activities[index].comments.splice(commentIndex, 1);
        }
    };
    EditPage.prototype.addComment = function (comment, index) {
        var _this = this;
        console.log(comment, 'HELLLOOO', this.plan);
        // formValue is the comment content and we add the username to the formValue object
        var formValue = {
            comment: comment,
            user: this.username
        };
        // add the comment content into the activities array for front end
        this.activities[index].comments.push(formValue);
        console.log(formValue, 'HELLLOOO', this.plan);
        // this is to refresh the actvity id cuz when you create an activity the id has not been included in the front end,
        // so we do this so the front end now has an activity id and we can use that info later
        this.storage.get('currUser').then(function (user) {
            _this.authService.getUser(user.result.user._id).subscribe(function (data) {
                _this.plansID = data.plans[data.plans.length - 1];
                _this.planService.getPlan(_this.plansID).subscribe(function (data) {
                    _this.plan = data;
                });
            });
        });
        console.log(this.plan.activities[index]);
        // make a new comment which has username, content, and the activity ID it is under
        var newComment = {
            user: this.username,
            comment: formValue.comment,
            originActivity: this.plan.activities[index]
        };
        this.activityService.createAndAddComment(newComment, this.plan.activities[index]);
        // this.activities[index].addComment(formValue);
        this.comment = '';
    };
    EditPage.prototype.deleteAltComment = function (chip, index) {
        console.log(chip);
        var commentIndex = this.activities[index].comments.indexOf(chip);
        // send in id of comment and delete it from back end
        this.activityService.deleteAltComment(chip._id, chip.originActivity);
        if (index > -1) {
            // delete the comment in front end
            this.alt.comments.splice(commentIndex, 1);
        }
    };
    EditPage.prototype.addAltComment = function (comment, alt) {
        var _this = this;
        // formValue is the comment content and we add the username to the formValue object
        var formValue = {
            comment: comment,
            user: this.username
        };
        // add the comment content into the activities array for front end
        this.alt.comments.push(formValue);
        // this is to refresh the actvity id cuz when you create an activity the id has not been included in the front end,
        // so we do this so the front end now has an activity id and we can use that info later
        this.storage.get('currUser').then(function (user) {
            _this.authService.getUser(user.result.user._id).subscribe(function (data) {
                _this.plansID = data.plans[data.plans.length - 1];
                _this.planService.getPlan(_this.plansID).subscribe(function (data) {
                    _this.plan = data;
                });
            });
        });
        // make a new comment which has username, content, and the activity ID it is under
        var newComment = {
            user: this.username,
            comment: formValue.comment,
            originActivity: this.alt._id
        };
        this.activityService.createAndAddAltComment(newComment, this.alt._id);
        // this.activities[index].addComment(formValue);
        this.comment = '';
    };
    EditPage.prototype.increase = function (index) {
        // increase likes for front end
        this.activities[index].likes++;
        var lik = {
            likes: this.activities[index].likes
        };
        // send likes to back end and update the activity
        this.activityService.addLikes(this.activities[index]._id, lik);
    };
    EditPage.prototype.launchActivityPage = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_9__activity_activity__["a" /* ActivityPage */]);
        modal.onDidDismiss(function (activity) {
            if (activity) {
                //console.log(activity)
                //let currActivity = new AlternativeModel(activity, [], 0, []);
                activity.days = _this.days;
                _this.activities.push(activity);
                //console.log(currActivity);
                console.log(_this.plansID);
                _this.activityService.createActivity(activity, _this.plansID);
            }
        });
        modal.present();
    };
    EditPage.prototype.launchAnotherPage = function (index) {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_9__activity_activity__["a" /* ActivityPage */]);
        modal.onDidDismiss(function (activity) {
            if (activity) {
                activity.originActivity = _this.activities[index]._id;
                _this.activities[index].alternatives.push(activity);
                console.log(_this.activities[index]);
                _this.activityService.addAlternative(activity, _this.activities[index]._id);
            }
        });
        modal.present();
    };
    EditPage.prototype.launchAlternativesPage = function (index) {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_10__alternatives_alternatives__["a" /* AlternativesPage */], this.activities[index]);
        modal.present();
    };
    EditPage.prototype.nextAlt = function (index) {
        var _this = this;
        this.activityService.getAlternative(this.activities[index].alternatives[this.altCounter]).subscribe(function (alter) {
            _this.alt = alter;
            var commentsArr = [];
            if (alter != null) {
                // make an empty comments array
                var j = 0;
                var datlength = alter.comments.length;
                while (j < datlength) {
                    //console.log('variable j: ' + j + ' and comments is: ' + dat.comments[j])
                    _this.activityService.getComment(alter.comments[j]).subscribe(function (comment) {
                        console.log(comment, j);
                        commentsArr.push(comment);
                    });
                    j++;
                }
            }
            if (alter != null) {
                alter.comments = commentsArr;
            }
            console.log(_this.altCounter, alter);
        });
        this.altCounter++;
        console.log(this.altCounter);
        //this.altBoolean = true;
        this.altIndex = index;
    };
    EditPage.prototype.prevAlt = function (index) {
        var _this = this;
        --this.altCounter;
        //this.altBoolean = false;
        //this.alt = undefined;
        this.activityService.getAlternative(this.activities[index].alternatives[this.altCounter - 1]).subscribe(function (alter) {
            _this.alt = alter;
            var commentsArr = [];
            if (alter != null) {
                // make an empty comments array
                var j = 0;
                var datlength = alter.comments.length;
                while (j < datlength) {
                    //console.log('variable j: ' + j + ' and comments is: ' + dat.comments[j])
                    _this.activityService.getComment(alter.comments[j]).subscribe(function (comment) {
                        console.log(comment, j);
                        commentsArr.push(comment);
                    });
                    j++;
                }
            }
            if (alter != null) {
                alter.comments = commentsArr;
            }
            console.log(_this.altCounter, alter);
        });
        if (this.altCounter == 0) {
            this.altIndex = undefined;
        }
    };
    EditPage.prototype.deleteActivity = function (activity) {
        //Remove locally
        var index = this.activities.indexOf(activity);
        if (index > -1) {
            this.activities.splice(index, 1);
        }
        //Remove from database
        this.activityService.deleteActivity(activity._id);
    };
    EditPage.prototype.editActivity = function (currActivity) {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_9__activity_activity__["a" /* ActivityPage */], currActivity);
        modal.onDidDismiss(function (activity) {
            if (activity) {
                _this.activityService.editActivity(currActivity._id, activity);
            }
        });
        modal.present();
    };
    EditPage.prototype.launchInvitePage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__invite_invite__["a" /* InvitePage */], this.plan);
        modal.present();
    };
    EditPage.prototype.launchLoginPage = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
        modal.onDidDismiss(function (data) {
            if (data) {
                _this.user = data;
                //this.logged = true;
                _this.storage.set('currUser', data);
            }
            else {
                //this.logged = false;
            }
        });
        modal.present();
    };
    EditPage.prototype.launchSignupPage = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__signup_signup__["a" /* SignupPage */]);
        modal.onDidDismiss(function (data) {
            if (data) {
                _this.user = data;
                //this.logged = true;
                _this.storage.set('currUser', data);
            }
            else {
                //this.logged = false;
            }
            // console.log(data);
        });
        modal.present();
    };
    EditPage.prototype.goToHome = function () {
        var opts = { animate: true, animation: "transition", direction: 'forward', duration: 1000 };
        this.navCtrl.setRoot('welcome', true, opts);
        this.navCtrl.popToRoot();
    };
    EditPage.prototype.presentPopover = function (myEvent) {
        var _this = this;
        this.authService.getUser(this.user.result.user._id).subscribe(function (user) {
            var popover = _this.popoverCtrl.create('plans', user);
            popover.present({
                ev: myEvent
            });
        });
    };
    EditPage.prototype.logout = function () {
        // console.log(this.user);
        this.authService.logout();
        this.user = null;
        this.navCtrl.setRoot('welcome', false);
        this.navCtrl.popToRoot();
        // console.log(this.user);
    };
    return EditPage;
}());
EditPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])({
        name: 'edit',
        segment: 'edit/:id'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-edit',template:/*ion-inline-start:"/home/vivek/webdev/angular2app/orbital2017/orb/src/pages/edit/edit.html"*/'<!--\n  Generated template for the EditPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>\n      <button ion-button icon-only class="home" (click)="goToHome()">\n        <ion-icon name="home"></ion-icon>\n      </button>\n      <h2 class="header" style="display:inline;">Planning Trip to {{plan.country}} during {{plan.month}} for {{dayLength}} days</h2>\n    </ion-title>\n\n    <ion-buttons end>\n      <button ion-button *ngIf="user && user.isLoggedIn" (click)="launchInvitePage()">\n        <ion-icon name="person-add"></ion-icon>Invite\n      </button>\n      <button ion-button *ngIf="!user || !user.isLoggedIn" (click)="launchLoginPage()">\n        <ion-icon name="person-add"></ion-icon>Invite\n      </button>\n      <button ion-button *ngIf="user && user.isLoggedIn" (click)="logout()">\n        Logout\n      </button>\n      <button ion-button *ngIf="user && user.isLoggedIn">\n        {{user.email}}\n      </button>\n      <button ion-button *ngIf="!user || !user.isLoggedIn" (click)="launchLoginPage()">\n        Login\n      </button>\n      <button ion-button *ngIf="!user || !user.isLoggedIn" (click)="launchSignupPage()">\n        SignUp\n      </button>\n      <button ion-button (click)="presentPopover($event)">\n      	Plans\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content class="card-page">\n  \n  <ion-content class="background">\n\n  <div>\n      <button ion-button outline icon-only class="back" (click)="decreaseDay()">\n        <ion-icon name="arrow-back"></ion-icon>\n      </button>\n        <h1 class="days" text-center style="display:inline;">DAY {{days}} of {{dayLength}}</h1>\n      <button ion-button outline icon-only class="forward" (click)="increaseDay()">\n        <ion-icon name="arrow-forward"></ion-icon>\n      </button>\n  </div>\n\n\n  <div  *ngFor="let activity of activities; let i = index;"> <!-- Added a div to cover each card so as to add an alternatives arrow per activity card -->\n\n  <ion-card class="card" *ngIf="alt && altIndex == i">\n    <ion-card-content>\n      <div text-end>\n        <button color="lightblue2" ion-button round outline small (click)="launchAlternativesPage(i)">{{activity.alternatives.length}}</button>\n        <button color="lightblue2" ion-button outline (click)="launchAnotherPage(i)">\n        <ion-icon class="suggest" color="lightblue2" name="paper"></ion-icon>Suggest Another Activity</button>\n      </div>\n      <ion-scroll scrollY="true" text-wrap *ngIf="alt">\n        \n        <ion-grid>\n          <h1 class="duration">{{alt.duration}}</h1>\n            <ion-row>\n              <ion-col col-6 class="square">\n                <ion-img *ngIf="alt.url1" width="380px" height="200px" src="{{alt.url1}}" ></ion-img>\n                <button *ngIf="!alt.url1" ion-button block outline class="squarebutton" (click)="enterURL1()">+</button>\n              </ion-col>\n              <ion-col>\n                  \n                <h1 class="activity">{{alt.activity}}</h1>\n                <h2 class="address">Address: {{alt.address}}</h2>\n                <p class="opening">Opening Hours: {{alt.openingHours}}</p>\n\n            </ion-col>\n            </ion-row>\n            \n            <ion-row>\n              <ion-col col-3>\n                <ion-img *ngIf="alt.url2" width="185" height="105" src={{alt.url2}} ></ion-img>\n                <button *ngIf="!alt.url2" ion-button block outline class="smallsquare" (click)="enterURL2()">+</button>\n              </ion-col>\n              <ion-col col-3>\n                <ion-img *ngIf="alt.url3" width="185" height="105" src={{alt.url3}} ></ion-img> \n                <button *ngIf="!alt.url3" ion-button block outline class="smallsquare" (click)="enterURL3()">+</button>\n              </ion-col >\n              <ion-col col-6>\n                <p class="expenses">Expenses: {{activity.expenses}}</p>\n              </ion-col>\n              <ion-col>\n              </ion-col>\n            </ion-row>\n\n            <ion-row>\n              <ion-col col-3>\n                <ion-img *ngIf="alt.url4" width="185" height="105" src={{alt.url4}} ></ion-img>\n                <button *ngIf="!alt.url4" ion-button block outline class="smallsquare" (click)="enterURL4()">+</button>\n              </ion-col>\n              <ion-col col-3>\n                <ion-img *ngIf="alt.url5" width="185" height="105" src={{alt.url5}} ></ion-img>\n                <button *ngIf="!alt.url5" ion-button block outline class="smallsquare" (click)="enterURL5()">+</button>\n              </ion-col>\n              <ion-col col-6>\n                <p class="remarks">Remarks: {{alt.remarks}}</p>\n              </ion-col>\n              <ion-col>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n\n      </ion-scroll>\n\n      <div>\n        <form (ngSubmit)="addAltComment(comment, alt)">\n          <div text-end>\n            <ion-input class="comment" [(ngModel)]="comment" name="comment" placeholder="write a comment..."></ion-input>\n              <!-- <button ion-button type="submit" icon-only end><ion-icon name="send" md="md-send"></ion-icon></button> -->\n          </div>\n        </form>\n      </div>\n\n        <ion-item class="comment" *ngFor="let comment of alt.comments">\n          <ion-label style="display:inline;" *ngIf="comment">{{comment.user}}: {{ comment.comment }} <button class="commentClose" ion-button round small outline icon-only (click)="deleteAltComment(comment, i)">\n            <ion-icon name="close"></ion-icon>\n          </button></ion-label>\n          \n        </ion-item>\n        <ion-item color="lightblue2">\n        <ion-buttons end>\n          <button ion-button outline color="primary" (click)="increase(i)">\n          <ion-icon name="thumbs-up"></ion-icon>{{activity.likes}}</button>\n          <button ion-button outline color="primary" name="edit" (click)="editActivity(activity)">\n          Edit</button>\n          <button name="trash" class="cardButton" ion-button outline color="danger" (click)="deleteActivity(activity)">\n           Delete</button>\n        </ion-buttons>\n        </ion-item>\n\n    </ion-card-content>\n  </ion-card>\n\n  <ion-card class="card" *ngIf="i != altIndex">\n    <ion-card-content>\n\n      <div text-end>\n        <button color="lightblue2" ion-button round outline small (click)="launchAlternativesPage(i)">{{activity.alternatives.length}}</button>\n        <button color="lightblue2" ion-button outline (click)="launchAnotherPage(i)">\n        <ion-icon class="suggest" color="lightblue2" name="paper"></ion-icon>Suggest Another Activity</button>\n      </div>\n<!--      <ion-grid>\n        <ion-row align-items-center>\n            <ion-col col-2>\n            <ion-datetime displayFormat="hh:mm A" placeholder="Start Time"></ion-datetime>\n            </ion-col>\n            <ion-col col-1>\n               <p>-</p>\n            </ion-col>\n            <ion-col col-2>\n              <ion-datetime displayFormat="hh:mm A" placeholder="End Time"></ion-datetime>\n            </ion-col>\n        </ion-row>\n      </ion-grid> -->\n\n      <ion-scroll scrollY="true" text-wrap *ngIf="activity.activity">\n        \n        <ion-grid>\n          <h1 class="duration">{{activity.duration}}</h1>\n            <ion-row>\n              <ion-col col-6 class="square">\n                <ion-img *ngIf="activity.url1" width="380px" height="200px" src="{{activity.url1}}" ></ion-img>\n                <button *ngIf="!activity.url1" ion-button block outline class="squarebutton" (click)="enterURL1()">+</button>\n              </ion-col>\n              <ion-col>\n                  \n                <h1 class="activity">{{activity.activity}}</h1>\n                <h2 class="address">Address: {{activity.address}}</h2>\n                <p class="opening">Opening Hours: {{activity.openingHours}}</p>\n\n            </ion-col>\n            </ion-row>\n            \n            <ion-row>\n              <ion-col col-3>\n                <ion-img *ngIf="activity.url2" width="185" height="105" src={{activity.url2}} ></ion-img>\n                <button *ngIf="!activity.url2" ion-button block outline class="smallsquare" (click)="enterURL2()">+</button>\n              </ion-col>\n              <ion-col col-3>\n                <ion-img *ngIf="activity.url3" width="185" height="105" src={{activity.url3}} ></ion-img> \n                <button *ngIf="!activity.url3" ion-button block outline class="smallsquare" (click)="enterURL3()">+</button>\n              </ion-col >\n              <ion-col col-6>\n                <p class="expenses">Expenses: {{activity.expenses}}</p>\n              </ion-col>\n              <ion-col>\n              </ion-col>\n            </ion-row>\n\n            <ion-row>\n              <ion-col col-3>\n                <ion-img *ngIf="activity.url4" width="185" height="105" src={{activity.url4}} ></ion-img>\n                <button *ngIf="!activity.url4" ion-button block outline class="smallsquare" (click)="enterURL4()">+</button>\n              </ion-col>\n              <ion-col col-3>\n                <ion-img *ngIf="activity.url5" width="185" height="105" src={{activity.url5}} ></ion-img>\n                <button *ngIf="!activity.url5" ion-button block outline class="smallsquare" (click)="enterURL5()">+</button>\n              </ion-col>\n              <ion-col col-6>\n                <p class="remarks">Remarks: {{activity.remarks}}</p>\n              </ion-col>\n              <ion-col>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n\n      </ion-scroll>\n\n        <!-- this should be a form tag, dont change it to an ion-item tag. Have to find another way to style it -->\n      <div>\n        <form (ngSubmit)="addComment(comment, i)">\n          <div text-end>\n            <ion-input class="comment" [(ngModel)]="comment" name="comment" placeholder="write a comment..."></ion-input>\n              <!-- <button ion-button type="submit" icon-only end><ion-icon name="send" md="md-send"></ion-icon></button> -->\n          </div>\n        </form>\n      </div>\n\n        <ion-item class="comment" *ngFor="let comment of activity.comments">\n          <ion-label style="display:inline;" *ngIf="comment">{{comment.user}}: {{ comment.comment }} <button class="commentClose" ion-button round small outline icon-only (click)="delete(comment, i)">\n            <ion-icon name="close"></ion-icon>\n          </button></ion-label>\n          \n        </ion-item>\n\n          <ion-item color="lightblue2">\n        <ion-buttons end>\n          <button ion-button outline color="primary" (click)="increase(i)">\n          <ion-icon name="thumbs-up"></ion-icon>{{activity.likes}}</button>\n          <button ion-button outline color="primary" name="edit" (click)="editActivity(activity)">\n          Edit</button>\n          <button name="trash" class="cardButton" ion-button outline color="danger" (click)="deleteActivity(activity)">\n           Delete</button>\n        </ion-buttons>\n        </ion-item>\n\n    </ion-card-content>\n    \n  </ion-card>\n  \n  <!-- <button ion-button icon-only round small ><ion-icon name="arrow-dropleft"></ion-icon></button>\n  <h2 text-center style="display:inline;">Alternatives</h2> -->\n  <button ion-button icon-only round class="altButton" (click)="nextAlt(i)" *ngIf="activity.alternatives.length>0 && altCounter<activity.alternatives.length"><ion-icon name="arrow-dropright"></ion-icon></button>\n  <button ion-button icon-only round class="backAltButton" (click)="prevAlt(i)" *ngIf="activity.alternatives.length>0 && altCounter>0"><ion-icon name="arrow-dropleft"></ion-icon></button>\n  </div> <!-- Added a div to cover each card so as to add an alternatives arrow per activity card -->\n\n  <ion-card>\n    <ion-card-content>\n      <ion-icon class="plus" name="add-circle" (click)="launchActivityPage()"></ion-icon>\n      <p class="text"> Suggest New Activity!</p>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n  \n</ion-content>\n'/*ion-inline-end:"/home/vivek/webdev/angular2app/orbital2017/orb/src/pages/edit/edit.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__providers_plans_plans__["a" /* PlansProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_plans_plans__["a" /* PlansProvider */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* PopoverController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* PopoverController */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_7__providers_auth_auth__["a" /* AuthProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__providers_auth_auth__["a" /* AuthProvider */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_8__providers_activity_activity__["a" /* ActivityProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__providers_activity_activity__["a" /* ActivityProvider */]) === "function" && _j || Object])
], EditPage);

var _a, _b, _c, _d, _e, _f, _g, _h, _j;
//# sourceMappingURL=edit.js.map

/***/ })

});
//# sourceMappingURL=2.main.js.map