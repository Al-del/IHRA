import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  standalone : true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email:string = '';
  password : string = '';
  constructor(private router : Router) { }
  show_idk(){
    alert(this.email);
  }
  go_to_register(){
    this.router.navigate(['/register']);
  }
}
