webpackJsonp([1],{

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__popover__ = __webpack_require__(290);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopoverPageModule", function() { return PopoverPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PopoverPageModule = (function () {
    function PopoverPageModule() {
    }
    return PopoverPageModule;
}());
PopoverPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__popover__["a" /* PopoverPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__popover__["a" /* PopoverPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__popover__["a" /* PopoverPage */]
        ]
    })
], PopoverPageModule);

//# sourceMappingURL=popover.module.js.map

/***/ }),

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_plans_plans__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(33);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopoverPage; });
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
 * Generated class for the PopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var PopoverPage = (function () {
    function PopoverPage(navCtrl, navParams, viewCtrl, planService, storage, authService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.planService = planService;
        this.storage = storage;
        this.authService = authService;
        this.plans = [];
        this.user = this.navParams.data;
    }
    PopoverPage.prototype.ionViewWillLoad = function () {
        var _this = this;
        console.log(this.user);
        for (var i = 0; i < this.user.plans.length; i++) {
            this.planService.getPlan(this.user.plans[i]).subscribe(function (plan) {
                _this.plans.push(plan);
            });
        }
    };
    PopoverPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    PopoverPage.prototype.goToPlan = function (index) {
        var _this = this;
        this.planService.getPlan(this.user.plans[index]).subscribe(function (plan) {
            // plan should have user id so next page can load
            plan.id = _this.user._id;
            plan.home = false;
            plan.index = index;
            console.log(plan);
            var opts = { animate: true, animation: "transition", duration: 1000 };
            _this.navCtrl.setRoot('edit', plan, opts);
            _this.navCtrl.popToRoot();
        });
        this.close();
    };
    PopoverPage.prototype.delete = function (index) {
        console.log("deleting");
        if (index > -1) {
            this.plans.splice(index, 1);
        }
        var planID = this.user.plans[index];
        this.authService.deletePlan(this.user._id, planID);
        //this.planService.deletePlan(planID);
    };
    return PopoverPage;
}());
PopoverPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])({
        name: 'plans'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-popover',template:/*ion-inline-start:"/home/vivek/webdev/angular2app/orbital2017/orb/src/pages/popover/popover.html"*/'<!--\n  Generated template for the PopoverPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-list>\n    <ion-list-header>Plans:</ion-list-header> \n    <ion-buttons *ngFor="let plan of plans; let i = index;">\n    <button ion-button icon-only (click)="delete(i)" class="close"><ion-icon  name="trash"></ion-icon></button>\n    <button  style="display:inline;" ion-item (click)="goToPlan(i)"> {{plan.country}} ({{plan.days.length}} days)</button>\n    </ion-buttons>\n    <!-- <button ion-item (click)="close()">Bali (4 Days)By vivek</button>\n    <button ion-item (click)="close()">Singapore (3 Days) By jacob</button> -->\n</ion-list>\n'/*ion-inline-end:"/home/vivek/webdev/angular2app/orbital2017/orb/src/pages/popover/popover.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_plans_plans__["a" /* PlansProvider */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__["a" /* AuthProvider */]])
], PopoverPage);

//# sourceMappingURL=popover.js.map

/***/ })

});
//# sourceMappingURL=1.main.js.map