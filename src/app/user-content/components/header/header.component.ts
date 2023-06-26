import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingConstants } from 'src/app/constants/routing-constants';
import { ManageLocalStorageService } from '../../services/manage-local-storage.service';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isNavbarOpen = true;
  constructor(
    private router: Router,
    private manageLocalService: ManageLocalStorageService,
    private dialog: MatDialog,
  ) {
  }
  /**
   * Nav toggle open close method
   */
  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  /**
   * Logout and  remove local storage
   */
  public logout() {
    const confDialogRef = this.dialog.open(ConfirmDialogComponent, {//! Logout confirmation dialog
      data: {
        message: 'Are you sure want to logout?',
        buttonText: {
          ok: 'Yes, Logout it',
          cancel: 'No, Keep it'
        }
      }
    });
    confDialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed === true) {
        this.manageLocalService.removeAllLocalStorage();
        this.router.navigateByUrl(RoutingConstants.Login);
      }
    });
  }
}
