webpackJsonp([0],{

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__template__ = __webpack_require__(291);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplatePageModule", function() { return TemplatePageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TemplatePageModule = (function () {
    function TemplatePageModule() {
    }
    return TemplatePageModule;
}());
TemplatePageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__template__["a" /* TemplatePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__template__["a" /* TemplatePage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__template__["a" /* TemplatePage */]
        ]
    })
], TemplatePageModule);

//# sourceMappingURL=template.module.js.map

/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlternativeModel; });
var AlternativeModel = (function () {
    function AlternativeModel(activity, items, num, comments) {
        this.activity = activity;
        this.items = items;
        this.num = num;
        this.comments = comments;
        this.num = 0;
    }
    AlternativeModel.prototype.addItem = function (item) {
        this.items.push(item);
        this.num++;
    };
    AlternativeModel.prototype.addComment = function (comment) {
        this.comments.push(comment);
    };
    AlternativeModel.prototype.deleteComment = function (comment) {
        var index = this.comments.indexOf(comment);
        if (index > -1) {
            this.comments.splice(index, 1);
        }
    };
    return AlternativeModel;
}());

//# sourceMappingURL=alternative-model.js.map

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__activity_activity__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alternatives_alternatives__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_activity_activity__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_models_alternative_model__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_auth_auth__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_plans_plans__ = __webpack_require__(41);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TemplatePage; });
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
 * Generated class for the TemplatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var TemplatePage = (function () {
    function TemplatePage(navCtrl, navParams, modalCtrl, viewCtrl, activityService, planService, popoverCtrl, authService, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.activityService = activityService;
        this.planService = planService;
        this.popoverCtrl = popoverCtrl;
        this.authService = authService;
        this.storage = storage;
        this.plan = this.navParams.data;
        this.activities = [];
        this.comment = '';
        this.comments = [];
        this.likes = 0;
        this.days = 1;
        this.storage.get('currUser').then(function (data) {
            console.log(data);
            console.log(_this.plan);
            _this.user = data;
            _this.username = _this.user.email.split("@")[0];
        });
    }
    TemplatePage.prototype.ionViewWillLoad = function () {
        var _this = this;
        this.storage.get('currUser').then(function (user) {
            console.log(user);
            _this.authService.getUser(user.result.user._id).subscribe(function (data) {
                console.log(data.plans[data.plans.length - 1]);
                _this.plansID = data.plans[data.plans.length - 1];
                //console.log(this.plansID);
                _this.planService.getPlan(_this.plansID).subscribe(function (data) {
                    _this.plan = data;
                    var actlength = data.activities.length;
                    //console.log("hi");
                    //console.log("ur act length "+ data.activities.length);
                    //this.activities = data.activities;
                    for (var i2 = 0; i2 < actlength; i2++) {
                        _this.activityService.getActivity(data.activities[i2]).subscribe(function (dat) {
                            // for(var i2 = 0; i2 < actlength; i2++){
                            //   console.log("i cmae here " + i2);
                            //   console.log(data.activities[i2]);
                            // }
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
                            if (dat) {
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
    TemplatePage.prototype.delete = function (chip, index) {
        console.log(chip);
        var commentIndex = this.activities[index].comments.indexOf(chip);
        // send in id of comment and delete it from back end
        this.activityService.deleteComment(chip._id, chip.originActivity);
        if (index > -1) {
            // delete the comment in front end
            this.activities[index].comments.splice(commentIndex, 1);
        }
    };
    TemplatePage.prototype.addComment = function (formValue, index) {
        var _this = this;
        // formValue is the comment content and we add the username to the formValue object
        formValue.user = this.username;
        // add the comment content into the activities array for front end
        this.activities[index].comments.push(formValue);
        //console.log('HELLLOOO',this.plan);
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
    TemplatePage.prototype.increase = function (index) {
        // increase likes for front end
        this.activities[index].likes++;
        var lik = {
            likes: this.activities[index].likes
        };
        // send likes to back end and update the activity
        this.activityService.addLikes(this.activities[index]._id, lik);
    };
    TemplatePage.prototype.launchActivityPage = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__activity_activity__["a" /* ActivityPage */]);
        modal.onDidDismiss(function (activity) {
            if (activity) {
                //console.log(activity)
                //let currActivity = new AlternativeModel(activity, [], 0, []);
                _this.activities.push(activity);
                //console.log(currActivity);
                //console.log(this.activities);
                _this.activityService.createActivity(activity, _this.plansID);
            }
        });
        modal.present();
    };
    TemplatePage.prototype.launchAnotherPage = function (index) {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__activity_activity__["a" /* ActivityPage */]);
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
    TemplatePage.prototype.launchAlternativesPage = function (index) {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__alternatives_alternatives__["a" /* AlternativesPage */], this.activities[index]);
        modal.present();
    };
    TemplatePage.prototype.deleteActivity = function (activity) {
        //Remove locally
        var index = this.activities.indexOf(activity);
        if (index > -1) {
            this.activities.splice(index, 1);
        }
        //Remove from database
        this.activityService.deleteActivity(activity._id);
    };
    TemplatePage.prototype.editActivity = function (activity) {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__activity_activity__["a" /* ActivityPage */]);
        modal.onDidDismiss(function (activity) {
            if (activity) {
                //console.log(activity)
                var currActivity = new __WEBPACK_IMPORTED_MODULE_5__app_models_alternative_model__["a" /* AlternativeModel */](activity, [], 0, []);
                _this.activities.push(currActivity);
                //console.log(currActivity);
                //console.log(this.activities);
                _this.activityService.createActivity(activity, _this.plansID);
            }
        });
        modal.present();
        this.activityService.editActivity(activity._id, activity);
    };
    return TemplatePage;
}());
TemplatePage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])({
        name: 'template'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-template',template:/*ion-inline-start:"/home/vivek/webdev/angular2app/orbital2017/orb/src/pages/template/template.html"*/'<!--\n  Generated template for the TemplatePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n\n<ion-content class="card-page">\n	<!-- <p class="padding"></p> -->\n	<ion-content class="background">\n	<ion-card class="card" *ngFor= "let activity of activities; let i = index;">\n\n		<ion-card-content>\n		<ion-buttons end >\n			<button color="lightblue2" ion-button round outline small (click)="launchAlternativesPage(i)">{{activity.alternatives.length}}</button>\n			<button color="lightblue2" ion-button outline color="warning" (click)="launchAnotherPage(i)">Suggest Another Activity</button>\n			<!-- <ion-icon name="paper"></ion-icon> -->\n		</ion-buttons>\n<!-- 			<ion-grid>\n				<ion-row align-items-center>\n					  <ion-col col-2>\n						<ion-datetime displayFormat="hh:mm A" placeholder="Start Time"></ion-datetime>\n						</ion-col>\n					  <ion-col col-1>\n					  	 <p>-</p>\n					  </ion-col>\n					  <ion-col col-2>\n					  	<ion-datetime displayFormat="hh:mm A" placeholder="End Time"></ion-datetime>\n					  </ion-col>\n				</ion-row>\n			</ion-grid> -->\n\n			<ion-scroll scrollY="true" text-wrap *ngIf="activity.activity">\n				\n				<ion-grid>\n					<h1>{{activity.duration}}</h1>\n					  <ion-row>\n					    <ion-col col-6 class="square">\n					      <ion-img width="80px" height="80px" src="{{activity.url1}}" ></ion-img>\n					    </ion-col>\n					    <ion-col>\n					    		\n					   		<h1>{{activity.activity}}</h1>\n					   		<h2>Address: {{activity.address}}</h2>\n\n						</ion-col>\n					  </ion-row>\n					  \n					  <ion-row>\n					    <ion-col col-3>\n					      <ion-img width="80" height="80" src={{activity.url2}} ></ion-img>\n					    </ion-col>\n					    <ion-col col-3>\n					      <ion-img width="80" height="80" src={{activity.url3}} ></ion-img>	\n					    </ion-col >\n					    <ion-col col-6>\n					    	<p>Opening Hours: {{activity.openingHours}}</p>\n							<p>Expenses: {{activity.expenses}}</p>\n					    </ion-col>\n					    <ion-col>\n					    </ion-col>\n					  </ion-row>\n\n					  <ion-row>\n					    <ion-col col-3>\n					      <ion-img width="80" height="80" src={{activity.url4}} ></ion-img>\n					    </ion-col>\n					    <ion-col col-3>\n					      <ion-img width="80" height="80" src={{activity.url5}} ></ion-img>\n					    </ion-col>\n					    <ion-col col-6>\n					      <p>{{activity.remarks}}</p>\n					    </ion-col>\n					    <ion-col>\n					    </ion-col>\n					  </ion-row>\n					</ion-grid>\n\n			</ion-scroll>\n\n\n		   	<ion-item class="comment" color="lightblue" (ngSubmit)="addComment(form.value, i)">\n	          	<ion-input [(ngModel)]="comment" name="comment" placeholder="write a comment..."></ion-input>\n	          <button ion-button item-right type="submit" icon-only>\n	          	<ion-icon name="send" md="md-send"></ion-icon>\n	          </button>\n	        </ion-item>\n\n	      <ion-chip *ngFor="let comment of activity.comments">\n	        <ion-label *ngIf="comment">{{comment.user}}: {{ comment.comment }}</ion-label>\n	        <button ion-button small (click)="delete(comment, i)">\n		    	<ion-icon name="close"></ion-icon>\n		  	</button>\n	      </ion-chip>\n\n	      	<ion-item color="lightblue2">\n				<ion-buttons end>\n					<button ion-button outline color="primary" (click)="increase(i)">\n					<ion-icon name="thumbs-up"></ion-icon>{{activity.likes}}</button>\n					<button ion-button outline color="primary" name="edit" (click)="editActivity(activity)">\n					Edit</button>\n					<button name="trash" class="cardButton" ion-button outline color="danger" (click)="deleteActivity(activity)">\n					 Delete</button>\n				</ion-buttons>\n		   	</ion-item>\n\n		</ion-card-content>\n		\n	</ion-card>\n\n	<ion-card class="card">\n		<ion-card-content>\n<!-- 			<ion-grid>\n				<ion-row align-items-center>\n					  <ion-col col-2>\n						<ion-datetime displayFormat="hh:mm A" [(ngModel)]="fromDate" placeholder="Start Time"></ion-datetime>\n						</ion-col>\n					  <ion-col col-1>\n					  	 <p>-</p>\n					  </ion-col>\n					  <ion-col col-2>\n					  	<ion-datetime displayFormat="hh:mm A" [(ngModel)]="toDate" placeholder="End Time"></ion-datetime>\n					  </ion-col>\n				  </ion-row>\n			</ion-grid> -->\n			<ion-icon class="plus" name="add-circle" (click)="launchActivityPage()"></ion-icon>\n			<p class="text"> Suggest New Activity!</p>\n		</ion-card-content>\n	</ion-card>\n\n	<!-- <ion-card class="card">\n		<ion-card-content>\n			<ion-grid>\n				<ion-row align-items-center>\n					  <ion-col col-2>\n						<ion-datetime displayFormat="hh:mm A" [(ngModel)]="fromDate" placeholder="Start Time"></ion-datetime>\n						</ion-col>\n					  <ion-col col-1>\n					  	 <p>-</p>\n					  </ion-col>\n					  <ion-col col-2>\n					  	<ion-datetime displayFormat="hh:mm A" [(ngModel)]="toDate" placeholder="End Time"></ion-datetime>\n					  </ion-col>\n				  </ion-row>\n			</ion-grid>\n			<ion-icon class="plus" name="add-circle" md="md-add-circle"></ion-icon>\n		</ion-card-content>\n	</ion-card>\n\n	<ion-card class="card">\n		<ion-card-content>\n			<ion-grid>\n				<ion-row align-items-center>\n					  <ion-col col-2>\n						<ion-datetime displayFormat="hh:mm A" [(ngModel)]="fromDate" placeholder="Start Time"></ion-datetime>\n						</ion-col>\n					  <ion-col col-1>\n					  	 <p>-</p>\n					  </ion-col>\n					  <ion-col col-2>\n					  	<ion-datetime displayFormat="hh:mm A" [(ngModel)]="toDate" placeholder="End Time"></ion-datetime>\n					  </ion-col>\n				  </ion-row>\n			</ion-grid>\n			<ion-icon class="plus" name="add-circle" md="md-add-circle"></ion-icon>\n		</ion-card-content>\n	</ion-card> -->\n</ion-content>\n</ion-content>\n'/*ion-inline-end:"/home/vivek/webdev/angular2app/orbital2017/orb/src/pages/template/template.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__providers_activity_activity__["a" /* ActivityProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_activity_activity__["a" /* ActivityProvider */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_8__providers_plans_plans__["a" /* PlansProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__providers_plans_plans__["a" /* PlansProvider */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* PopoverController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* PopoverController */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_7__providers_auth_auth__["a" /* AuthProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__providers_auth_auth__["a" /* AuthProvider */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */]) === "function" && _j || Object])
], TemplatePage);

var _a, _b, _c, _d, _e, _f, _g, _h, _j;
//# sourceMappingURL=template.js.map

/***/ })

});
//# sourceMappingURL=0.main.js.map