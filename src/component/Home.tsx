import { useEffect  } from "react";
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
const Banner = styled.div<{bgimg:string}>`
    height: 80vh;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background:linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.8)), url(${props =>props.bgimg});
    background-size: cover;
    *{
        color: ${props=>props.theme.textColor};
    }
    div{
        width: 50%;
        .title{ font-size: 60px; font-weight:bold}
        .desc{font-size: 20px; padding:20px 0}
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
    const {isLoading: nowLoding , data: now} = useQuery<IgetAllMovies>(['movie','nowplay'],getMovieNowPlaying);
    const {isLoading: upLoding , data: up} = useQuery<IgetAllMovies>(['movie','upcoming'],getMovieUpcoming);
    const {isLoading: topLoding , data: top} = useQuery<IgetAllMovies>(['movie','topRated'],getMovieTopRated);
    const {isLoading: popLoding , data: pop} = useQuery<IgetAllMovies>(['movie','popular'],getMoviePopular);
    
    const len = Number(now?.results.length);
    const random = Math.floor(Math.random() * len);
    const totalArr = now?.results.concat(up?.results as [],top?.results as [],pop?.results as []);
    const ClickModal = urlmovieId && totalArr?.find(movie => movie.id === +urlmovieId);
    
    const loading = nowLoding || upLoding|| topLoding || popLoding;
    return <Wrap>
        { loading ? <p className="loding">LOADING...</p> 
        : 
        <>
            <Banner bgimg={makeImagePath(now?.results[random].backdrop_path || '')} >
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