import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ManageLocalStorageService } from '../services/manage-local-storage.service';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-contact-map',
  templateUrl: './contact-map.component.html',
  styleUrls: ['./contact-map.component.scss'],
})
export class ContactMapComponent {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  zoom = 12;
  center!: any;
  latitude!: any;
  longitude!: any;
  map!: google.maps.Map;
  markers: any = [];
  constructor(
    private manageLocalService: ManageLocalStorageService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ContactMapComponent>) {
      console.log('data: ', data);
    }
    /**
     * On page load get user location and map pins
     */
  ngOnInit(): void {
     let getUser: Contact = this.manageLocalService.getUserByEmail(this.data);
     console.log('getUser: ', getUser);
     this.center = {
      lat: getUser.Lat,
      lng: getUser.Lng,
    };
    let val = {
      position: { lat: getUser.Lat, lng: getUser.Lng },
    };
    this.markers.push(val);
  }
}
