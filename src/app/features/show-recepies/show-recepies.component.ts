import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth';
import { Observable, take } from 'rxjs';

interface Recipe {
  id: number;
  title: string;
  image: string;
  missedIngredientCount?: number;
  ingredients?: string[];
  instructions?: string[];
  savedAt?: Date;
}

@Component({
  standalone: true,
  selector: 'app-show-recepies',
  templateUrl: './show-recepies.component.html',
  styleUrls: ['./show-recepies.component.scss'],
  imports: [CommonModule, RouterModule]
})
export class ShowRecepiesComponent {
  private firestore: Firestore = inject(Firestore);
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  
  recipes: Recipe[] = [];

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const navState = nav?.extras?.state?.['imageData'];
    const state = navState || history.state?.imageData;

    if (state?.recipes) {
      this.recipes = state.recipes;
      console.log('Loaded recipes:', this.recipes);
    } else {
      console.warn('No recipes found in state.');
    }
  }

  async addToMyList(recipe: Recipe) {
    this.user$.pipe(take(1)).subscribe(async (user) => {
      if (user) {
        try {
          // Add the recipe to Firestore
          const recipeWithTimestamp = {
            ...recipe,
            savedAt: new Date(),
            userId: user.uid
          };
          
          const recipesCollection = collection(this.firestore, 'savedRecipes');
          await addDoc(recipesCollection, recipeWithTimestamp);
          
          console.log('Recipe saved to Firestore:', recipe.title);
        } catch (error) {
          console.error('Error saving recipe:', error);
        }
      } else {
        console.warn('User not authenticated. Recipe not saved.');
        // Optionally: redirect to login or show a message
      }
    });
  }

  handleImageError(recipe: Recipe) {
    console.error('Failed to load image:', recipe.image);
    recipe.image = 'https://via.placeholder.com/312x231?text=Recipe+Image+Not+Available';
  }
}