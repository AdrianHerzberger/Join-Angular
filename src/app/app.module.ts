import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { LoginComponent } from './login/login.component';
import { HeaderTemplateComponent } from './header-template/header-template.component';
import { SignupComponent } from './signup/signup.component';
import { IntroComponent } from './intro/intro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardComponent } from './board/board.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddTaskComponent } from './add-task/add-task.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderTemplateComponent,
    SignupComponent,
    IntroComponent,
    BoardComponent,
    SidebarComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}


