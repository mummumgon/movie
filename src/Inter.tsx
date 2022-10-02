export interface IMovie{
    adul: boolean,
    backdrop_path: string,
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: 878.842,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}
export  interface IgetAllMovies{
    dates: {
        maximum:string,
        minimum:string, 
      },
      page: number,
      results:IMovie[],
      total_pages: number,
      total_results: number
}
export interface IDetail{
        adult: boolean,
        backdrop_path: string,
        belongs_to_collection: {
            id: number,
            name: string
            poster_path:string
            backdrop_path: string
        },
        budget: number,
        genres: [
            {
                id: 28,
                name:string
            },
        ],
        homepage: string,
        id: number,
        imdb_id: string,
        original_language:string,
        original_title: string,
        overview: string,
        popularity: number,
        poster_path:string,
        production_companies: [
            {
                id: number,
                logo_path: string,
                name: string,
                origin_country: string,
            }
        ],
        production_countries: [
            {
                iso_3166_1: string,
                name: string,
            }
        ],
        release_date: string,
        revenue: number,
        runtime: number,
        spoken_languages: [
            {
                english_name: string,
                iso_639_1: string,
                name: string,
            },
        ],
        status: string,
        tagline: string,
        title: string,
        video: boolean,
        vote_average: number,
        vote_count: number

}
export interface IYoutube{
    id: number,
    results: [
      {
        iso_639_1: string,
        iso_3166_1: string,
        name: string,
        key: string,
        site: string,
        size: number,
        type: string,
        official: boolean,
        published_at: string,
        id: string,
      }]
}
export interface IReview{
    id: number,
    page: number,
    results: [
      {
        author: string,
        author_details: {
          name: string,
          username: string,
          avatar_path: string,
          rating: number
        },
        content: string,
        created_at: string,
        id: string,
        updated_at: string,
        url: string,
      }
    ],
    total_pages: number,
    total_results: number
}
export interface ISerch{
    results:[{
    adult: boolean,
    backdrop_path?: string,
    genre_ids: [
      number,
      number
    ],
    id: number,
    media_type: string,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
    }]
}