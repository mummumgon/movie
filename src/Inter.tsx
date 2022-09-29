export interface IMovie{
    id:number,
    title:string,
    overview:string,
    vote_average:number,
    backdrop_path:string,
    poster_path:string,
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