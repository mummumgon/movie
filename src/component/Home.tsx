import { useEffect , useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovieNowPlaying,getMovieUpcoming,getMovieTopRated,getMoviePopular,getMovieLatest } from "../api";
import { makeImagePath } from "../Utils";
import Sliders from "../common/Sliders";
import {IMovie,IgetAllMovies} from '../Inter'
import { AnimatePresence, motion } from "framer-motion";
import { useMatch } from "react-router-dom";

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
`;
const SecTitle = styled.section`
    font-size: 24px;
    padding: 16px 0;
    font-weight: bold;
`;
// const SlideWrap = styled.div`
//     position: relative;
    
// `;
// const SlideBox = styled(motion.div)`
//     display: grid;
//     gap: 4px;
    
//     margin-bottom: 4px;
//     grid-template-columns: repeat(6,1fr);
//     position: absolute;
//     left: 0;
//     width: 100%;
    
// `;
// const Slide = styled(motion.div)`
//     height: 200px;
//     color: red;
//     font-size: 50px;
//     overflow: hidden;
//     padding: 0.1px;
//     :hover{
//         transform: scale(1.2) translateY(-10%);
//         transition: transform 0.3s;
//         height: auto;
//         z-index: 10;
//     }

//     &:first-child{transform-origin:left center}
//     &:last-child{transform-origin:right center}
// `;


// const width = null;
// const slidBoxVariants = {
//     hidden:{
//         x:window.outerWidth -10
//     },
//     visible:{
//         x:0
//     },
//     exit:{
//         x:-window.outerWidth +10
//     }
// }
// const offset = 6;
function Home(){
    const {isLoading: nowLoding , data: now} = useQuery<IgetAllMovies>(['movie','nowplay'],getMovieNowPlaying);
    const len = Number(now?.results.length);
    const random = Math.floor(Math.random() * len);
    
    
    const loading = nowLoding;
    // const [idx , setIdx] = useState(0);
    // const [leaving , setLeaving] = useState(false);
    // const slideIdx = () =>{ 
    //     if(data){
    //         if(leaving) return; 
    //         toggleLeaving(); 
    //         const total = data?.results.length  ;
    //         const maxIndx= Math.floor(total /offset) -1;
    //         console.log(maxIndx);
    //         setIdx(prev => (prev === maxIndx ? 0 :  prev +1))
    //     }
    // }
    // const toggleLeaving = () =>{setLeaving(prev => !prev)}
 
    return <Wrap>
        {loading ? <p className="loding">LOADING...</p> 
        : 
        <>
            <Banner bgimg={makeImagePath(now?.results[random].backdrop_path || '')}>
                <div>
                    <h2 className="title">{now?.results[random].title}</h2>
                    <p className="desc">{now?.results[random].overview}</p>
                </div>
            </Banner>
            <Section>
                <SecTitle>Now Play</SecTitle>
                <Sliders key={Date.now()} props={now?.results}/>
            </Section>
                 {/* <SlideWrap>
                   <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                        <SlideBox variants={slidBoxVariants} initial='hidden' animate='visible' exit='exit' transition={{type:"tween" , duration:1}} key={idx}>
                           {data?.results.slice(offset*idx, offset*idx+offset).map((movie)=> 
                           <Slide key={movie.id}>
                            <Imgbox bgimg={makeImagePath(movie.backdrop_path,'w500')}/>
                            <InfoBox>
                               <h6><span>{movie.title}</span><button>▽</button></h6>
                                <p>{movie.vote_average}</p>
                            </InfoBox>
                            </Slide>)}
                        </SlideBox>
                    </AnimatePresence> 
                </SlideWrap>*/}

        </>
        }
    </Wrap>;
}
export default Home;