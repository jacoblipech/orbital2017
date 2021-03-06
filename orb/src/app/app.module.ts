import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage';
import { EmailComposer } from '@ionic-native/email-composer';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { InvitePage } from '../pages/invite/invite';
import { EditPage } from '../pages/edit/edit';
import { PopoverPage } from '../pages/popover/popover';
import { TemplatePage } from '../pages/template/template';
import { TempPage } from '../pages/temp/temp';
import { ActivityPage } from '../pages/activity/activity';
import { AlternativesPage } from '../pages/alternatives/alternatives';
import { PlansProvider } from '../providers/plans/plans';
import { ChatProvider } from '../providers/chat/chat';
import { ActivityProvider } from '../providers/activity/activity';
import { AuthProvider } from '../providers/auth/auth';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    PopoverPage,
    ActivityPage,
    AlternativesPage,
    InvitePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    PopoverPage,
    ActivityPage,
    AlternativesPage,
    InvitePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PlansProvider,
    ChatProvider,
    ActivityProvider,
    AuthProvider,
    EmailComposer
  ]
})
export class AppModule {}