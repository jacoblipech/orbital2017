webpackJsonp([0],{

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__template__ = __webpack_require__(282);
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

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__activity_activity__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_activity_activity__ = __webpack_require__(205);
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
    function TemplatePage(navCtrl, navParams, modalCtrl, viewCtrl, activityService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.activityService = activityService;
        this.activities = [];
        this.day = this.navParams.data;
    }
    TemplatePage.prototype.ionViewDidLoad = function () {
        console.log(this.navParams.data);
    };
    TemplatePage.prototype.launchActivityPage = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__activity_activity__["a" /* ActivityPage */]);
        modal.onDidDismiss(function (activity) {
            if (activity) {
                _this.activities.push(activity);
                _this.activityService.createActivity(activity);
            }
        });
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
    return TemplatePage;
}());
TemplatePage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])({
        name: 'template'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-template',template:/*ion-inline-start:"/Users/JacobLI/Downloads/orbital2017/orb/src/pages/template/template.html"*/'<!--\n  Generated template for the TemplatePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n\n<ion-content class="card-page">\n	\n	<ion-card class="card" *ngFor="let activity of activities">\n		<ion-card-content>\n			<ion-grid>\n				<ion-row align-items-center>\n					  <ion-col col-2>\n						<ion-datetime displayFormat="hh:mm A" placeholder="Start Time"></ion-datetime>\n						</ion-col>\n					  <ion-col col-1>\n					  	 <p>-</p>\n					  </ion-col>\n					  <ion-col col-2>\n					  	<ion-datetime displayFormat="hh:mm A" placeholder="End Time"></ion-datetime>\n					  </ion-col>\n				  </ion-row>\n			</ion-grid>\n			<ion-list no-lines>\n				<p>Activity Name: {{activity.activity}}</p>\n				<p>Address: {{activity.address}}</p>\n				<p>Opening Hours: {{activity.openingHours}}</p>\n				<p>Expenses: {{activity.expenses}}</p>\n				<p>Nearest Landmark{{activity.nearestLandmark}}</p>\n				<p>Remarks: {{activity.remarks}}</p>\n				<p>Images: {{activity.imageUrl}}</p>\n				<p>More Info: <a href="http://{{activity.url}}">{{activity.url}}</a></p>\n			</ion-list>\n			<ion-buttons end>\n				<button class="delete" ion-button outline color="danger" (click)="deleteActivity(activity)">\n				<ion-icon name="trash"></ion-icon>Delete</button>\n			</ion-buttons>\n		</ion-card-content>\n		\n	</ion-card>\n\n	<ion-card class="card">\n		<ion-card-content>\n			<ion-grid>\n				<ion-row align-items-center>\n					  <ion-col col-2>\n						<ion-datetime displayFormat="hh:mm A" [(ngModel)]="fromDate" placeholder="Start Time"></ion-datetime>\n						</ion-col>\n					  <ion-col col-1>\n					  	 <p>-</p>\n					  </ion-col>\n					  <ion-col col-2>\n					  	<ion-datetime displayFormat="hh:mm A" [(ngModel)]="toDate" placeholder="End Time"></ion-datetime>\n					  </ion-col>\n				  </ion-row>\n			</ion-grid>\n			<ion-icon class="plus" name="add-circle" md="md-add-circle" (click)="launchActivityPage()"></ion-icon>\n		</ion-card-content>\n	</ion-card>\n\n	<!-- <ion-card class="card">\n		<ion-card-content>\n			<ion-grid>\n				<ion-row align-items-center>\n					  <ion-col col-2>\n						<ion-datetime displayFormat="hh:mm A" [(ngModel)]="fromDate" placeholder="Start Time"></ion-datetime>\n						</ion-col>\n					  <ion-col col-1>\n					  	 <p>-</p>\n					  </ion-col>\n					  <ion-col col-2>\n					  	<ion-datetime displayFormat="hh:mm A" [(ngModel)]="toDate" placeholder="End Time"></ion-datetime>\n					  </ion-col>\n				  </ion-row>\n			</ion-grid>\n			<ion-icon class="plus" name="add-circle" md="md-add-circle"></ion-icon>\n		</ion-card-content>\n	</ion-card>\n\n	<ion-card class="card">\n		<ion-card-content>\n			<ion-grid>\n				<ion-row align-items-center>\n					  <ion-col col-2>\n						<ion-datetime displayFormat="hh:mm A" [(ngModel)]="fromDate" placeholder="Start Time"></ion-datetime>\n						</ion-col>\n					  <ion-col col-1>\n					  	 <p>-</p>\n					  </ion-col>\n					  <ion-col col-2>\n					  	<ion-datetime displayFormat="hh:mm A" [(ngModel)]="toDate" placeholder="End Time"></ion-datetime>\n					  </ion-col>\n				  </ion-row>\n			</ion-grid>\n			<ion-icon class="plus" name="add-circle" md="md-add-circle"></ion-icon>\n		</ion-card-content>\n	</ion-card> -->\n\n</ion-content>\n'/*ion-inline-end:"/Users/JacobLI/Downloads/orbital2017/orb/src/pages/template/template.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */], __WEBPACK_IMPORTED_MODULE_3__providers_activity_activity__["a" /* ActivityProvider */]])
], TemplatePage);

//# sourceMappingURL=template.js.map

/***/ })

});
//# sourceMappingURL=0.main.js.map