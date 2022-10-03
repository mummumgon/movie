import {useState} from "react";
import styled from "styled-components";
import Modal from "../component/Modal";
import { ISerch } from "../Inter";
import { makeImagePath } from "../Utils";

const Li = styled.li`
    cursor: pointer;
`;
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
function SearchList({bgImg,title, props,nick,movieId}:any){
    const [modal , setModal] = useState(false);
    const onClick = () =>{
        setModal(true);
    }
    return <>
        <Li key={Date.now()+title} onClick={onClick}>
            <ImageBox>
                <img src={makeImagePath(bgImg,'w300')} alt={title} />
            </ImageBox>
            <Imgtitle>{title}</Imgtitle>
        </Li>
        {modal ?
            <Modal props={props} nick={nick} movieId={movieId} key={movieId+title+nick}></Modal> : null
        }
    </>
}
export default SearchList;