const APIKEY ='9f3dc2e5fd2677c3149189fa44812040';
const BASEPATH ='https://api.themoviedb.org/3';


export function getMovieLatest() {
    return fetch(`${BASEPATH}/movie/latest?api_key=${APIKEY}`).then(response =>response.json());
}
export function getMovieNowPlaying() {
    return fetch(`${BASEPATH}/movie/now_playing?api_key=${APIKEY}`).then(response =>response.json());
}
export function getMoviePopular() {
    return fetch(`${BASEPATH}/movie/popular?api_key=${APIKEY}`).then(response =>response.json());
}
export function getMovieTopRated() {
    return fetch(`${BASEPATH}/movie/top_rated?api_key=${APIKEY}`).then(response =>response.json());
}
export function getMovieUpcoming() {
    return fetch(`${BASEPATH}/movie/upcoming?api_key=${APIKEY}`).then(response =>response.json());
}