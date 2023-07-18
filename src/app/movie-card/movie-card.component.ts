import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { MovieDescriptionComponent } from '../movie-description/movie-description.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  user: any = null;
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) { }

ngOnInit(): void {
  this.getMovies();
  this.getUser();
}

/**
 * fetches all movies from the api
 */
getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * fetches the user's info from the api
   */
  getUser(): void {
    this.fetchApiData.getOneUser().subscribe((resp: any) => {
        this.user = resp;
        console.log(this.user);
        return this.user;
      });
    }

  /**
   * opens genre info dialog
   * @param name the name of the genre
   * @param description description of the genre
   */
  openGenreInfo(name: string, description: string): void {
    console.log(name);
    this.dialog.open(GenreInfoComponent, {
      panelClass: 'my-dialog',
      data: {
        Name: name,
        Description: description,
      },
    });
  }

  /**
   * opens director info dialog
   * @param name the director's name
   * @param bio bio of the director
   * @param birth date of birth of the director
   */
  openDirectorInfo(name: string, bio: string, birth: string): void {
    console.log(name);
    this.dialog.open(DirectorInfoComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      },
    });
  }

  /**
   * opens movie description dialog
   * @param title the title of the movie
   * @param Description summary of the movie
   */
  openMovieDescription(
    title: string,
    Description: string,
  ): void {
    this.dialog.open(MovieDescriptionComponent, {
      data: {
        Title: title,
        Description: Description,
      },
    });
  }


  /**
   * adds the movie (by id) to an array of the user's favorite movies
   * @param id movie id
   */
  addFavorite(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie added to favorites.', 'OK', {
        duration: 2000
      });
      this.ngOnInit();
    });
  }

  /**
   * checks if the movie id is in the user's favorite movie array
   * @param id movie id
   * @returns true or false
   */
  isFavorite(id: string): boolean {
    return this.user?.FavoriteMovies.includes(id);
  }

  /**
   * removes the movie (by id) from the user's array of favorite movies
   * @param id movie id
   */
  removeFavorite(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie removed from favorites.', 'OK', {
        duration: 2000
      });
      this.ngOnInit();
    });
  }
}