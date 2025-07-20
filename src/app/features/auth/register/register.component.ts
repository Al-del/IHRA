import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../../../shared/auth-service.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../../shared/header/header.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterModule, HeaderComponent, FooterComponent],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  errorMessage = '';
  constructor(private auth_service : AuthServiceService,
    private router : Router
  ) {}
  register() {
    this.auth_service.register(this.name, this.email, this.password)
      .subscribe({
        next: () => this.router.navigate(['/login']),  // or wherever
        error: (err) => this.errorMessage = err.message
      });
  }
}
