import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
@Component({
  selector: 'app-start-component',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './start-component.component.html',
  styleUrl: './start-component.component.scss'
})
export class StartComponentComponent {
constructor(private router: Router) {}
go_to_LOGIN(){
  this.router.navigate(["/login"]);
}
}
