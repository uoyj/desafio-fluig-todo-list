import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { TokenInterceptService } from './services/token-intercept.service';
import { TasksAPIService } from './services/tasks-api.service';

import { AppHeaderComponent } from './app-header/app-header.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { ListComponent } from './components/list/list.component';
import { TaskComponent } from './components/task/task.component';


@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    HomeComponent,
    ListsComponent,
    ListComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    FormBuilder,
    AuthService,
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptService, multi: true},
    TasksAPIService
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
