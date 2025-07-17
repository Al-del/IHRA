import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-start-component',
  imports: [],
  templateUrl: './start-component.component.html',
  styleUrl: './start-component.component.scss'
})
export class StartComponentComponent {
constructor(private router: Router) {}
go_to_LOGIN(){
  this.router.navigate(["/login"]);
}
}
