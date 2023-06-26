import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Contact } from '../models/contact';
import { Router } from '@angular/router';
import { RoutingConstants } from 'src/app/constants/routing-constants';
import { ManageLocalStorageService } from '../services/manage-local-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { ContactMapComponent } from '../contact-map/contact-map.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public displayedColumns = ['FirstName', 'LastName', 'Email', 'PhoneNumber', 'Address', 'City', 'State', 'Country', 'PostalCode','map', 'edit', 'delete'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public data: any = [];
  constructor(
    private router: Router,
    private manageLocalService: ManageLocalStorageService,
    private spinnerService: NgxSpinnerService,
    private dialog: MatDialog,
  ) { }
  ngOnInit(): void {
   this.getUsers();
  }
/**
 * Get all users from local storage
 */
  private getUsers(){
    this.spinnerService.show();
    let users: any = this.manageLocalService.getUsers();
    this.data = new MatTableDataSource<Contact>(users.reverse());
    setTimeout(() => {
      this.data.paginator = this.paginator;
    this.data.sort = this.sort;
    this.spinnerService.hide();
    }, 1000);
  }
  /**
   * Add new user
   */
  public addNewUser() {
    this.router.navigateByUrl(RoutingConstants.UserAddUrl);
  }
  /**
   * Delete already exist user
   * @param data Contact values
   */
  public delete(data: Contact) {
    console.log('remove user data: ', data);
    const confDialogRef = this.dialog.open(ConfirmDialogComponent, {//! Remove confirmation dialog
      data: {
        message: 'Are you sure remove this user?',
        buttonText: {
          ok: 'Yes, Remove it',
          cancel: 'No, Keep it'
        }
      }
    });
    confDialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed === true) {
        this.manageLocalService.removeUserByEmail(data.Email);
        this.manageLocalService.removeUserLocationByEmail(data.Email);
        this.getUsers();
      }
    });
  }
  /**
   * Edit already exist user
   * @param data Contact value
   */
  public edit(data: Contact) {
    console.log('Edit value: ', data);
    this.router.navigateByUrl(RoutingConstants.UserEditURL("edit", data.Email));
  }
  public viewMap(data: Contact) {
    console.log('view map: ', data);
    const confDialogRef = this.dialog.open(ContactMapComponent, {//! Remove confirmation dialog
      data: data.Email
    });
  }
}
