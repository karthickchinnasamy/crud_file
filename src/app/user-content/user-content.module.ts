import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserContentRoutingModule } from './user-content-routing.module';
import { UserContentComponent } from './user-content.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../material/material.module';
import { UserContactComponent } from './user-contact/user-contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactMapComponent } from './contact-map/contact-map.component';
import { GoogleMapsModule } from '@angular/google-maps';



@NgModule({
  declarations: [
    UserContentComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    UserContactComponent,
    ContactMapComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    UserContentRoutingModule,
    MaterialModule,
    GoogleMapsModule
  ]
})
export class UserContentModule { }
