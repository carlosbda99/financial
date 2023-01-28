import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/domain/user';

@Component({
  selector: 'fin-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = formBuilder.group({
      name: [{ value: undefined, disabled: false }, Validators.required],
      email: [{ value: undefined, disabled: false }, Validators.required],
    });
  }

  salvar(): void {
    const { name, email } = this.form.getRawValue();

    const user: User = {
      login: name,
      profiles: [0],
      name,
      email,
    };

    this.authService.newUser(user).subscribe({
      next: () => this.router.navigateByUrl('/auth'),
    });
  }
}
