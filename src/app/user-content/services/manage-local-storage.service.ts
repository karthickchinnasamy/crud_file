import { Injectable } from '@angular/core';
import { UserLocation } from '../models/user-location';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ManageLocalStorageService {
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
        getUserDetails[i].PostalCode = userData.PostalCode,
        getUserDetails[i].Lat = userData.Lat,
        getUserDetails[i].Lng = userData.Lng
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
