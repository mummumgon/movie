import { useEffect , useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath, makePostPath } from "../Utils";
import { IDetail, IReview, IYoutube  } from '../Inter';
import { useQuery } from "react-query";
import { getDtail, getReview, getvideo } from "../api";
import ReactPlayer from "react-player";
const MovieDetailBox = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 101;
   -ms-overflow-style: none;
    ::-webkit-scrollbar{
      display:none;
    }

`
const Overlay = styled.div`
  position: fixed;
  left:0;
  top:0;
  width:100%;
  height:100%;
  background-color: rgba(0,0,0,0.7);
  z-index: 1;
`;
const Detail = styled.div`
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
    >div{
      padding-bottom: 50px;
          position: relative;
          width: 100%;
          color:#222;
      }

`;
const VideoBox = styled.div`
    position: relative;
    height: 500px;
    width: 100%;
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
  left: 0;
  bottom: 40%;
  z-index: 3;
  padding: 40px;
  max-width: 75%;
  line-height: 1.3;
  h6{
    font-size: 50px;
    margin: 20px 0;
    font-weight: bold;
    word-break: keep-all;
  }
  span{
    font-size: 16px;
    word-break: keep-all;
  }
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  gap: 60px;
`;
const BtmBox = styled(Grid)`
  border-top: 1px solid #eee;
  margin-top: 100px;
  margin-bottom: 100px;
  
  .reviewList li{
    border-bottom: 1px solid #eee;
    padding: 20px 0;
  }
  .movieInfo{ 
    border-left:1px solid #eee;
    padding:0 20px;
      li{
      padding: 6px 0;
      line-height: 1.5;
    }
  }
    p{
      margin:10px 0;
      font-size:16px;
      span{ font-size:20px}
      }
`;
const ReviewGrid = styled.div`
  display: flex;
  align-items: flex-start;
  img{
    width: 150px;
    height: 150px;
    margin-right: 40px;
  }
  p{
    line-height: 1.4;
    height: 156px;
    overflow: hidden;
  }
`;


const boxVariants = {
    initial:{
      opacity:1,
      scale:1,
    },
    visible:{
      opacity:1,
      scale:1
    },
    leaving:{
      opacity:0,
      scale:1,
    }
  }
function Modal({ props ,nick ,movieId}:any){
    const native = useNavigate();
    const [overlay , setOverlay] = useState(true);
    const movieDetailClose = () => {
      document.body.classList.remove('hidden');
      setOverlay(false);
      native('/');
      }
      const {isLoading:detailLoding , data:detail} = useQuery<IDetail>(['movie','modal'],()=>getDtail(movieId));
      const {isLoading:videoLoding , data:video} = useQuery<IYoutube>(['movie','video'],()=>getvideo(movieId));
      const {isLoading:reviewLoding , data:review} = useQuery<IReview>(['movie','review'],()=>getReview(movieId));
      console.log('review',review)
      useEffect(()=>{

      },[]);
      const loading = detailLoding || videoLoding || reviewLoding;
    return <>   
    <AnimatePresence>
    { !loading ? 
     <MovieDetailBox variants={boxVariants} initial='initial' animate='visible' exit='leaving' layoutId={`${nick}${movieId}`}>
          <Overlay onClick={movieDetailClose}></Overlay>
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
                      height="500px"
                    >
                    </ReactPlayer> : <Bgbox bgimg={makeImagePath(`${detail?.backdrop_path}`)}></Bgbox>
                    }
                            <TitleBox>
                      <h6>{detail?.title}</h6>
                      <span>{detail?.overview}</span>
                    </TitleBox>
                </VideoBox>
                <BtmBox className="section" style={{paddingBottom:'100px'}}>
                    <ul className="reviewList" style={{flex:4}}>
                      {review?.results.map((rev)=>
                      <li key={rev.id}>
                        <p className="btw_flex">{rev?.author_details.username}{rev?.author_details.name && `(${rev.author_details.name})`} <p>{rev.updated_at}</p></p>
                        <ReviewGrid>
                        { (rev?.author_details.avatar_path) === null ? '' : 
                          (`${rev?.author_details.avatar_path}`).search('://') < 0 ?  
                        <span><img src={makePostPath(rev?.author_details.avatar_path)} alt={`${rev.author} 올린 이미지`}/></span>:
                    
                        <span><img src={(`${rev.author_details.avatar_path}`).slice(1)} alt="" width={200} height={200}/></span> 
                        }
                        <p>{rev.content}</p>
                        </ReviewGrid>
                      </li>
                      )}
                    </ul>
                    <ul className="movieInfo" style={{flex:1}}>
                      <li>평점:<span>{props.vote_average}</span></li>
                      <li>개봉일:<span>{props.release_date}</span></li>
                      <li>상영시간:<span>{detail?.runtime}</span></li>
                      <li>장르:<span>{detail?.genres.map(gen => <em key={gen.name}>{gen.name}</em>)}</span></li>
                      <li>언어지원:<span>{detail?.spoken_languages.map((lan)=><em key={lan.name}>{lan.name}</em>)}</span></li>
                    </ul>
                </BtmBox>
              </div>
          </Detail>
    </MovieDetailBox> : null}
    </AnimatePresence>
</>
}

export default Modal;