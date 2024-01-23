import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Developer} from "../models";

@Injectable({
  providedIn: 'root',
})
export class ApiService {


  constructor(private httpClient: HttpClient) { }

  getDevelopers() {
    return this.httpClient.get<Developer[]>('http://127.0.0.1:8000/api/orders/v2');
  }
}
