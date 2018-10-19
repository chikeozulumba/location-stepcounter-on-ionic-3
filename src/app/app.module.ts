import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InitialPage } from '../pages/initial/initial';

import { NativeStorage } from '@ionic-native/native-storage';
import { IonicStorageModule } from '@ionic/storage';
import { LocationTrackerProvider } from '../providers/location-tracker/location-tracker';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { Stepcounter } from '@ionic-native/stepcounter';
import { MapPage } from '../pages/map/map';

import { ResultPage } from '../pages/result/result';
import { CharityPage } from '../pages/charity/charity';
import { FinalPage } from '../pages/final/final';

import { SummaryPage } from '../pages/summary/summary';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    InitialPage,
    MapPage,
    ResultPage,
    CharityPage,
    SummaryPage
    // FinalPage
  ],
  imports: [
  BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    InitialPage,
    MapPage,
    ResultPage,
    CharityPage,
    SummaryPage
    // FinalPage
  ],
  providers: [
    Geolocation,
    BackgroundGeolocation,
    NativeStorage,
    Stepcounter,
    Storage,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocationTrackerProvider
  ]
})
export class AppModule {}
