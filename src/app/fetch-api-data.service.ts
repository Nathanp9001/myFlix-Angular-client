import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';

/** 
*Declaring the api url that will provide data for the client app
*/
const apiUrl = 'https://myflixdb9001.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  /** 
  * Inject the HttpClient module to the constructor params
  * This will provide HttpClient to the entire class, making it available via this.http
  */
  constructor(private http: HttpClient) {}

 /**
  * Making the api call for the user registration endpoint
  * @param userDetails object with the details of the user
  * @returns an observable with the created user
  */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  /**
   * checks if the username and password are correct and gives user a token
   * @param userDetails object with the user's username and password
   * @returns token and user info
   */
public userLogin(userDetails: any): Observable<any> {
  console.log(userDetails);
  return this.http.post(apiUrl + 'login', userDetails).pipe(
    catchError(this.handleError)
  );
}

/**
 * fetches all movies from the api
 * @returns array of all movies
 */
getAllMovies(): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies', {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/**
 * fetches the info for one movie from the api
 * @param title title of the movie 
 * @returns movie info
 */
getOneMovie(title: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies/' + title, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/**
 * fetches the info for one director from the api
 * @param directorName name of the director
 * @returns the director's info
 */
getOneDirector(directorName: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies/director/' + directorName, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/**
 * fetches the info for one genre from the api 
 * @param genreName name of the genre
 * @returns the genre's info
 */
getOneGenre(genreName: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies/genre/' + genreName, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/**
 * fetches the info for one user from the api
 * @returns user info
 */
getOneUser(): Observable<any> {
  const username = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'users/' + username, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/**
 * fetches the user's favorite movie array 
 * @returns user's array of favorite movies by id
 */
getFavoriteMovies(): Observable<any> {
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'users/' + username, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    map((data) => data.FavoriteMovies),
    catchError(this.handleError)
  );
}

/**
 * adds a movie to a user's favorite movie array by movie id
 * @param movieId the movie id
 * @returns user object
 */
addFavoriteMovie(movieId: string): Observable<any> {
  const username = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  return this.http.post(apiUrl + 'users/' + username + '/movies/' + movieId, {}, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/**
 * updates the info for a user by username
 * @param updatedUser the new info for the user
 * @returns user object
 */
editUser(updatedUser: any): Observable<any> {
  const username = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  return this.http.put(apiUrl + 'users/' + username, updatedUser, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/**
 * deletes all info for a user by username
 * @returns 
 */
deleteUser(): Observable<any> {
  const username = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  return this.http.delete(apiUrl + 'users/' + username, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

  // Non-typed response extraction
  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
  }

/**
 * deletes a movie from the user's favorite movie array by movie id
 * @param movieId the movie's id
 * @returns user object
 */
deleteFavoriteMovie(movieId: string): Observable<any> {
  const username = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  return this.http.delete(apiUrl + 'users/' + username + '/movies/' + movieId, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}
