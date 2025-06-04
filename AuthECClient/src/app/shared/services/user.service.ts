import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // private apiUrl = `${environment.apiBaseUrl}/Users`;

  constructor(private http: HttpClient) {}
  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userprofile');
  }
  // GET all users
  getAllUsers() {
    return this.http.get(environment.apiBaseUrl + '/Users/getlist');
  }
  getById(id: any) {
    return this.http.get(`${environment.apiBaseUrl}/Users/getbyId/${id}`);
  }
  // POST: Add new user
  addUser(user: any) {
    return this.http.post(environment.apiBaseUrl + '/', user);
  }
  // PUT: Update existing user
  updateUser(id: any, user: any) {
    return this.http.put(environment.apiBaseUrl + '/', user);
  }
  // DELETE: Remove user by ID
  deleteUser(id: any) {
    return this.http.delete(`${environment.apiBaseUrl}Users/deleteUser/${id}`);
  }

  // Orders Section Start

  // Get All Orders
  getOrders() {
    return this.http.get(`${environment.apiBaseUrl}/shopify/orders`);
  }
  // Save All Orders In Database
  saveOrder(input: any) {
    return this.http.post(environment.apiBaseUrl + '/ShopifyOrders/save', input);
  }
  // Get orders from local DB
   getData() {
  return this.http.get(`${environment.apiBaseUrl}/ShopifyOrders/get`);
}
  getinactive() {
  return this.http.get(`${environment.apiBaseUrl}/ShopifyOrders/getinactive`);
}
  ChangeStatus(Id: any) {
    return this.http.post(environment.apiBaseUrl + '/ShopifyOrders/inactive', Id);
  }
}
