import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/user/sign-up/sign-in.component';
import { LoginComponent } from './components/user/log-in/login.component';
import { HomeComponent } from './components/maincomponent/home/home.component';
import { AuthGuard } from './gurds/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { ProductlistComponent } from './components/product/productlist/productlist.component';
import { ProductdetailsComponent } from './components/product/productdetails/productdetails.component';
import { SellerComponent } from './components/sellerdashboard/seller.component';
import { SearchComponent } from './components/product/search/search.component';
import { CartComponent } from './components/cart/cart.component';
import { AccountComponent } from './components/user/account/account.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'productdetails/:productid',component:ProductdetailsComponent},
  {path:'search/:name',component:SearchComponent},
  {path:'productlist',component:ProductlistComponent},
  {path:'sellerdashboard',component:SellerComponent,canActivate:[AuthGuard]
  ,data: {
    role: 'seller'
  }},
  {path:'admin',component:AdminComponent,
  canActivate:[AuthGuard],
  data: {
    role: 'admin'
  }},
  {path:'sign-up',component:SignInComponent},
  {path:'log-in',component:LoginComponent},
  {path:'cart',component:CartComponent,canActivate:[AuthGuard]},
  {path:'checkout',component:CheckoutComponent,canActivate:[AuthGuard]},
  {path:'account',component:AccountComponent,canActivate:[AuthGuard]},
  {path:'**',component:PagenotfoundComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
