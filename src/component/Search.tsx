import { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getSearch } from "../api";
import { ISerch } from "../Inter";
import { makeImagePath } from '../Utils'

const ImgBoxList = styled.ul`
    display: grid;
    grid-template-columns: repeat(5 ,1fr);
    gap: 20px;
    li{
        img{width:100%}
    }
`;
function Search(){
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get('keyword');
    const {isLoading, data} = useQuery<ISerch>(['keyword','multi'],() => getSearch(keyword || ''))
     console.log(data);
    return <div className="container">
        {isLoading ? <p className="loding">LOADING...</p>: 
        <>
             <p>현재 검색하신 단어: {keyword}</p>
             <ImgBoxList>
                {data?.results.map((a)=>
                <li key={a.id+a.media_type}>
                    <p><img src={makeImagePath(a.backdrop_path,'w300')} alt="" /></p>
                    <p>{a.title}</p>
                    <p>{a.media_type}</p>
                </li>
                )}
            </ImgBoxList>
        </>
        }
    </div>
}

export default Search;