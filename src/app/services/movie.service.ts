import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  discoverMovies(): Observable<Movie[]> {
    return this.http
      .get<Movie[]>(
        `${environment.apiURL}/discover/movie?api_key=${environment.apiKey}`
      )
      .pipe(
        map((data: any) => {
          return data.results?.map((result: any) => {
            return {
              id: result?.id,
              originalTitle: result?.original_title,
              language: result?.original_language,
              overview: result?.overview,
              popularity: result?.popularity,
              releaseDate: new Date(result?.release_date),
              title: result?.title,
              voteAverage: result?.vote_average,
              voteCount: result?.vote_count,
              posterPath: environment.imagePrefix + result?.poster_path,
              backdropPath: environment.imagePrefix + result?.backdrop_path,
            };
          });
        })
      );
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http
      .get<Movie>(
        `${environment.apiURL}/movie/${id}?api_key=${environment.apiKey}`
      )
      .pipe(
        map((result: any) => {
          return {
            id: result?.id,
            originalTitle: result?.original_title,
            language: result?.original_language,
            overview: result?.overview,
            popularity: result?.popularity,
            releaseDate: new Date(result?.release_date),
            title: result?.title,
            voteAverage: result?.vote_average,
            voteCount: result?.vote_count,
            posterPath: environment.imagePrefix + result?.poster_path,
            backdropPath: environment.imagePrefix + result?.backdrop_path,
            productionCompanies: result?.production_companies?.map(
              (pc: any) => {
                return {
                  id: pc?.id,
                  logoPath: environment.imagePrefix + pc?.logo_path,
                  name: pc?.name,
                };
              }
            ),
            genres: result?.genres?.map((genre: any) => {
              return {
                id: genre.id,
                name: genre.name,
              };
            }),
          };
        })
      );
  }
}
