import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {PageComponent} from "./pages/page.component";
import {HomeComponent} from "./pages/home/home.component";
import {CategoryListComponent} from "./pages/category/category-list.component";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {CategoryOperationComponent} from "./pages/category/category-operation.component";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {NzInputModule} from "ng-zorro-antd/input";
import {CategoryDeleteComponent} from "./pages/category/category-delete.component";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {PostListComponent} from "./pages/post/post-list.component";
import {PostOperationComponent} from "./pages/post/post-operation.component";
import {NzUploadModule} from "ng-zorro-antd/upload";
import {CategorySelectComponent} from "./pages/category/category-select.component";
import {NzSelectModule} from "ng-zorro-antd/select";

registerLocaleData(en);
const firebaseConfig = {
  apiKey: "AIzaSyDm72R-TE68Do2agAyZ2dicQEByA7T-WzA",
  authDomain: "ang-blog-4a279.firebaseapp.com",
  projectId: "ang-blog-4a279",
  storageBucket: "ang-blog-4a279.appspot.com",
  messagingSenderId: "493534911624",
  appId: "1:493534911624:web:c25a4cc19c920f08e6133d"
};
@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    HomeComponent,
    CategoryListComponent,
    CategoryOperationComponent,
    CategoryDeleteComponent,
    CategorySelectComponent,
    PostListComponent,
    PostOperationComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        IconsProviderModule,
        NzLayoutModule,
        NzMenuModule,
        AngularFireModule.initializeApp(firebaseConfig),
        provideFirestore(() => getFirestore()),
        AngularFireStorageModule,
        AngularFireAuthModule,
        NzButtonModule,
        NzSpaceModule,
        NzModalModule,
        NzFormModule,
        ReactiveFormsModule,
        NzInputNumberModule,
        NzInputModule,
        NzTableModule,
        NzDividerModule,
        NzTypographyModule,
        NzUploadModule,
        NzSelectModule
    ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
