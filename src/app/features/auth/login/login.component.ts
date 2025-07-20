import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthServiceService } from '../../../shared/auth-service.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/header/header.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private authService: AuthServiceService
  ) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        // Login successful
        this.router.navigate(['/home']); // or your app's main page
      },
      error: (error) => {
        // Handle login error
        this.errorMessage = 'Login failed. Please check your email and password.';
        console.error(error);
      }
    });
  }

  go_to_register() {
    this.router.navigate(['/register']);
  }
}
