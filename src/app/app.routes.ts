import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { StartComponentComponent } from './features/start-component/start-component.component';
import { HomeComponent } from './features/home/home.component';
import { ShowRecepiesComponent } from './features/show-recepies/show-recepies.component';
import { ShowFoodComponent } from './features/show-food/show-food.component';
export const routes: Routes = [
    {path : "", component : StartComponentComponent},
    {path : "login", component :LoginComponent},
    {path : "register", component : RegisterComponent},
    {path : "home", component : HomeComponent},
    {path : "recepie", component :ShowRecepiesComponent },
    {path : "show_food", component : ShowFoodComponent}
];
