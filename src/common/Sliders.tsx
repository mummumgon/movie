import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
// import { Pagination } from "swiper";
import { makeImagePath } from "../Utils";
import styled from "styled-components";
import { useMatch, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
const Imgbox = styled.p<{bgimg:string}>`
    height: 200px;
    background-image: url(${props=>props.bgimg});
    background-size: cover;
    background-position: center;
`;
const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100px;
    width: 100%;
    background-color: #333;
    padding: 10px 10px 20px;
    h6{
        display: flex;
        align-items: top;
        justify-content: space-between;
        span{
            width: calc(100% - 30px);
            font-size: 16px;
        }
        button{
            background-color: transparent;
            border: 1px solid #eee;
            color: #eee;
            border-radius: 50em;
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            cursor: pointer;
        }
    }
    p{
        align-self: flex-end;
        width: 40px;
        border-radius: 50em;
        background-color: red;
        text-align: center;
        padding: 2px 0 5px;
    }
`;
const Slide = styled(motion.div)``;

const MovieDetailBox = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 101;
   -ms-overflow-style: none;
    ::-webkit-scrollbar{
      display:none;
    }

`
// const ModalBg = styled(motion.div)`
//     position: fixed;
//     left: 0;
//     top: 0;
//     width: 100%;
//     height: 100%;
//     background-color: rgba(0,0,0,0.5);
//     z-index: 1;
// `;
const Detail = styled.div`
        position: relative;
        display: flex;
        justify-content: center;
        height: 100%;
        width:100%;
        padding: 10vh 0;
        z-index: 2;
        background-color: rgba(0,0,0,0.5);
        box-sizing: unset;
        div{
          width: 80%;
          height:100%;
          background-color: green;
            div{
                padding: 10vw;
                background-color: green;
            }
        } 
`;

const boxVariants = {
  initial:{
    opacity:0,
    scale:0,
  },
  visible:{
    opacity:1,
    scale:1
  },
  leaving:{
    opacity:0,
    scale:0,
    y: 1000,
  }
}
export default function Sliders({props}:any) {
  // const len = Number(props?.length);
  // const random = Math.floor(Math.random() * len);
  const native = useNavigate();
  const onClick = (movieId:number) =>{
    native(`/moive/${movieId}`);
    document.body.classList.add('hidden');
  }
  const movieDetailClose = () => {
    document.body.classList.remove('hidden');
    native('/');
  }
  const movieDetailMatch = useMatch('moive/:movieId');
  console.log(movieDetailMatch);    
  return (
    <>
    <AnimatePresence>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={4}
        pagination={{
          clickable: true,
        }}
        // modules={[Pagination]}
        className="mySwiper"
      >
        {props.map((data:any)=>(
          <SwiperSlide style={{backgroundImage:`url(${makeImagePath(data.poster_path)})`, backgroundSize:'cover', backgroundPosition:'center center'}}>
            <Slide layoutId={data.id}>
              <Imgbox bgimg={makeImagePath(data.backdrop_path,'w500')}/>
              <InfoBox>
                  <h6><span>{data.title}</span><button onClick={()=>onClick(data.id)}>▽</button></h6>
                  <p>{data.vote_average}</p>
              </InfoBox>
            </Slide>
          </SwiperSlide>
        ))}
        
      </Swiper>
      </AnimatePresence>
      <AnimatePresence>
          {movieDetailMatch ? 
           <MovieDetailBox variants={boxVariants} initial='initial' animate='visible' exit='leaving' layoutId={`${movieDetailMatch.params.movieId}`}>
              <Detail onClick={movieDetailClose}>
                  <div onClick={(e) => e.stopPropagation()}>
                      <div></div>
                  </div>
              </Detail>
          </MovieDetailBox>: null}
      </AnimatePresence> 
    </>
  );
}
