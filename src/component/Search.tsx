import { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation, useMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getSearch } from "../api";
import SearchList from "../common/SearchList";
import { ISerch } from "../Inter";

const ImgBoxList = styled.ul`

`;

const Title = styled.h3`
    font-size: 30px;
    padding: 20px 0 0;
    margin: 20px 0;
    border-top: 1px solid #444;
    @media screen and (max-width: 630px) {
        padding:10px 0;
        margin:10px 0 0;
        font-size: 24px;
    }
`;

const Word = styled.p`
    padding: 20px 0;
`;
function Search(){
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get('keyword');
    const {isLoading, data} = useQuery<ISerch>(['keyword',keyword],() => getSearch(keyword || ''));


    useEffect(()=>{
    },[keyword])
    return <div className="container">
        {isLoading ? <p className="loding">LOADING...</p>: 
           <>  
           <Word>현재 검색하신 단어: {keyword}</Word>
             { Number(data?.results.length) < 1 ?
             <p className="loding">검색결과가 없습니다.</p>
             :
                <>
                <Title>Movie</Title>
                <ImgBoxList className="searchImgList">
                    {data?.results.map((search)=> 
                    search.media_type === 'movie' && <SearchList key={Date.now()+search.id}  title={search.title || ''}  bgImg ={search.backdrop_path || search.poster_path} props={data} nick={search.media_type} movieId={search.id} keyword={keyword}/>
                    )}
                </ImgBoxList>
                <Title>Tv Show</Title>
                <ImgBoxList className="searchImgList">
                    {data?.results.map((search)=> 
                    search.media_type === 'tv' && <SearchList key={Date.now()+search.id+'aa'}  title={search.name || ''}  bgImg ={search.backdrop_path || search.poster_path} props={data} nick={search.media_type} movieId={search.id} keyword={keyword}/>
                    )}
                </ImgBoxList>
                </>
            }
        </>
        }
    </div>
}

export default Search;