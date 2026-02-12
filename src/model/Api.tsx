
import { Movie, Search, TMDB, TrendingResults } from 'tmdb-ts';
import { useCallback, useEffect, useState } from "react";

const tmdb = new TMDB('eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmODQ4ZGE5NWI1M2JjODg3MzUzYThmN2Q1MjZiMjBlZCIsIm5iZiI6MTc2OTQ5NjE3My40OTYsInN1YiI6IjY5Nzg1ZTZkNjBlYzBmYzIzZDY5NTI0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9q5gDKNJnjl6BktThbNKYQJCCUni2E3sySBvxKZIeGo');
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/";
const DEFAULT_POSTER_SIZE = "w500";
const MOVIE_PAGES_TO_LOAD = 5
function buildImageUrl(
    path: string | null,
    size: "w185" | "w342" | "w500" | "original" = DEFAULT_POSTER_SIZE
): string | null {
    if (!path) return null;
    return `${TMDB_IMAGE_BASE}${size}${path}`;
}
export type TrendingMediaItem = {
    id: number;
    title: string;
    posterUrl: string | null;
    backdropUrl: string | null;
    type: "movie" | "tv";
};
export function useTrendingMovies(
    time: "week" | "day" = "week"
): {
    data: TrendingMediaItem[] | null;
    error: unknown;
    loading: boolean;
    refresh: () => void;
} {
    const [data, setData] = useState<TrendingMediaItem[] | null>(null);
    const [error, setError] = useState<unknown>(null);
    const [loading, setLoading] = useState(false);

    const fetchMovies = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const allResults: TrendingMediaItem[] = [];

            for (let page = 1; page <= MOVIE_PAGES_TO_LOAD; page++) {
                const trending = await tmdb.trending.trending(
                    "movie",
                    time,
                    { page }
                );

                const normalized = trending.results.map(item => ({
                    id: item.id,
                    title: "title" in item ? item.title : item.name,
                    posterUrl: buildImageUrl(item.poster_path, "w500"),
                    backdropUrl: buildImageUrl(item.backdrop_path, "original"),
                    type: item.media_type,
                }));

                allResults.push(...normalized);
            }

            setData(allResults);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [time]);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    return {
        data,
        error,
        loading,
        refresh: fetchMovies,
    };
}


export type MovieWithImages = Movie & {
    posterUrl: string | null;
    backdropUrl: string | null;
};
export function useSearchMovies(
    query: string
): {
    data: MovieWithImages[] | null;
    error: unknown;
    loading: boolean;
    refresh: () => void;
} {
    const [data, setData] = useState<MovieWithImages[] | null>(null);
    const [error, setError] = useState<unknown>(null);
    const [loading, setLoading] = useState(false);

    const fetchSearchResults = useCallback(async () => {
        if (!query || query.trim().length === 0) {
            setData(null);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const allResults: MovieWithImages[] = [];

            for (let page = 1; page <= MOVIE_PAGES_TO_LOAD; page++) {
                const response = await tmdb.search.movies({
                    query,
                    page,
                    include_adult: false,
                });

                const normalized: MovieWithImages[] = response.results.map(
                    (movie: Movie) => ({
                        ...movie,
                        posterUrl: buildImageUrl(movie.poster_path, "w500"),
                        backdropUrl: buildImageUrl(movie.backdrop_path, "original"),
                    })
                );

                allResults.push(...normalized);
            }

            setData(allResults);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [query]);

    useEffect(() => {
        fetchSearchResults();
    }, [fetchSearchResults]);

    return {
        data,
        error,
        loading,
        refresh: fetchSearchResults,
    };
}






export type PopularMovieItem = {
    id: number;
    title: string;
    posterUrl: string | null;
    backdropUrl: string | null;
    popularity: number | 0;

};

export function usePopularMovies(): {
    data: PopularMovieItem[] | null;
    error: unknown;
    loading: boolean;
    refresh: () => void;
} {
    const [data, setData] = useState<PopularMovieItem[] | null>(null);
    const [error, setError] = useState<unknown>(null);
    const [loading, setLoading] = useState(false);

    const fetchMovies = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const allResults: PopularMovieItem[] = [];

            for (let page = 1; page <= MOVIE_PAGES_TO_LOAD; page++) {
                const popular = await tmdb.movies.popular({ page });

                const normalized = popular.results.map(movie => ({
                    popularity: movie.popularity,
                    id: movie.id,
                    title: movie.title,
                    posterUrl: buildImageUrl(movie.poster_path, "w500"),
                    backdropUrl: buildImageUrl(movie.backdrop_path, "original")
                }));

                allResults.push(...normalized);
            }
            allResults.sort((a, b) => b.popularity - a.popularity);

            setData(allResults);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    return {
        data,
        error,
        loading,
        refresh: fetchMovies,
    };
}


export type MovieDetails = {
    id: number;
    title: string;
    overview: string;
    runtime: number | null;
    releaseYear: string;
    posterUrl: string | null;
    backdropUrl: string | null;
    trailerKey: string | null;
    cast: {
        id: number;
        name: string;
        character: string;
        profileUrl: string | null;
    }[];
};
export function useMovieDetails(movieId: number) {
    const [data, setData] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    const fetchDetails = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const [
                details,
                videos,
                credits
            ] = await Promise.all([
                tmdb.movies.details(movieId),
                tmdb.movies.videos(movieId),
                tmdb.movies.credits(movieId),
            ]);

            // 🎬 Trailer (YouTube)
            const trailer = videos.results.find(
                v => v.type === "Trailer" && v.site === "YouTube"
            );

            const normalized: MovieDetails = {
                id: details.id,
                title: details.title,
                overview: details.overview,
                runtime: details.runtime,
                releaseYear: details.release_date?.split("-")[0] ?? "",
                posterUrl: buildImageUrl(details.poster_path, "w500"),
                backdropUrl: buildImageUrl(details.backdrop_path, "original"),
                trailerKey: trailer?.key ?? null,

                // 🎭 Top cast (limit to 10)
                cast: credits.cast.slice(0, 10).map(actor => ({
                    id: actor.id,
                    name: actor.name,
                    character: actor.character,
                    profileUrl: buildImageUrl(actor.profile_path, "w185"),
                })),
            };

            setData(normalized);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [movieId]);

    useEffect(() => {
        fetchDetails();
    }, [fetchDetails]);

    return {
        data,
        loading,
        error,
        refresh: fetchDetails,
    };
}



// import YoutubePlayer from "react-native-youtube-iframe";

// <YoutubePlayer
//   height={220}
//   play={false}
//   videoId={movie.trailerKey}
// />


// const hours = Math.floor(runtime / 60);
// const minutes = runtime % 60;

// `${hours}h ${minutes}m`

{/* <Text numberOfLines={4}>
  {movie.overview}
</Text> */}

{/* <FlatList
  horizontal
  data={movie.cast}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <CastCard
      name={item.name}
      character={item.character}
      image={item.profileUrl}
    />
  )}
/> */}
