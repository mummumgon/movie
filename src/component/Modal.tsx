import { useEffect , useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath, makePostPath } from "../Utils";
import { IDetail, IReview, IYoutube  } from '../Inter';
import { useQuery } from "react-query";
import { getDtail, getReview, getvideo } from "../api";
import ReactPlayer from "react-player";
import { transform } from "typescript";
import { useSetRecoilState } from "recoil";
import { modalClose } from "../atom";
const MovieDetailBox = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    z-index: 101;
   -ms-overflow-style: none;
    ::-webkit-scrollbar{
      display:none;
    }

`
const Overlay = styled(motion.div)`
  position: fixed;
  left:0;
  top:0;
  width:100%;
  height:100%;
  background-color: rgba(0,0,0,0.7);
  z-index: 1;
`;
const Detail = styled(motion.div)`
    position: relative;
    display: flex;
    justify-content: center;
    max-width: 1000px;
    margin: 10vh auto;
    width: 100%;
    height: calc(100% - 10vh);
    background-color: #333;
    overflow: auto;
    z-index: 2;
    transition: all 0.3s;
    >div{
          padding-bottom: 50px;
          position: relative;
          width: 100%;
          color:#222;
      }
      @media screen and (max-width: 1000px) {
        margin: 0;
        height:100%
      }
`;
const VideoBox = styled.div`
    position: relative;
    padding: 52% 0 0;
    width: 100%;
    border: 0;
        div:first-child{
          position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
        }
        &::before{
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            z-index: 2;
            background: linear-gradient(180deg,transparent ,#333 );
        };

  @media screen and (max-width: 630px) {
    padding:70% 0 0
  }
`;
const Close = styled.button`
  position: absolute;
  right: 15px;
  top: 15px;
  width: 30px;
  height: 30px;
  line-height: 30px;
  background-color: #eee;
  font-size: 30px;
  border-radius: 50em;
  z-index: 10;
  cursor: pointer;
`;
const Bgbox = styled.div<{bgimg:string}>`
      width: 100%;  
      height: 100%;
      background-image: url(${props=>props.bgimg});
      background-size: cover;
      background-position: center;
`
const TitleBox = styled.div`
  position: relative;
  padding:0 20px;
  z-index: 3;
    .title{
      font-size: 30px;
    }
    @media screen and (max-width: 630px) {
      font-size: 24px;
    }
`;
const Desc=styled.div`
    padding:  20px;
    font-size: 16px;
    @media screen and (max-width: 630px) {
      font-size: 14px;
    }
`;
const BtmBox = styled.div`
  display: grid;
  grid-template-columns: 170px 4fr;
  gap: 60px;
  border-top: 1px solid #eee;
  margin-bottom: 100px;
  transition: all 0.3s;
  p{
    word-break: break-all;
  }
  .reviewList li{
    border-bottom: 1px solid #eee;
    padding: 20px 0;
    :first-child{
      padding-top: 0;
    }
    :last-child{
      border:0
    }
  }
  .movieInfo{ 
    border-right:1px solid #eee;
    padding:20px;
      li{
      padding: 6px 0;
      line-height: 1.5;
      word-break: break-all;
    }
  }
    p{
      margin:10px 0;
      font-size:16px;
      span{ font-size:20px}
      }
  @media screen and (max-width: 800px) {
    display: block;
    margin-top: 0;
    .movieInfo{
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px , 2fr));
      border-right: 0;
      border-bottom: 1px solid #eee;
      padding: 0 0 20px;
    }
    .btw_flex{
      flex-direction: column;
  		align-items: flex-start;
	  	justify-content: flex-start;
      line-height: 24px;
      font-size: 14px;
      p{
        margin: 0;
        padding: 0 0 5px;
   
      }
    }
  }
`;
const ReviewGrid = styled.div`
  display: flex;
  align-items: flex-start;
  font-size: 14px;
  img{
    width: 150px;
    height: 150px;
    margin-right: 40px;
    @media screen and (max-width: 630px) {
      width: 100%;
      height: 100%;
    }
  }
  p{
    line-height: 1.4;
    height: 156px;
    overflow: hidden;

  }
  @media screen and (max-width: 630px) {
     flex-direction: column;
     img{
      width: 100%;
      height: 100%;
     }
    }
 
`;


const boxVariants = {
    initial:{
      opacity:0
    },
    visible:{
      opacity:1
    },
    leaving:{
      opacity:0
    }
  }

function Modal({ props ,nick ,movieId}:any){
    const navigate = useNavigate();
    const {isLoading:detailLoding , data:detail} = useQuery<IDetail>(['movie','modal'],()=>getDtail(movieId));
    const {isLoading:videoLoding , data:video} = useQuery<IYoutube>(['movie','video'],()=>getvideo(movieId));
    const {isLoading:reviewLoding , data:review} = useQuery<IReview>(['movie','review'],()=>getReview(movieId));
    const setClose = useSetRecoilState(modalClose);
    const movieDetailClose = () => {
      setClose(false);
      document.body.classList.remove('hidden');
      navigate('/');
      };
      const loading = detailLoding || videoLoding || reviewLoding;
    return <>   
    <AnimatePresence>
    { !loading ? 
     <MovieDetailBox >
          <Overlay onClick={movieDetailClose} ></Overlay>
          <Detail>
            <div>
                <VideoBox>
                    {video?.results[0] ?
                    <ReactPlayer
                      url={`http://www.youtube.com/embed/${video?.results[0].key}`}
                      volume={0}
                      controls={false}
                      playing={true}
                      muted={true}
                      loop={false}
                      width="100%"
                      height="100%"
                    >
                    </ReactPlayer> : <Bgbox bgimg={makeImagePath(`${detail?.backdrop_path}`)}></Bgbox>
                    }
                    <TitleBox>
                      <h6 className="title">{detail?.title}</h6>
                    </TitleBox>
                    <Close onClick={movieDetailClose}>×</Close>
                </VideoBox>
                <Desc className="desc">{detail?.overview}</Desc>
                <BtmBox className="section" style={{paddingBottom:'100px'}}>
                   <ul className="movieInfo" style={{flex:1}}>
                      {/* <li>평점:<span>{props.vote_average}</span></li> */}
                      {/* <li>개봉일:<span>{props.release_date}</span></li> */}
                      <li>상영시간:<span>{detail?.runtime}</span></li>
                      <li>장르:<span>{detail?.genres.map(gen => <em key={detail.id+gen.name}>{gen.name}</em>)}</span></li>
                      <li>언어지원:<span>{detail?.spoken_languages.map((lan)=><em key={detail.id+lan.name}>{lan.name}</em>)}</span></li>
                    </ul>
                    <ul className="reviewList" style={{flex:4}}>
                      {review?.results.map((rev)=> 
                          rev !== undefined ? <li key={rev.id+nick}>
                          <div className="btw_flex">{rev?.author_details.username}{rev?.author_details.name && `(${rev.author_details.name})`} <p>{rev.updated_at}</p></div>
                          <ReviewGrid>
                          { (rev?.author_details.avatar_path) === null ? '' : 
                            (`${rev?.author_details.avatar_path}`).search('://') < 0 ?  
                          <span><img src={makePostPath(rev?.author_details.avatar_path)} alt={`${rev.author} 올린 이미지`}/></span>:
                          <span><img src={(`${rev.author_details.avatar_path}`).slice(1)} alt="" width={200} height={200}/></span> 
                          }
                          <p>{rev.content}</p>
                          </ReviewGrid>
                        </li> : '리뷰가 없습니다.' 
                  
                      )}
                    </ul>
                  
                </BtmBox>
              </div>
          </Detail>
    </MovieDetailBox> : null}
    </AnimatePresence>
</>
}

export default Modal;