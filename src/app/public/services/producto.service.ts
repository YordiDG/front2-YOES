import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/base.service";
import {Casas} from "../models/casas";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends BaseService<Casas>{

  constructor(http:HttpClient) {
    super(http);
    this.resourceEndpoint = '/all-product';
  }

  /**********************************************************/

  public cartUpdated$: Subject<boolean> = new Subject();

  getCategory(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/minimarket/categorias/all-category');
  }

  createCategory(obj: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/minimarket/categorias/new-category', obj);
  }

  getProductsByCategory(catregory: string): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/v1/product/all-product');
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/v1/product/all-product');
  }

  getProductById(productId: number): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/v1/product/{id}');
  }



  updateProduct(obj: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/v1/product/{id}/update', obj);
  }

  deleteProduct(id: any): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/v1/product/{id}/delete');
  }

  /*  addToCart(obj: any): Observable<any> {
    return this.http.post<any>(Constant.API_END_POINT + Constant.METHODS.ADD_TO_CART, obj);
  }

  getCartDataByCustId(custId: number): Observable<any[]> {
    return this.http.get<any[]>(Constant.API_END_POINT + Constant.METHODS.GET_CART_BY_CUST + custId);
  }

  removeProductByCartId(cartId: number): Observable<any[]> {
    return this.http.get<any[]>(Constant.API_END_POINT + Constant.METHODS.REMOVE_CART + cartId);
  }

  placeOrder(obj: any): Observable<any> {
    return this.http.post<any>(Constant.API_END_POINT + Constant.METHODS.PLACE_ORDER, obj);
  }

  getAllOffers(): Observable<any[]> {
    return this.http.get<any[]>(Constant.API_END_POINT + Constant.METHODS.GET_ALL_OFFERS).pipe(map((res: any) => res.data));
  }

  createNewOffer(obj: any): Observable<any> {
    return this.http.post<any>(Constant.API_END_POINT + Constant.METHODS.CREATE_NEW_OFFER, obj)
  }

  getCustomerById(custId: number): Observable<any[]> {
    return this.http.get<any[]>(Constant.API_END_POINT + Constant.METHODS.GET_CUSTOMER_BY_ID + custId);
  }

  updateProfile(obj: any): Observable<any> {
    return this.http.put<any>(Constant.API_END_POINT + Constant.METHODS.UPDATE_PROFILE, obj);
  }

  getAllSalesByCustomerId(custId: number): Observable<any[]> {
    return this.http.get<any[]>(Constant.API_END_POINT + Constant.METHODS.GET_ALL_SALE_BY_CUSTOMER_ID + custId);
  }

  cancelOrder(saleId: number): Observable<any[]> {
    return this.http.get<any[]>(Constant.API_END_POINT + Constant.METHODS.CANCEL_ORDER_BY_SALE_ID + saleId);
  }

  openSaleBySaleId(saleId: number): Observable<any[]> {
    return this.http.get<any[]>(Constant.API_END_POINT + Constant.METHODS.OPEN_SALE_BY_SALE_ID + saleId);
  }*/
}
