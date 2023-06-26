import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutingConstants } from 'src/app/constants/routing-constants';
import { ManageLocalStorageService } from '../services/manage-local-storage.service';
import { Contact } from '../models/contact';
import {UserLocation} from '../models/user-location'
import { NgxSpinnerService } from 'ngx-spinner';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-user-contact',
  templateUrl: './user-contact.component.html',
  styleUrls: ['./user-contact.component.scss'],
})
export class UserContactComponent {
  @ViewChild('mapSearchField') searchField!: ElementRef;
  public userForm!: FormGroup;
  private userId!: any;
  public appMode!: string;
  public title!: string;
  public errMsgEmail!: any;
  public errMsgPhone!: any;
  private getValue!: Contact;
  private userLocation: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private manageLocalService: ManageLocalStorageService,
    private spinnerService: NgxSpinnerService
  ) {
    this.route.params.subscribe((params) => {
      this.userId = params['userId'];
      this.appMode = params['mode'];
    });
    console.log('userId: ', this.userId);
    console.log('appMode: ', this.appMode);
    if (this.appMode === 'edit') {
      //! Check mode is edit
      this.title = 'Edit';
    } else {
      //! Default title is add
      this.title = 'Add';
    }
  }
  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: [null, [Validators.required, Validators.maxLength(100)]],
      lastName: [null, [Validators.required, Validators.maxLength(100)]],
      email: [
        null,
        [Validators.required, Validators.email, Validators.maxLength(100)],
      ],
      phoneNumber: [
        null,
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
      address: [null, [Validators.required, Validators.maxLength(200)]],
      city: [null, [Validators.required, Validators.maxLength(100)]],
      state: [null, [Validators.required, Validators.maxLength(100)]],
      country: [null, [Validators.required, Validators.maxLength(100)]],
      postalCode: [null, [Validators.required, Validators.maxLength(8)]],
    });
    if (this.appMode === 'edit') {
      this.setUserValue();
    }
  }
  ngAfterViewInit() {
    const searchBox = new google.maps.places.SearchBox(
      this.searchField.nativeElement
    );
    searchBox.addListener('places_changed', () => {
      let places: any = searchBox.getPlaces();

      //verify result
      if (places.length === 0) {
        return;
      }

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach((place: any) => {
        if (!place.geometry) {
          console.log('Returned place contains no geometry');
          return;
        }
        let latitude: any;
        let longitude: any;
        let center: any;
        console.log('Lat: ', place.geometry.location.lat());
        console.log('Long: ', place.geometry.location.lng());
        latitude = place.geometry.location?.lat();
        longitude = place.geometry.location?.lng();
        center = {
          lat: latitude,
          lng: longitude,
        };
        this.userLocation = center;
      });
    });
  }
  /**
   * Set input values in edit mode
   */
  private setUserValue() {
    this.spinnerService.show();
    let getUser: Contact = this.manageLocalService.getUserByEmail(this.userId);
    console.log('get user by email: ', getUser);
    if (getUser) {
      //!User exist allowed to set value
      console.log('get user by email: ', getUser);
      this.getValue = getUser;
      this.userForm.controls['firstName'].setValue(getUser.FirstName);
      this.userForm.controls['lastName'].setValue(getUser.LastName);
      this.userForm.controls['email'].setValue(getUser.Email);
      this.userForm.controls['phoneNumber'].setValue(getUser.PhoneNumber);
      this.userForm.controls['address'].setValue(getUser.Address);
      this.userForm.controls['city'].setValue(getUser.City);
      this.userForm.controls['state'].setValue(getUser.State);
      this.userForm.controls['country'].setValue(getUser.Country);
      this.userForm.controls['postalCode'].setValue(getUser.PostalCode);
      this.spinnerService.hide();
    } else {
      //! Invalid User
      console.log('Invalid user');
      this.spinnerService.hide();
    }
  }
  /**
   * Add/Edit user details
   */
  public submit() {
    let phoneNumberToString = this.userForm.value.phoneNumber.toString();
    if(this.errMsgEmail !== '' || this.errMsgPhone !== ''){
      return
    }
    if (this.userForm.valid && this.appMode !== 'edit') {
      //!Only Create new user
      console.log('this.userForm: ', this.userForm.value);
      let user: Contact = {
        FirstName: this.userForm.value.firstName,
        LastName: this.userForm.value.lastName,
        Email: this.userForm.value.email,
        PhoneNumber: phoneNumberToString,
        Address: this.searchField.nativeElement.value,
        City: this.userForm.value.city,
        State: this.userForm.value.state,
        Country: this.userForm.value.country,
        PostalCode: this.userForm.value.postalCode,
      };
      let userLocValue: UserLocation = {
        userEmail:  this.userForm.value.email,
        lat: this.userLocation.lat,
        lng: this.userLocation.lng,
      }
      this.manageLocalService.addUser(user);
      this.manageLocalService.addUserLocation(userLocValue);
      this.router.navigateByUrl(RoutingConstants.Dashboard);
    } else {
      //!Only allowed to edit
      console.log('this.userForm: ', this.userForm.value);
      let user: Contact = {
        FirstName: this.userForm.value.firstName,
        LastName: this.userForm.value.lastName,
        Email: this.userForm.value.email,
        PhoneNumber: phoneNumberToString,
        Address: this.searchField.nativeElement.value,
        City: this.userForm.value.city,
        State: this.userForm.value.state,
        Country: this.userForm.value.country,
        PostalCode: this.userForm.value.postalCode,
      };
      let userLocValue: UserLocation = {
        userEmail:  this.userForm.value.email,
        lat: this.userLocation.lat,
        lng: this.userLocation.lng,
      }
      this.manageLocalService.updateUserByEmail(user, this.userId);
      if(this.userLocation){
        this.manageLocalService.updateUserLocationByEmail(userLocValue, this.userId);
      }
      this.router.navigateByUrl(RoutingConstants.Dashboard);
    }
  }
  /**
   * Cancel add or edit user details screen
   * Redirect to user dashboard
   */
  public cancel() {
    this.router.navigateByUrl(RoutingConstants.Dashboard);
  }
  /**
   * Input allowed number only
   * @param event
   * @returns
   */
  public allowedNumberOnly(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (
      (charCode > 31 && (charCode < 48 || charCode > 57)) ||
      charCode == 190
    ) {
      return false;
    }
    return true;
  }
  /**
   * Check email already exist
   * @param email Email id
   */
  public getUserByEmail(event: any) {
    console.log('event value:', event.target.value);
    let getUser = this.manageLocalService.getUserByEmail(event.target.value);
    console.log('get user: ', getUser);
    if (getUser) {
      this.errMsgEmail = 'Email id already exist!';
    }
  }
  /**
   * Get user by phone number
   * @param event
   */
  public getUserByPhoneNumber(event: any) {
    console.log('event value:', event.target.value);
    if (this.appMode === 'edit') {
      if (event.target.value.toString() !== this.getValue.PhoneNumber) {
        this.checkPhoneNumber(event.target.value);
      }
    } else {
      this.checkPhoneNumber(event.target.value);
    }
  }
  /**
   * Check number is already exist
   */
  private checkPhoneNumber(phoneNumber: any) {
    let getUser = this.manageLocalService.getUserByPhoneNumber(
      phoneNumber.toString()
    );
    console.log('get user: ', getUser);
    if (getUser) {
      this.errMsgPhone = 'Phone number already exist!';
    }
  }
  public clearText() {
    this.errMsgPhone = '';
  }
  public clearEmailText(){
    this.errMsgEmail = '';
  }
}
