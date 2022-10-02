const APIKEY ='9f3dc2e5fd2677c3149189fa44812040';
const BASEPATH ='https://api.themoviedb.org/3';

export function getMovieNowPlaying() {
    return fetch(`${BASEPATH}/movie/now_playing?api_key=${APIKEY}&language=ko-KR&region=kr`).then(response =>response.json());
}
export function getMoviePopular() {
    return fetch(`${BASEPATH}/movie/popular?api_key=${APIKEY}&language=ko-KR&region=kr`).then(response =>response.json());
}
export function getMovieTopRated() {
    return fetch(`${BASEPATH}/movie/top_rated?api_key=${APIKEY}&language=ko-KR&region=kr`).then((response) => response.json());
}
export function getMovieUpcoming() {
    return fetch(`${BASEPATH}/movie/upcoming?api_key=${APIKEY}&language=ko-KR&region=kr`).then((response) => response.json());
}
export function getDtail(movieId:string) {
    return fetch(`${BASEPATH}/movie/${movieId}?api_key=${APIKEY}&language=ko-KR`).then((response) => response.json());
}
export function getvideo(movieId:string) {
    return fetch(`${BASEPATH}/movie/${movieId}/videos?api_key=${APIKEY}&language=ko-KR`).then((response) => response.json());
}
export function getYoutube(key:string) {
    return fetch(`http://www.youtube.com/embed/${key}`).then((response) => response.json());
}
export function getReview(movieId:string) {
    return fetch(`${BASEPATH}/movie/${movieId}/reviews?api_key=${APIKEY}`).then((response) => response.json());
}
export function getSearch(keyword:string) {
    console.log('keyword',keyword)
    return fetch(`${BASEPATH}/search/multi?api_key=${APIKEY}&language=ko-KR&query=${keyword}`).then((response) => response.json());
}