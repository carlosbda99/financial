import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'fin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = formBuilder.group({
      login: [{ value: undefined, disabled: false }, Validators.required],
      pass: [{ value: undefined, disabled: false }, Validators.required],
    });
  }

  login(): void {
    const { login, pass } = this.form.getRawValue() as {
      login: string;
      pass: string;
    };

    this.authService.auth(login, pass).subscribe({
      next: async () => {
        await this.router.navigateByUrl(decodeURI('/'));
      },
      error: (e) => console.log('Error:', e.message),
    });
  }
}
