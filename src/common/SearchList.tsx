import styled from "styled-components";
import { ISerch } from "../Inter";
import { makeImagePath } from "../Utils";

const ImageBox = styled.div`
    position: relative;
    overflow: hidden;
    padding:50% 0 0;
    border: 1px solid #000;
    > img{
        position: absolute;
        left: 50%;
        top: 50%;
        width: 100%;
        transform: translate(-50%,-50%);
        transition: all 0.3s;
    }
    :hover img{
        transform: translate(-50%,-50%) scale(1.2);
    }
`;
const Imgtitle = styled.h4`
    color:${props=>props.theme.textColor};
    padding:10px;
    word-break: keep-all;
    cursor: pointer;
`
function SearchList({bgImg,title}:any){
    return <li>
        <ImageBox>
            <img src={makeImagePath(bgImg,'w300')} alt={title} />
        </ImageBox>
        <Imgtitle>{title}</Imgtitle>
    </li>
}
export default SearchList;