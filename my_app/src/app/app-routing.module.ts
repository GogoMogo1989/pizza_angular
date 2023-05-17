import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUploadComponent } from 'src/adminPages/adminUpload/admin-upload/admin-upload.component';
import { AdminMainComponent } from 'src/adminPages/adminMain/admin-main/admin-main.component';
import { OrderMainComponent } from 'src/pages/order-main/order-main.component';
import { LandingPageComponent } from 'src/pages/landing-page/landing-page.component';
import { BasketComponent } from 'src/pages/basket/basket.component';
import { RestaurantComponent } from 'src/pages/restaurant/restaurant.component';

const routes: Routes = [
  {path:'adminupload', component: AdminUploadComponent},
  {path: 'adminmain', component: AdminMainComponent},
  {path: 'ordermain', component: OrderMainComponent},
  {path: 'landingpage', component: LandingPageComponent},
  {path: 'basket', component: BasketComponent},
  {path: 'restaurant', component: RestaurantComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
