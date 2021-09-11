import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private movieService: MovieService) { }

  movies: Movie[] = [];

  ngOnInit(): void {
    this.movieService.discoverMovies()
      .subscribe(movies => {
        this.movies = movies;
      });
  }

}
