export interface Movie {
    id: number;
    originalTitle: string;
    language: string;
    overview: string;
    popularity: number;
    releaseDate: Date;
    title: string;
    voteAverage: number;
    voteCount: number;
    posterPath: string;
    backdropPath: string;

    productionCompanies?: {
        id: number;
        logoPath: string;
        name: string;
    }[];

    genres?: {
        id: number;
        name: string;
    }[];
}