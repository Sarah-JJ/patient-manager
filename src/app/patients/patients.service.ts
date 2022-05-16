import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {Patient} from "./models/patient";
import {environment} from "../../environments/environment";
import {AuthorizationService} from "../api-authorization/authorization.service";
import {Patients} from "./models/patients";

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(private http: HttpClient,
              private authService: AuthorizationService) {
  }

  getPatients(): Observable<Array<Patient>> {

    // TODO: create an HTTP interceptor to add authorization header
    const headers = new HttpHeaders({
      'Authorization': this.authService.getAccessToken()?.token_type + ' ' + this.authService.getAccessToken()?.access_token
    });

    return this.http.get<Patients>(environment.apiUrlScheme + environment.apiUrlHost, {
      headers: headers
    })
      .pipe(map(value => {

        const entries = value.entry;
        const patients = entries.map(el => el.resource);

        return patients;
      }));
  }
}
