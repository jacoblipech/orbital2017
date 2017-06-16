import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { EditPage } from '../pages/edit/edit';
import { PopoverPage } from '../pages/popover/popover';
import { TemplatePage } from '../pages/template/template';
import { ActivityPage } from '../pages/activity/activity';
import { PlansProvider } from '../providers/plans/plans';
import { ChatProvider } from '../providers/chat/chat';
import { ActivityProvider } from '../providers/activity/activity';
import { AuthProvider } from '../providers/auth/auth';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    EditPage,
    PopoverPage,
    TemplatePage,
    ActivityPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicPageModule.forChild(EditPage)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    EditPage,
    PopoverPage,
    TemplatePage,
    ActivityPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PlansProvider,
    ChatProvider,
    ActivityProvider,
    AuthProvider,
    Storage
  ]
})
export class AppModule {}