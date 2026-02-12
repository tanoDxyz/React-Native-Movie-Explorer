export class Favorite {
    private movieId: string
    private movieImageUrl: string
    private movieTitle: string
    private isFavorite: boolean = false

    static getInstance(movieId: string,
        movieImageUrl: string,
        movieTitle: string,
        isFavorite: boolean) {
        return new Favorite(movieId, movieImageUrl, movieTitle, isFavorite)
    }
    constructor(movieId: string,
        movieImageUrl: string,
        movieTitle: string,
        isFavorite: boolean) {
        this.movieId = movieId
        this.movieImageUrl = movieImageUrl
        this.movieTitle = movieTitle
        this.isFavorite = isFavorite
    }

    getMovieId(): string {
        return this.movieId
    }

    getMovieImageUrl(): string {
        return this.movieImageUrl
    }

    getMovieTitle(): string {
        return this.movieTitle
    }

    isFavoriteItem(): boolean {
        return this.isFavorite
    }

    setIsFavorite(isFavorite: boolean) {
        this.isFavorite = isFavorite
    }
    static fromJSON(json: { movieId: string, movieImageUrl: string, movieTitle: string, isFavorite: boolean }): Favorite {
        return new Favorite(
            json.movieId,
            json.movieImageUrl,
            json.movieTitle,
            json.isFavorite
        );
    }
}