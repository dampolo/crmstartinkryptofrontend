import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Profile } from './profile';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { UserService } from '../../customer/services/user-service';
import { MainStateService } from '../../main-services/main-state-service';
import { of } from 'rxjs';

describe('CustomerProfile', () => {
  let component: Profile;
  let fixture: ComponentFixture<Profile>;

  const userServiceMock = {
    getCustomer: jasmine.createSpy().and.returnValue(of(null)),
    updateCustomer: jasmine.createSpy()
  };

  const mainStateServiceMock = {
    displayToast: jasmine.createSpy()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Profile],
      providers: [
        provideRouter([]),

        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        },

        {
          provide: UserService,
          useValue: userServiceMock
        },

        {
          provide: MainStateService,
          useValue: mainStateServiceMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Profile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});