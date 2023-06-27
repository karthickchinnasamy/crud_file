import { Injectable } from '@angular/core';
import { UserLocation } from '../models/user-location';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ManageLocalStorageService {
  // private tableData: Contact[] = [
  //   { FirstName: 'John Doe', LastName: 'Bravo', Email: 'john@example.com',PhoneNumber:'9898978710',Address:'Citny Canada',City:'Citny',State:'Citny',Country:'Canada',PostalCode:'641012' },
  //   { FirstName: 'Jane Smith', LastName: 'Leo', Email: 'jane@example.com',PhoneNumber:'9898978711',Address:'California USA',City:'California',State:'California',Country:'USA',PostalCode:'641089' },
  //   { FirstName: 'Bob Johnson', LastName:'Slima', Email: 'bob@example.com',PhoneNumber:'9898978712',Address:'Mumbai INDIA',City:'Mumbai',State:'Maharastra',Country:'INDIA',PostalCode:'641789' },
  //   { FirstName: 'Bob Slim ', LastName:'Waker', Email: 'waker@example.com', PhoneNumber:'9898978713',Address:'Erode INDIA',City:'Erode',State:'Tamilnadu',Country:'INDIA',PostalCode:'641654' },
  //   { FirstName: 'Johnson', LastName: 'Laberd', Email: 'laberd@example.com',PhoneNumber:'9898978714',Address:'Coimbatore INDIA',City:'Coimbatore',State:'Tamilnadu',Country:'INDIA',PostalCode:'641542' },
  //   { FirstName: 'Ridchardson', LastName: 'Son', Email: 'son@example.com',PhoneNumber:'9898978715',Address:'Chennai India',City:'Chennai',State:'Tamilnadu',Country:'INDIA',PostalCode:'641000' },
  //   { FirstName: 'Bold', LastName:'Kavin', Email: 'kavin@example.com',PhoneNumber:'9898978716',Address:'Madurai INDIA',City:'Madurai',State:'Tamilnadu',Country:'INDIA',PostalCode:'641098' },
  //   { FirstName: 'Lee', LastName:'Raj', Email: 'lee@example.com',PhoneNumber:'9898978717',Address:'Goa India',City:'Goa',State:'Goa',Country:'INDIA',PostalCode:'641010' },
  //   { FirstName: 'Shyam', LastName: 'Mask', Email: 'mask@example.com',PhoneNumber:'9898978718',Address:'Cochin Kerala India',City:'Cochin',State:'Kerala',Country:'INDIA',PostalCode:'641112' },
  //   // Add more data here...
  // ];
  private tableData: Contact[] = [];
  constructor() { }
  /**
   * Set user details in local storage
   */
  public setUsers() {
    localStorage.setItem('userList',JSON.stringify(this.tableData));
  }
  /**
   * Add new user in user list
   * @param userData Contact values
   * @returns users list
   */
  public addUser(userData: Contact) {
    let getUserDetails: any = localStorage.getItem('userList');
    if(getUserDetails){
      getUserDetails = JSON.parse(getUserDetails);
      getUserDetails.push(userData);
      localStorage.setItem('userList',JSON.stringify(getUserDetails));
      return getUserDetails;
    } else {
      let newArray: any = [];
      newArray.push(userData);
      localStorage.setItem('userList',JSON.stringify(newArray));
      return newArray;
    }
  }
  /**
   * Get all users
   * @returns all users
   */
  public getUsers() {
    let getUserDetails: any = localStorage.getItem('userList');
    getUserDetails = JSON.parse(getUserDetails);
    return getUserDetails;
  }
  /**
   * Update already exist user by email id
   * @param userData Contact values
   * @param updateEmail user email
   */
  public updateUserByEmail(userData: Contact, updateEmail: string) {
    let getUserDetails: any = localStorage.getItem('userList');
    getUserDetails = JSON.parse(getUserDetails);
    for(let i = 0; i <getUserDetails.length; i++) {//! user list using for loop
      if(getUserDetails[i].Email === updateEmail) {//! Get user
        getUserDetails[i].FirstName = userData.FirstName,
        getUserDetails[i].LastName = userData.LastName,
        getUserDetails[i].Email = userData.Email,
        getUserDetails[i].PhoneNumber = userData.PhoneNumber,
        getUserDetails[i].Address = userData.Address,
        getUserDetails[i].City = userData.City,
        getUserDetails[i].State = userData.State,
        getUserDetails[i].Country = userData.Country,
        getUserDetails[i].PostalCode = userData.PostalCode
        // Set user details
      localStorage.setItem('userList', JSON.stringify(getUserDetails));
      }
   }

  }
  /**
   * Remover user by email
   */
  public removeUserByEmail(userEmail: string) {
    let getUserDetails: any = localStorage.getItem('userList');
    getUserDetails = JSON.parse(getUserDetails);
    for(let i = 0; i <getUserDetails.length; i++) {
      if(getUserDetails[i].Email == userEmail) {
        getUserDetails.splice(i, 1);//! Remove user
      }
   }
      // Set user details
      localStorage.setItem('userList', JSON.stringify(getUserDetails));
  }
  /**
   * Get user by email
   * @param userEmail  email id
   * @returns user Contact values
   */
  public getUserByEmail(userEmail: string) {
    let getUserDetails: any = localStorage.getItem('userList');
    if(getUserDetails){
      getUserDetails = JSON.parse(getUserDetails);
      let getUser: any = getUserDetails.find((x:Contact) => x.Email === userEmail);
      console.log('Get user: ', getUser);
      return getUser;
    }
  }
  /**
   * Get user by phone number
   * @param phoneNumber
   * @returns user contact list
   */
  public getUserByPhoneNumber(phoneNumber: string) {
    let getUserDetails: any = localStorage.getItem('userList');
    if(getUserDetails){
      getUserDetails = JSON.parse(getUserDetails);
      let getUser: any = getUserDetails.find((x:Contact) => x.PhoneNumber === phoneNumber);
      console.log('Get user: ', getUser);
      return getUser;
    }
  }
  /**
   * Remove all local storage values
   * Logout
   */
  public removeAllLocalStorage(){
    localStorage.removeItem('userList');
  }
}
