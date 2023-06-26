import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutingConstants } from '../constants/routing-constants';
import { ManageLocalStorageService } from '../user-content/services/manage-local-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public errMsg: any;
  public form: any = FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private manageLocalService: ManageLocalStorageService,
    private spinnerService: NgxSpinnerService
   ) {
      this.form = this.formBuilder.group({
        username: [null, [Validators.required]],
        password: [null, [Validators.required, Validators.minLength(6)]]
    });
    this.manageLocalService.setUsers();
    }
  submit(){
    this.spinnerService.show();
    console.log('Form value: ', this.form.value);
    if(this.form.value.username === 'admin' && this.form.value.password === '123456'){
      this.router.navigateByUrl(RoutingConstants.Dashboard);
      this.spinnerService.hide();
    } else {
      console.log('invalid user');
      this.errMsg = 'Invalid username/password!';
      this.spinnerService.hide();
    }
  }
  onKey(event: any) { // without type info
    console.log('event.target.value: ', event.target.value);
    this.errMsg = '';
  }
}
