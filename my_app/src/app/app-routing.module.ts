import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUploadComponent } from 'src/adminPages/adminUpload/admin-upload/admin-upload.component';
import { AdminMainComponent } from 'src/adminPages/adminMain/admin-main/admin-main.component';
import { OrderMainComponent } from 'src/pages/order-main/order-main.component';
import { LandingPageComponent } from 'src/pages/landing-page/landing-page.component';
import { BasketComponent } from 'src/pages/basket/basket.component';
import { RestaurantComponent } from 'src/pages/restaurant/restaurant.component';
import { AdminRegistrationComponent } from 'src/adminPages/admin-registration/admin-registration.component';
import { AdminLoginComponent } from 'src/adminPages/admin-login/admin-login.component';
import { RegistrationComponent } from 'src/pages/registration/registration.component';
import { LoginComponent } from 'src/pages/login/login.component';
import { ProductDetailDialogComponent } from 'src/dialog/product-detail-dialog-component/product-detail-dialog-component.component';

import { AuthGuard } from 'src/authGuard/authGuard';

const routes: Routes = [
  {path: '', redirectTo: 'landingpage', pathMatch: 'full'},
  {path: 'adminupload', component: AdminUploadComponent, canActivate: [AuthGuard]},
  {path: 'adminmain', component: AdminMainComponent, canActivate: [AuthGuard]},
  {path: 'adminregistration', component: AdminRegistrationComponent},
  {path: 'adminlogin', component: AdminLoginComponent},
  {path: 'ordermain', component: OrderMainComponent},
  {path: 'landingpage', component: LandingPageComponent},
  {path: 'basket', component: BasketComponent},
  {path: 'restaurant', component: RestaurantComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  { path: 'ordermain/:id/:name', component: ProductDetailDialogComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
