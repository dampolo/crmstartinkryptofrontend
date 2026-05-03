import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogCustomer } from './dialog-customer';


describe('Profile', () => {
  let component: DialogCustomer;
  let fixture: ComponentFixture<DialogCustomer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCustomer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCustomer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
