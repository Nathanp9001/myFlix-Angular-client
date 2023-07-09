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

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getUser(): void {
    this.fetchApiData.getOneUser().subscribe((resp: any) => {
        this.user = resp;
        console.log(this.user);
        return this.user;
      });
    }

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


  addFavorite(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie added to favorites.', 'OK', {
        duration: 2000
      });
      this.ngOnInit();
    });
  }


  isFavorite(id: string): boolean {
    // return this.fetchApiData.isFavoriteMovie(id);

    return this.user?.FavoriteMovies.includes(id);

    // return false;
  }


  removeFavorite(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie removed from favorites.', 'OK', {
        duration: 2000
      });
      this.ngOnInit();
    });
  }
}