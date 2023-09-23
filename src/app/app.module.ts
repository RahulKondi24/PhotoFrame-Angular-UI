import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './components/user/sign-up/sign-in.component';
import { LoginComponent } from './components/user/log-in/login.component';
import { HomeComponent } from './components/maincomponent/home/home.component';
import { NavComponent } from './components/maincomponent/nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AdminComponent } from './components/admin/admin.component';
import {DataTablesModule} from 'angular-datatables';
import { ProductlistComponent } from './components/product/productlist/productlist.component';
import { ProductdetailsComponent } from './components/product/productdetails/productdetails.component';
import { SellerComponent } from './components/sellerdashboard/seller.component';
import { FooterComponent } from './components/maincomponent/footer/footer.component';
import { SearchComponent } from './components/product/search/search.component';
import { CartComponent } from './components/cart/cart.component';
import { AccountComponent } from './components/user/account/account.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { CheckoutComponent } from './components/checkout/checkout.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    AdminComponent,
    ProductlistComponent,
    ProductdetailsComponent,
    SellerComponent,
    FooterComponent,
    SearchComponent,
    CartComponent,
    AccountComponent,
    PagenotfoundComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot(),
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
