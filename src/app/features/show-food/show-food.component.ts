import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth';
import { Observable, switchMap, of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
interface Recipe {
  id: number;
  title: string;
  image: string;
  ingredients?: string[];
  firestoreId?: string;
  userId?: string;
  savedAt?: Date;
  generatedRecipe?: string;
  calories?: number | string;
}

interface WorkoutForm {
  age: number | null;
  gender: string;
  height: number | null;
  weight: number | null;
  heartRate: number | null;
  bodyTemp: number | null;
}

@Component({
  selector: 'app-show-food',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, HeaderComponent,  FooterComponent],
  templateUrl: './show-food.component.html',
  styleUrls: ['./show-food.component.scss']
})
export class ShowFoodComponent {
  workoutResultMessage: string = "";
  private firestore: Firestore = inject(Firestore);
  private auth: Auth = inject(Auth);
  private http = inject(HttpClient);
  private router = inject(Router);

  selectedRecipe: Recipe | null = null;
  workoutForm: WorkoutForm = {
    age: null,
    gender: '',
    height: null,
    weight: null,
    heartRate: null,
    bodyTemp: null
  };

  user$ = user(this.auth);
  savedRecipes$: Observable<Recipe[]> = this.user$.pipe(
    switchMap(user => {
      if (user) {
        const recipesCollection = collection(this.firestore, 'savedRecipes');
        const userRecipesQuery = query(recipesCollection, where('userId', '==', user.uid));
        return collectionData(userRecipesQuery, { idField: 'firestoreId' }) as Observable<Recipe[]>;
      }
      return of([]);
    })
  );

  handleImageError(recipe: Recipe) {
    recipe.image = 'https://via.placeholder.com/312x231?text=Recipe+Image+Not+Available';
  }

  viewDetails(recipe: Recipe) {
    if (!recipe.ingredients || !recipe.title) return;

    const payload = {
      title: recipe.title,
      ingredients: recipe.ingredients
    };

    this.http.post<{ status: string; generated_recipe: string }>('https://depot-sphere-netherlands-involving.trycloudflare.com/recipe', payload)
      .subscribe({
        next: (response) => {
          recipe.generatedRecipe = response.generated_recipe;
        },
        error: (err) => {
          console.error('Failed to fetch recipe details:', err);
          recipe.generatedRecipe = 'Failed to generate recipe.';
        }
      });
  }

  getCaloriesNumber(calories: string | number | undefined): number {
    if (calories === undefined) return 0;
    if (typeof calories === 'number') return calories;
    const numericValue = parseFloat(calories.toString().replace(/[^\d.]/g, ''));
    return isNaN(numericValue) ? 0 : numericValue;
  }

  openWorkoutModal(recipe: Recipe) {
    this.selectedRecipe = recipe;
    if (this.selectedRecipe) {
      this.selectedRecipe.calories = this.getCaloriesNumber(this.selectedRecipe.calories);
    }
  }

  closeWorkoutModal() {
    this.selectedRecipe = null;
    this.workoutResultMessage = ""; // clear message on close
    this.workoutForm = {
      age: null,
      gender: '',
      height: null,
      weight: null,
      heartRate: null,
      bodyTemp: null
    };
  }

  calculateWorkout() {
    if (!this.selectedRecipe) return;
  
    const calories = this.getCaloriesNumber(this.selectedRecipe.calories);
  
    const payload = {
      ...this.workoutForm,
      calories,
      recipeTitle: this.selectedRecipe.title
    };
  
    console.log('[DEBUG] Sending workout payload:', payload);
  
    this.http.post<{ status: string; message?: string }>(
      'https://depot-sphere-netherlands-involving.trycloudflare.com/workout',
      payload
    ).subscribe({
      next: (response) => {
        console.log('[INFO] Workout data submitted successfully:', response.message);
        this.workoutResultMessage = response.message ?? 'Workout calculation complete.';
      },
      error: (error) => {
        console.error('[ERROR] Failed to submit workout data:', error);
        this.workoutResultMessage = 'Failed to submit workout data.';
      }
    });
  }
  
  
}