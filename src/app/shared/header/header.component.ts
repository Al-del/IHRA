import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private router : Router) {}
  go_to_show(){
    this.router.navigate(["/show_food"])
  }
go_to_LOGIN(){
  this.router.navigate(["/login"]);
}
go_to_Register(){
  this.router.navigate(["/register"]);
}
}
