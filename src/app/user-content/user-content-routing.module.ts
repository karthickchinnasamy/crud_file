import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserContentComponent } from './user-content.component';
import { UserContactComponent } from './user-contact/user-contact.component';
import { RoutingConstants } from '../constants/routing-constants';

const routes: Routes = [
  {
    path: 'user', component: UserContentComponent,
    children: [
      {
        path: RoutingConstants.DashboardUrl, component: DashboardComponent
      },
      {
        path: RoutingConstants.UserAdd, component: UserContactComponent
      },
      {
        path: RoutingConstants.UserEdit, component: UserContactComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserContentRoutingModule { }
