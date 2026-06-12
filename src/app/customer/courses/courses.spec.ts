import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Courses } from './courses';
import { Router } from '@angular/router';
import { AuthService } from '../../main-services/auth-service';
import { ToastService } from '../../main-services/toast-service';
import { of } from 'rxjs';
import { CourseService } from '../../main-services/course-service';
import { COURSE, STATUS } from '../../models/course.model';

describe('Courses', () => {
    let component: Courses;
    let fixture: ComponentFixture<Courses>;

    let authServiceSpy: jasmine.SpyObj<AuthService>
    let toastServiceSpy: jasmine.SpyObj<ToastService>
    let courseServiceSpy: jasmine.SpyObj<CourseService>

    let router: Router

    beforeEach(async () => {
        courseServiceSpy = jasmine.createSpyObj(
            'CourseService',
            ['getCourses']
        );

        courseServiceSpy.getCourses.and.returnValue(of([]));

        authServiceSpy = jasmine.createSpyObj(
            'AuthService',
            ['checkAuth']
        );

        toastServiceSpy = jasmine.createSpyObj('ToastService', ['displayToast']);

        await TestBed.configureTestingModule({
            imports: [Courses],
            providers: [
                {
                    provide: AuthService,
                    useValue: authServiceSpy
                },
                {
                    provide: CourseService,
                    useValue: courseServiceSpy
                },
                {
                    provide: ToastService,
                    useValue: toastServiceSpy
                }
            ]
        })
            .compileComponents();

        router = TestBed.inject(Router);
        spyOn(router, 'navigate');

        fixture = TestBed.createComponent(Courses);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create component courses', () => {
        const mockCourses: COURSE[] = [
            {
                id: 1,
                name: 'Angular Masterclass',
                description: 'Learn Angular from beginner to advanced level.',
                price: '199.99',
                image: 'https://example.com/images/angular-course.jpg',
                order: '1',
                badge: 'Bestseller',
                status: STATUS.PUBLISHED,
                features: []
            }
        ];

        courseServiceSpy.getCourses.and.returnValue(of(mockCourses));

        fixture = TestBed.createComponent(Courses);
        component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component.courses()).toEqual(mockCourses);
    });

    it('should navigate to payment page when user is logged in', () => {
        authServiceSpy.checkAuth.and.returnValue(of(true))

        component.buyCourse(123);
        expect(router.navigate).toHaveBeenCalledWith([
            'customer/courses/payment', 123
        ])

    })

    it('should navigate to information page when user is not logged in', () => {
        authServiceSpy.checkAuth.and.returnValue(of(false))

        component.buyCourse(123);
        expect(router.navigate).toHaveBeenCalledWith([
            'kurse/information'
        ])

    })
});
