import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class SupabaseConfigService {
  private readonly _API_KEY = environment.supabaseKey;
  private readonly _headers = new HttpHeaders({
    apikey: this._API_KEY,
    Authorization: `Bearer ${this._API_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  });

  headers(): HttpHeaders {
    return this._headers;
  }
}
