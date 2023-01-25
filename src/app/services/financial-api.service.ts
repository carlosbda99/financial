import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export abstract class FinancialApiService extends ApiService {

  constructor(path: string, http: HttpClient) { 
    super(
      path
        ? `${environment.api.endpointBase}${path.startsWith('/') ? path : `/${path}`}`
        : environment.api.endpointBase,
      http
    );
  }
}
