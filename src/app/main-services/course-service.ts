import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { COURSE, DISCOUNT_CODE, LESSON, PURCHASE, PURCHASED_COURSE, UPDATE_COURSE_FEATURE } from '../models/course.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';

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

    // Creat new course
    postCourse(payload: any): Observable<COURSE[]> {
        return this.http.post<COURSE[]>(`${this.baseUrl}courses/`,
            payload,
            { withCredentials: true }
        )
    }

    getCourse(courseId: number): Observable<COURSE> {
        return this.http.get<COURSE>(`${this.baseUrl}courses/${courseId}`, {
            withCredentials: true
        })
    }

    updateCourse(courseId: number, payload: any): Observable<COURSE> {
        return this.http.patch<COURSE>(`
            ${this.baseUrl}courses/${courseId}/`,
            payload,
            { withCredentials: true }
        )
    }

    getUserCourses(): Observable<PURCHASE[]> {
        return this.http.get<PURCHASE[]>(`${this.baseUrl}purchases/`, {
            withCredentials: true
        })
    }

    buyCourse(payload: any): Observable<any> {
        return this.http.post(`${this.baseUrl}purchases/`, payload,
            { withCredentials: true })
    }

    // add new feature to Course/Theme
    postFeature(payload: any): Observable<any> {
        return this.http.post(`${this.baseUrl}courses-features/`, payload,
            { withCredentials: true })
    }

    deleteFeature(featureId: any): Observable<any> {
        return this.http.delete(`${this.baseUrl}courses-features/${featureId}/`,
            { withCredentials: true })
    }

    patchFeature(payload: UPDATE_COURSE_FEATURE, featureId: number): Observable<any> {
        return this.http.patch(
            `${this.baseUrl}courses-features/${featureId}/`, payload,
            { withCredentials: true }
        );
    }


    getLessons(courseId: number): Observable<LESSON[]> {
        return this.http.get<LESSON[]>(
            `${this.baseUrl}lessons/?course=${courseId}`,
            { withCredentials: true }
        );
    }

    postLesson(courseId: number, payload: any): Observable<LESSON[]> {
        return this.http.post<LESSON[]>(
            `${this.baseUrl}lessons/`,
            payload,
            { withCredentials: true }
        );
    }

    // Only for CRM
    getLessonsCrm(courseId: number): Observable<LESSON[]> {
        return this.http.get<LESSON[]>(
            `${this.baseUrl}crm-lessons/?course=${courseId}`,
            { withCredentials: true }
        );
    }

    // Only for CRM
    getSingleLessonsCrm(lessonId: number): Observable<LESSON> {
        return this.http.get<LESSON>(
            `${this.baseUrl}crm-lessons/${lessonId}/`,
            { withCredentials: true }
        );
    }

    // PATH only for CRM 
    patchSingleLessons(lessonId: number, payload: any): Observable<LESSON> {
        return this.http.patch<LESSON>(
            `${this.baseUrl}crm-lessons/${lessonId}/`,
            payload,
            { withCredentials: true }
        );
    }

    postSinglePdf(lessonId: number, file: File, title: string): Observable<any> {
        const formData = new FormData();

        formData.append('file', file);
        formData.append('lesson', lessonId.toString());
        formData.append('title', title);

        return this.http.post(
            `${this.baseUrl}crm-lesson-pdfs/`,
            formData,
            { withCredentials: true }
        );
    }

    DiscountCode(code: string): Observable<DISCOUNT_CODE> {
        return this.http.post<DISCOUNT_CODE>(
            `${this.baseUrl}discount-codes/validate_code/`,
            { code: code },
            { withCredentials: true }
        );
    }
}
