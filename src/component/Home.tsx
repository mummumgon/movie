import { useEffect ,useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovieNowPlaying,getMovieUpcoming,getMovieTopRated,getMoviePopular, getDtail } from "../api";
import { makeImagePath } from "../Utils";
import Sliders from "../common/Sliders";
import {IgetAllMovies, IMovie} from '../Inter'
import { AnimatePresence, motion } from "framer-motion";
import Modal from "./Modal";
import { useLocation, useMatch } from "react-router-dom";

const Wrap = styled.div`
    min-height: 200vh;
`;
const Banner = styled.div`
    position: relative;
    padding: 35% 40px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: end;
    background-size: cover;
    ::before{
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        background:linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.8));
    }
    img{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }
    div{
        position: relative;
        padding-bottom: 5vw;
        width: 70%;
        z-index: 3;
        .title{ font-size: 60px; font-weight:bold; word-break: keep-all;}
        .desc{font-size: 16px; padding:20px 0; line-height:1.4; word-break: keep-all;}
       
    }
    @media only screen and (max-width: 1000px) {
        div{
        width: 70%;
        .title{ font-size: 40px; word-break: keep-all;}
        .desc{ font-size: 14px; word-break: keep-all;}
       
    }
  }
`;
const Section = styled(motion.section)`
    padding: 0 40px;
    height: 360px;
`;
const SecTitle = styled.h6`
    font-size: 24px;
    padding: 24px 0;
    font-weight: bold;
`;
function Home(){
    const movieDetailMatch = useMatch('moive/:nick/:movieId');
    const urlnick = movieDetailMatch?.params.nick;
    const urlmovieId = movieDetailMatch?.params.movieId;
    const [random , setRandom] = useState(0);
    const {isLoading: nowLoding , data: now} = useQuery<IgetAllMovies>(['movie','nowplay'],getMovieNowPlaying);
    const {isLoading: upLoding , data: up} = useQuery<IgetAllMovies>(['movie','upcoming'],getMovieUpcoming);
    const {isLoading: topLoding , data: top} = useQuery<IgetAllMovies>(['movie','topRated'],getMovieTopRated);
    const {isLoading: popLoding , data: pop} = useQuery<IgetAllMovies>(['movie','popular'],getMoviePopular);
    
    const totalArr = now?.results.concat(up?.results as [],top?.results as [],pop?.results as []);
    const ClickModal = urlmovieId && totalArr?.find(movie => movie.id === +urlmovieId);
    const len = Number(now?.results.length);
    const loading = nowLoding || upLoding || topLoding || popLoding;
    useEffect(()=>{
        const len = Number(now?.results.length);
        const math = Math.floor(Math.random() * len)
        setRandom(math);
    },[now])
    return <Wrap>
        { loading ? <p className="loding">LOADING...</p> 
        : 
        <>
            <Banner>
                <img src={ makeImagePath(now?.results[random].backdrop_path || '')} alt={now?.results[random].title}/>
                <div>
                    <h2 className="title">{now?.results[random].title}</h2>
                    <p className="desc">{now?.results[random].overview}</p>
                </div>
            </Banner>
         
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