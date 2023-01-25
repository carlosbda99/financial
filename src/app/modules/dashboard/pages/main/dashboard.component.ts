import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'fin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    authService.onRevoke
      .subscribe(
        {
          next: () => this.router.navigateByUrl('')
        }
      )
  }

  sair(): void {
    this.authService.revoke();
  }

}
