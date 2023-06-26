import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ContactMapComponent>) {
      console.log('data: ', data);
    }
  ngOnInit(): void {
    let latVal: any = localStorage.getItem('userLocation');
    if(latVal){
      latVal = JSON.parse(latVal);
      console.log('lat lng value', latVal);
      for(let i = 0; i <latVal.length; i++) {//! User location list using for loop
        if(latVal[i].userEmail === this.data) {//! Get user
          let val = {
            position: { lat: latVal[i].lat, lng: latVal[i].lng },
          };
          this.center = {
            lat: latVal[i].lat,
            lng: latVal[i].lng,
          };
          this.markers.push(val);
        }
      }
    }
  }
}
