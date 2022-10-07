import { useEffect ,useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovieNowPlaying,getMovieUpcoming,getMovieTopRated,getMoviePopular, getDtail, getvideo, getReview } from "../api";
import { makeImagePath } from "../Utils";
import Sliders from "../common/Sliders";
import {IDetail, IgetAllMovies, IReview, IYoutube} from '../Inter'
import { AnimatePresence, motion } from "framer-motion";
import Modal from "./Modal";
import { useMatch, useNavigate } from "react-router-dom";
import { resize } from "../atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
const Wrap = styled.div`
    min-height: 100vh;
    padding-bottom: 50px;
`;
const Banner = styled.div<{bgImg:string}>`
    position: relative;
    padding: 40% 40px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background-size: cover;
    background-position: center;
    background-image: url(${props=>props.bgImg});
    ::before{
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        background:linear-gradient(rgba(34,34,34,0), rgba(34,34,34,1));
    }
    img{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }
    @media only screen and (max-width: 630px) {
        padding: 0;
        height: 300px;
    }
  
`;
const Main = styled.div`
    position: relative;
    margin-top: -60px;
    z-index: 3;
    @media only screen and (max-width: 1000px) {
        margin-top: 0;
    }
`;
const Section = styled(motion.section)`
    padding: 0 40px;
    height: 390px;
    overflow-x: hidden;
    @media only screen and (max-width: 1000px) {
        padding: 0 20px;
        height: 300px;
    }
    @media only screen and (max-width: 630px) {
        padding: 0 20px;
        height: 250px;
    }
`;
const SecTitle = styled.h6`
    font-size: 22px;
    padding: 24px 0;
    font-weight: bold;
    @media only screen and (max-width: 630px) {
        font-size: 16px;
        padding: 24px 0 16px;
    }
`;
function Home(){
    const navigate = useNavigate();
    const movieDetailMatch = useMatch('moive/:nick/:movieId');
    const urlnick = movieDetailMatch?.params.nick;
    const urlmovieId = movieDetailMatch?.params.movieId as string;
    const [random , setRandom] = useState(0);
    const {isLoading: nowLoding , data: now} = useQuery<IgetAllMovies>(['movie','nowplay'],getMovieNowPlaying);
    const {isLoading: upLoding , data: up} = useQuery<IgetAllMovies>(['movie','upcoming'],getMovieUpcoming);
    const {isLoading: topLoding , data: top} = useQuery<IgetAllMovies>(['movie','topRated'],getMovieTopRated);
    const {isLoading: popLoding , data: pop} = useQuery<IgetAllMovies>(['movie','popular'],getMoviePopular);
    const {isLoading:detailLoding , data:detail} = useQuery<IDetail>(['movie','modal'],()=>getDtail(urlmovieId));
    const {isLoading:videoLoding , data:video} = useQuery<IYoutube>(['movie','video'],()=>getvideo(urlmovieId));
    const {isLoading:reviewLoding , data:review} = useQuery<IReview>(['movie','review'],()=>getReview(urlmovieId));
    const totalArr = now?.results.concat(up?.results as [],top?.results as [],pop?.results as []);
    const ClickModal = urlmovieId && totalArr?.find(movie => movie.id === +urlmovieId) ;
    const loading = nowLoding || upLoding || topLoding || popLoding;
    const reWidth = useRecoilValue(resize);
    useEffect(()=>{
        const len = Number(now?.results.length);
        const math = Math.floor(Math.random() * len)
        setRandom(math);
    },[now])
    
    return <Wrap>
        { loading ? <p className="loding">LOADING...</p> 
        : 
        <>
            <Banner bgImg={makeImagePath(now?.results[random].backdrop_path || String(now?.results[random].poster_path))}>
                {/* <img src={} alt={now?.results[random].title}/> */}
                <div className="movieTitle">
                    <h2 className="title">{now?.results[random].title}</h2>
                    <p className="desc">{Number(now?.results[random].overview.length) >= 100 
                    ?(`${now?.results[random].overview.slice(0,reWidth/9)}...`) : 
                    (`${now?.results[random].overview.slice(0,reWidth/5)}...`) }</p>
                    {/* <p className="desc">{now?.results[random].overview}</p> */}
                </div>
            </Banner>
            <Main>
            <Section>
                <SecTitle>Upcoming</SecTitle>
                <Sliders key={['up',Date.now()]} props={up?.results} nick='up/'/>
            </Section>
            <Section>
                <SecTitle>Now Play</SecTitle>
                <Sliders key={['now',Date.now()]} props={now?.results} nick='now/'/>
            </Section>
            <Section>
                <SecTitle>Top Rated</SecTitle>
                <Sliders key={['top',Date.now()]} props={top?.results} nick='top/'/>
            </Section> 
            <Section>
                <SecTitle>Popular</SecTitle>
                <Sliders key={['pop',Date.now()]} props={pop?.results} nick='pop/'/>
            </Section>
            </Main>
           <AnimatePresence>
            {ClickModal && 
                <Modal props={ClickModal} nick={urlnick} movieId={urlmovieId} key={urlmovieId+urlnick}></Modal>
            }
            </AnimatePresence>
        </>
        }
    </Wrap>;
}
export default Home;