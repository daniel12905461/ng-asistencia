import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BaseApiClass } from 'src/app/core/base-api';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService extends BaseApiClass {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = 'funcionarios';
  }

  getDiasTrabajados(id: string){
    return this.httpClient.get(`${this.baseUrl}/dias-trabajados/${id}`).pipe(
      map((body: any) => {
        return body;
      })
    );
  }
}
