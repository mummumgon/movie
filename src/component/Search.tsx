import { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation, useMatch } from "react-router-dom";
import styled from "styled-components";
import { getSearch } from "../api";
import SearchList from "../common/SearchList";
import { ISerch } from "../Inter";
import { makeImagePath } from '../Utils'

const ImgBoxList = styled.ul`

`;

const Title = styled.h3`
    font-size: 30px;
    padding: 20px 0 0;
    margin: 20px 0;
    border-top: 1px solid #444;
`;
function Search(){
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get('keyword');
    const {isLoading, data} = useQuery<ISerch>(['keyword',keyword],() => getSearch(keyword || ''))
    console.log(data);
    useEffect(()=>{
    },[keyword])
    return <div className="container">
        {isLoading ? <p className="loding">LOADING...</p>: 
           <>  
           <p style={{padding: '20px 0'}}>현재 검색하신 단어: {keyword}</p>
             { Number(data?.results.length) < 1 ?
             <p className="loding">검색결과가 없습니다.</p>
             :
                <>
                <Title>Movie</Title>
                <ImgBoxList className="searchImgList">
                    {data?.results.map((search)=> 
                    search.media_type === 'movie' && <SearchList title={search.title || ''} bgImg ={search.backdrop_path || search.poster_path}/>
                    )}
                </ImgBoxList>
                <Title>Tv Show</Title>
                <ImgBoxList className="searchImgList">
                    {data?.results.map((search)=> 
                    search.media_type === 'tv' && <SearchList title={search.title || ''} bgImg ={search.backdrop_path || search.poster_path}/>
                    )}
                </ImgBoxList>
                </>
            }
        </>
        }
    </div>
}

export default Search;