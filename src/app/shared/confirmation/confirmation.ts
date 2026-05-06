import { Component, inject } from '@angular/core';
import { Back } from '../back/back';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MainStateService } from '../../main-services/main-state-service';
import { CourseService } from '../../main-services/course-service';
import { AuthService } from '../../main-services/auth-service';

@Component({
  selector: 'app-confirmation',
  imports: [Back, RouterLink],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.scss',
})
export class Confirmation {
  mainStateService = inject(MainStateService)
  authService = inject(AuthService);



  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.sendVerification()
  }

  sendVerification() {
    const uidb64 = String(this.route.snapshot.paramMap.get("uidb64"))
    const token = String(this.route.snapshot.paramMap.get("token"))

    if (uidb64 && token) {
      this.authService.verifyEmail(uidb64, token).subscribe({
        next: () => {
            this.mainStateService.showConfirmationText.set("Dein E-Mail wurde erfolgreich bestätigt")
            this.mainStateService.showConfirmationLink.set('login')

          },
        error: (err) => {
          console.log(err);

        }
      })
    }
  }
}
