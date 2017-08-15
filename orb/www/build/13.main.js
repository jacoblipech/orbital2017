webpackJsonp([13],{

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__edit__ = __webpack_require__(287);
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

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_plans_plans__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__signup_signup__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__invite_invite__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_auth_auth__ = __webpack_require__(29);
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
    function EditPage(navCtrl, navParams, modalCtrl, viewCtrl, planService, popoverCtrl, authService, storage) {
        // this.storage.set('data', this.navParams.data);
        // this.storage.get('data').then((data)=>{
        //   console.log(data);
        // });
        //console.log(this.plan.days, this.plan.month, this.plan.country);
        // this.numbers = Array.apply(null, {
        //     length: this.plan.days
        //   }).map(Number.call, Number);
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.planService = planService;
        this.popoverCtrl = popoverCtrl;
        this.authService = authService;
        this.storage = storage;
        //getting data about plan from home!
        this.plan = this.navParams.data;
        this.storage.get('currUser').then(function (data) {
            // console.log(data);
            _this.user = data;
        });
        this.tab1Root = 'template';
    }
    EditPage.prototype.ngOnInit = function () {
        var _this = this;
        //allows this.plan to retrieve data from storage upon being loaded
        // this.storage.get('data').then((data)=>{
        //     this.plan = data;
        // });
        console.log(this.navParams.get('id'));
        this.authService.getUser(this.navParams.get('id')).subscribe(function (data) {
            console.log(data);
            console.log(data.plans[data.plans.length - 1]);
            _this.plansID = data.plans[data.plans.length - 1];
            //console.log(this.plansID);
            _this.planService.getPlan(_this.plansID).subscribe(function (data) {
                _this.plan = data;
                _this.dayLength = _this.plan.days.length;
                //console.log(this.plan);
                //console.log(this.plan.days, this.plan.month, this.plan.country);
            });
        });
        // console.log(this.plan); plan is correctly passed from home.ts
        // console.log(this.user);
        //console.log(this.plansID);
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
        selector: 'page-edit',template:/*ion-inline-start:"/Users/JacobLI/Downloads/orbital2017/orb/src/pages/edit/edit.html"*/'<!--\n  Generated template for the EditPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>\n      <button ion-button icon-only class="home" (click)="goToHome()">\n        <ion-icon name="home"></ion-icon>\n      </button>\n      <h2 class="header" style="display:inline;">Planning Trip to {{plan.country}} during {{plan.month}} for {{dayLength}} days</h2>\n    </ion-title>\n\n    <ion-buttons end>\n      <button ion-button *ngIf="user && user.isLoggedIn" (click)="launchInvitePage()">\n        <ion-icon name="person-add"></ion-icon>Invite\n      </button>\n      <button ion-button *ngIf="!user || !user.isLoggedIn" (click)="launchLoginPage()">\n        <ion-icon name="person-add"></ion-icon>Invite\n      </button>\n      <button ion-button *ngIf="user && user.isLoggedIn" (click)="logout()">\n        Logout\n      </button>\n      <button ion-button *ngIf="user && user.isLoggedIn">\n        {{user.email}}\n      </button>\n      <button ion-button *ngIf="!user || !user.isLoggedIn" (click)="launchLoginPage()">\n        Login\n      </button>\n      <button ion-button *ngIf="!user || !user.isLoggedIn" (click)="launchSignupPage()">\n        SignUp\n      </button>\n      <button ion-button (click)="presentPopover($event)">\n      	Plans\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding *ngIf="plan.days">\n\n	<ion-tabs >\n  <!-- {{plan.days}} -->\n		<ion-tab *ngFor="let number of plan.days" [root]="tab1Root" tabTitle="Day {{number + 1}}" [rootParams]="plan"></ion-tab>\n	</ion-tabs>\n\n</ion-content>\n'/*ion-inline-end:"/Users/JacobLI/Downloads/orbital2017/orb/src/pages/edit/edit.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_plans_plans__["a" /* PlansProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* PopoverController */],
        __WEBPACK_IMPORTED_MODULE_7__providers_auth_auth__["a" /* AuthProvider */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
], EditPage);

//# sourceMappingURL=edit.js.map

/***/ })

});
//# sourceMappingURL=13.main.js.map