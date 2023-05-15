import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiClass } from 'src/app/core/base-api';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService extends BaseApiClass {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = 'ubicaciones';
  }
}
