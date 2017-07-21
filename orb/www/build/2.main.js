webpackJsonp([2],{

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__temp__ = __webpack_require__(288);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TempPageModule", function() { return TempPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TempPageModule = (function () {
    function TempPageModule() {
    }
    return TempPageModule;
}());
TempPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__temp__["a" /* TempPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__temp__["a" /* TempPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__temp__["a" /* TempPage */]
        ]
    })
], TempPageModule);

//# sourceMappingURL=temp.module.js.map

/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_plans_plans__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__signup_signup__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__invite_invite__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__popover_popover__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__activity_activity__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_auth_auth__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__alternatives_alternatives__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_activity_activity__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_models_alternative_model__ = __webpack_require__(289);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TempPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var TempPage = (function () {
    function TempPage(navCtrl, navParams, modalCtrl, viewCtrl, planService, popoverCtrl, authService, storage, activityService) {
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
        this.plan = this.navParams.data;
        this.activities = [];
        this.comment = '';
        this.comments = [];
        this.counter = 1;
        this.storage.get('currUser').then(function (data) {
            // console.log(data);
            _this.user = data;
        });
    }
    TempPage.prototype.ngOnInit = function () {
        //this.authService.getUser(this.navParams.get('id'));
    };
    TempPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log("HELLLO");
        this.authService.getUser(this.navParams.get('id')).subscribe(function (data) {
            console.log(data.plans[data.plans.length - 1]);
            _this.plansID = data.plans[data.plans.length - 1];
            console.log(_this.plansID);
            _this.planService.getPlan(_this.plansID).subscribe(function (data) {
                _this.plan = data;
                console.log(_this.plan);
                console.log(_this.plan.days, _this.plan.month, _this.plan.country);
            });
        });
    };
    TempPage.prototype.goToHome = function () {
        var opts = { animate: true, animation: "transition", direction: 'forward', duration: 1000 };
        this.navCtrl.setRoot('welcome', true, opts);
        this.navCtrl.popToRoot();
    };
    TempPage.prototype.next = function () {
        this.counter++;
        if (this.counter <= this.plan.days.length) {
            this.navCtrl.push('temp', this.plan);
        }
    };
    TempPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    TempPage.prototype.delete = function (chip, index) {
        this.activities[index].deleteComment(chip);
    };
    TempPage.prototype.addComment = function (formValue, index) {
        this.activities[index].addComment(formValue);
        this.comment = '';
    };
    TempPage.prototype.launchActivityPage = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__activity_activity__["a" /* ActivityPage */]);
        modal.onDidDismiss(function (activity) {
            if (activity) {
                //console.log(activity)
                var currActivity = new __WEBPACK_IMPORTED_MODULE_12__app_models_alternative_model__["a" /* AlternativeModel */](activity, [], 0, []);
                _this.activities.push(currActivity);
                //console.log(currActivity);
                //console.log(this.activities);
                _this.activityService.createActivity(activity);
            }
        });
        modal.present();
    };
    TempPage.prototype.launchAnotherPage = function (index) {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__activity_activity__["a" /* ActivityPage */]);
        modal.onDidDismiss(function (activity) {
            if (activity) {
                _this.activities[index].addItem(activity);
                console.log(_this.activities[index]);
                _this.activityService.createActivity(activity);
            }
        });
        modal.present();
    };
    TempPage.prototype.launchAlternativesPage = function (index) {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_10__alternatives_alternatives__["a" /* AlternativesPage */], this.activities[index]);
        modal.present();
    };
    TempPage.prototype.deleteActivity = function (activity) {
        //Remove locally
        var index = this.activities.indexOf(activity);
        if (index > -1) {
            this.activities.splice(index, 1);
        }
        //Remove from database
        this.activityService.deleteActivity(activity._id);
    };
    TempPage.prototype.presentPopover = function (myEvent) {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_7__popover_popover__["a" /* PopoverPage */]);
        popover.present({
            ev: myEvent
        });
    };
    TempPage.prototype.logout = function () {
        // console.log(this.user);
        this.authService.logout();
        this.user = null;
        this.navCtrl.setRoot('welcome', false);
        this.navCtrl.popToRoot();
        // console.log(this.user);
    };
    TempPage.prototype.launchInvitePage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__invite_invite__["a" /* InvitePage */]);
        modal.present();
    };
    TempPage.prototype.launchLoginPage = function () {
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
    TempPage.prototype.launchSignupPage = function () {
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
    return TempPage;
}());
TempPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])({
        name: 'temp'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-temp',template:/*ion-inline-start:"/home/vivek/webdev/angular2app/orbital2017/orb/src/pages/temp/temp.html"*/'<!--\n  Generated template for the TemplatePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar hideBackButton>\n    <ion-title>\n      <button ion-button icon-only (click)="goToHome()">\n        <ion-icon name="home"></ion-icon>\n      </button>\n      <h2 style="display:inline; ">You are travelling to {{plan.country}} during {{plan.month}} for {{plan.days}} days</h2>\n    </ion-title>\n\n    <ion-buttons end>\n      <button ion-button *ngIf="user && user.isLoggedIn" (click)="launchInvitePage()">\n        <ion-icon name="person-add"></ion-icon>Invite\n      </button>\n      <button ion-button *ngIf="!user || !user.isLoggedIn" (click)="launchLoginPage()">\n        <ion-icon name="person-add"></ion-icon>Invite\n      </button>\n      <button ion-button *ngIf="user && user.isLoggedIn" (click)="logout()">\n        Logout\n      </button>\n      <button ion-button *ngIf="user && user.isLoggedIn">\n        {{user.email}}\n      </button>\n      <button ion-button *ngIf="!user || !user.isLoggedIn" (click)="launchLoginPage()">\n        Login\n      </button>\n      <button ion-button *ngIf="!user || !user.isLoggedIn" (click)="launchSignupPage()">\n        SignUp\n      </button>\n      <button ion-button (click)="presentPopover($event)">\n      	Plans\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="card-page">\n\n	<ion-card class="card" *ngFor="let activity of activities; let i = index;">\n		<ion-card-content>\n		<ion-buttons end>\n			<button ion-button round outline small (click)="launchAlternativesPage(i)">{{activity.num}}</button>\n			<button class="cardButton" ion-button outline color="warning" (click)="launchAnotherPage(i)">\n			<ion-icon name="paper"></ion-icon> Suggest Another Activity</button>\n		</ion-buttons>\n			<ion-grid>\n				<ion-row align-items-center>\n					  <ion-col col-2>\n						<ion-datetime displayFormat="hh:mm A" placeholder="Start Time"></ion-datetime>\n						</ion-col>\n					  <ion-col col-1>\n					  	 <p>-</p>\n					  </ion-col>\n					  <ion-col col-2>\n					  	<ion-datetime displayFormat="hh:mm A" placeholder="End Time"></ion-datetime>\n					  </ion-col>\n				  </ion-row>\n			</ion-grid>\n\n			<ion-scroll scrollY="true" text-wrap>\n				<p>Activity Name: {{activity.activity.activity}}</p>\n				<p>Address: {{activity.activity.address}}</p>\n				<p>Opening Hours: {{activity.activity.openingHours}}</p>\n				<p>Expenses: {{activity.activity.expenses}}</p>\n				<p>Nearest Landmark{{activity.activity.nearestLandmark}}</p>\n				<p>Remarks: {{activity.activity.remarks}}</p>\n				<p >Images: {{activity.activity.imageUrl}}</p>\n				<p>More Info: <a href="http://{{activity.activity.url}}">{{activity.activity.url}}</a></p>\n			</ion-scroll>\n			<form #form="ngForm" (ngSubmit)="addComment(form.value, i)">\n	        <ion-item>\n	        	<ion-label>Add a comment:</ion-label>\n	          	<ion-input  [(ngModel)]="comment" name="comment"></ion-input>\n	          <button ion-button item-right type="submit" icon-only>\n	          	<ion-icon name="send" md="md-send"></ion-icon>\n	          </button>\n	        </ion-item>\n	      	</form>\n	      <ion-chip *ngFor="let comment of activity.comments">\n	        <ion-label>{{ comment.comment }}</ion-label>\n	        <button ion-button small (click)="delete(comment, i)">\n		    	<ion-icon name="close"></ion-icon>\n		  	</button>\n	      </ion-chip>\n			<ion-buttons end>\n				<button class="cardButton" ion-button outline color="danger" (click)="deleteActivity(activity)">\n				<ion-icon name="trash"></ion-icon> Delete</button>\n			</ion-buttons>\n		</ion-card-content>\n		\n	</ion-card>\n\n	<ion-card class="card">\n		<ion-card-content>\n			<ion-grid>\n				<ion-row align-items-center>\n					  <ion-col col-2>\n						<ion-datetime displayFormat="hh:mm A" [(ngModel)]="fromDate" placeholder="Start Time"></ion-datetime>\n						</ion-col>\n					  <ion-col col-1>\n					  	 <p>-</p>\n					  </ion-col>\n					  <ion-col col-2>\n					  	<ion-datetime displayFormat="hh:mm A" [(ngModel)]="toDate" placeholder="End Time"></ion-datetime>\n					  </ion-col>\n				  </ion-row>\n			</ion-grid>\n			<ion-icon class="plus" name="add-circle" md="md-add-circle" (click)="launchActivityPage()"></ion-icon>\n		</ion-card-content>\n	</ion-card>\n	<ion-tabs>\n  <!-- {{plan.days}} -->\n		<ion-tab  tabTitle="Day 1" [rootParams]="1"></ion-tab>\n    <ion-buttons>\n      <button ion-button (click)="next()">\n        Next\n      </button>\n      <button ion-button (click)="back()">\n        Back\n      </button>\n    </ion-buttons>\n	</ion-tabs>\n</ion-content>\n'/*ion-inline-end:"/home/vivek/webdev/angular2app/orbital2017/orb/src/pages/temp/temp.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__providers_plans_plans__["a" /* PlansProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_plans_plans__["a" /* PlansProvider */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* PopoverController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* PopoverController */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_9__providers_auth_auth__["a" /* AuthProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__providers_auth_auth__["a" /* AuthProvider */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_11__providers_activity_activity__["a" /* ActivityProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11__providers_activity_activity__["a" /* ActivityProvider */]) === "function" && _j || Object])
], TempPage);

var _a, _b, _c, _d, _e, _f, _g, _h, _j;
//# sourceMappingURL=temp.js.map

/***/ }),

/***/ 289:
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

/***/ })

});
//# sourceMappingURL=2.main.js.map