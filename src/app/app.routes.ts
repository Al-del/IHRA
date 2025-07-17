import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { StartComponentComponent } from './features/start-component/start-component.component';
export const routes: Routes = [
    {path : "", component : StartComponentComponent},
    {path : "login", component :LoginComponent},
    {path : "register", component : RegisterComponent}
];
