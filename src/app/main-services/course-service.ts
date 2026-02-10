import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { COURSE } from '../models/course.model';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getCourses():Observable<COURSE[]>{
    return this.http.get<COURSE[]>(`${this.baseUrl}courses/`, {
      withCredentials: true
    })
  }
  
}
