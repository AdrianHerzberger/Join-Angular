import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HeaderTemplateComponent } from './header-template/header-template.component';
import { SignupComponent } from './signup/signup.component';
import { BoardComponent } from './board/board.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ContactsComponent } from './contacts/contacts.component';
import { SummaryComponent } from './summary/summary.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signin', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'header', component: HeaderTemplateComponent },
  { path: 'board', component: BoardComponent },
  { path: 'addTask', component: AddTaskComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'summary', component: SummaryComponent},
  { path: 'forgotpw', component: ForgotPasswordComponent},
  { path: 'resetpw', component: ResetPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
