import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  id: number = 0;
  movie?: Movie;
  genreString: string = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.has('id')) {
        this.id = +params.get('id')!; // Sada smo sigurni da parametar postoji
      }

      this.movieService.getMovieById(this.id).subscribe((movie: Movie) => {
        this.movie = movie;
        this.genreString = this.movie.genres?.map((mg) => mg.name).join(', ')!;
      });
    });
  }
}
