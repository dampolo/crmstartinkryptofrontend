import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { COURSE, LESSON, PURCHASE, PURCHASED_COURSE } from '../models/course.model';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private baseUrl = environment.apiBaseUrl;
 
  constructor(private http: HttpClient) { }

  getCourses(): Observable<COURSE[]> {
    return this.http.get<COURSE[]>(`${this.baseUrl}courses/`, {
      withCredentials: true
    })
  }

  getUserCourses(): Observable<PURCHASE[]> {
    return this.http.get<PURCHASE[]>(`${this.baseUrl}purchases/`, {
      withCredentials: true
    })
  }

  getLessons(courseId: number): Observable<LESSON[]> {
    return this.http.get<LESSON[]>(
      `${this.baseUrl}lessons/?course=${courseId}`,
      { withCredentials: true }
    );
  }
}
