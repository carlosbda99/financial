import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'fin-authorized-layout',
  templateUrl: './authorized-layout.component.html',
  styleUrls: ['./authorized-layout.component.scss'],
})
export class AuthorizedLayoutComponent {
  constructor(private authService: AuthService, private router: Router) {
    authService.onRevoke.subscribe({
      next: () => this.router.navigateByUrl(''),
    });
  }

  sair(): void {
    this.authService.revoke();
  }
}
