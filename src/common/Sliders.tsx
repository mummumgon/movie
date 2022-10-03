import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { makeImagePath } from "../Utils";
import styled from "styled-components";
import {  useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {IMovie} from '../Inter'
const Imgbox = styled.p<{bgimg:string}>`
    height: 200px;
    background-image: url(${props=>props.bgimg});
    background-size: cover;
    background-position: center;
    transition: all 0.3s;
    @media screen and (max-width: 1000px) {
      height:130px
    }
    @media screen and (max-width: 630px) {
      height:100px
    }
`;
const NoImgbox = styled.p`
  display:flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  border: 1px solid #999;
  background-color: #333;
  transition: all 0.3s;
  @media screen and (max-width: 1000px) {
      height:130px
    }
    @media screen and (max-width: 630px) {
      height:100px
    }
`;
const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100px;
    width: 100%;
    background-color: #333;
    padding: 10px 10px 20px;
    transition: all 0.3s;
    h6{
        display: flex;
        align-items: top;
        justify-content: space-between;
        span{
            width: calc(100% - 30px);
            font-size: 16px;
            word-break: keep-all;
            transition: all 0.3s;
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
        @media screen and (max-width: 1000px) {
            span{
              width: 100%;
              font-size: 14px;
            }
              button{
                color:transparent;
                border-radius: 0;
                border: 0;
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
              }
            }
    }
    p{
        align-self: flex-end;
        width: 80px;
        border-radius: 50em;
        background-color: red;
        text-align: center;
        padding: 2px 0 5px;
        @media screen and (max-width: 1000px) {
          display: none;
        }
    }
    @media screen and (max-width: 1000px) {
      height:70px
    }
`;
const Slide = styled(motion.div)`

`;
export default function Sliders({props, nick}:any) {
  const native = useNavigate();
  const onClick = (nick:string,movieId:number) =>{
    native(`/moive/${nick}${movieId}`);
    document.body.classList.add('hidden');
  }
  return (
    <>
    <AnimatePresence>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={4}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
        {props.map((data:IMovie)=>(
          <SwiperSlide key={data.id+'slide'} style={{backgroundSize:'cover', backgroundPosition:'center center'}}>
              <Slide layoutId={`${nick}${data.id}`}>
                {data?.backdrop_path === null ? <NoImgbox>{data.title}</NoImgbox> : <Imgbox bgimg={makeImagePath(data.backdrop_path,'w500')}/>}
                <InfoBox>
                      <h6><span>{data.title}</span><button onClick={()=>onClick(nick,data.id)}>▽</button></h6>
                      <p>평점: {data.vote_average}점</p>
                </InfoBox>
              </Slide>
          </SwiperSlide>
        ))}
        
      </Swiper>
      </AnimatePresence>
    </>
  );
}
