import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminToolbarComponent } from 'src/adminPages/adminToolbar/admin-toolbar/admin-toolbar.component';
import { AdminUploadComponent } from 'src/adminPages/adminUpload/admin-upload/admin-upload.component';
import { AdminMainComponent } from 'src/adminPages/adminMain/admin-main/admin-main.component';
import { ToolbarComponent } from 'src/pages/toolbar/toolbar.component';
import { LandingPageComponent } from 'src/pages/landing-page/landing-page.component';
import { OrderMainComponent } from 'src/pages/order-main/order-main.component';
import { BasketComponent } from 'src/pages/basket/basket.component';
import { RestaurantComponent } from 'src/pages/restaurant/restaurant.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminToolbarComponent,
    AdminUploadComponent,
    AdminMainComponent,
    ToolbarComponent,
    LandingPageComponent,
    OrderMainComponent,
    BasketComponent,
    RestaurantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
