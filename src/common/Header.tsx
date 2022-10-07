import { useState,useEffect } from "react";
import styled from "styled-components";
import { motion , useScroll ,useAnimation} from "framer-motion";
import { Link ,useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { useWindowSize } from 'usehooks-ts';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { hamberger, resize } from "../atom";

const MHeader = styled(motion.header)`
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    padding: 10px 40px;
    z-index: 10;
    transition: all 0.3s;
    @media screen and (max-width: 630px) {
        padding: 10px 20px;
        ::before{
            content: "";
            position: fixed;
            left: 100%;
            top: 0;
            width: 100vw;
            height: 100vh;
            background-color: #333;
            transition: all 0.3s;
        }
        &.open{
            padding: 20px;
            ::before{
                left: 0%;
            }
        .leftbox{
            position: relative;
            width: 80px;
            z-index: 1;
            ul{
                display: block;
                position: fixed;
                left: 50%;
                top:150px;
                transform: translateX(-50%);
                flex-direction: column;
                text-align: center;
                width: 300px;
                margin: 0;
                animation: ani 0.3s 0.3s both;
                li a{
                    font-size: 30px;
                    padding: 10px;
                    margin: 10px;
                }
            }
        }
        .rightbox{
            width: calc(100% - 80px);
            z-index: 5;
            form{
                display: flex;
                width: calc(100% - 40px);
                input{
                    width: 100%;
                    padding: 10px 31px 10px 7px;
                }
                button{
                    right: 3px !important;
         
                }
            }
        }
        .close{
            top: 25px;
            :before{
                display: none;
            }
            em{
                :before{
                    transform: rotate(45deg);
                    margin: 11px 0 0; 
                    transition: all 0.3s;
                }
                ::after{
                    transform: rotate(-45deg);
                    margin: -4px 0 0; 
                    transition: all 0.3s;
                }
            }
        }
    }
  }
`;
const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const HeadBox = styled.div`
    display: flex;
    align-items: center;
`;
const Logo = styled(motion.svg)`
    fill:red;
    width: 80px;
    height: 40px;
    @media screen and (max-width: 630px) {
        width: 70px;
    }
`;
const Gnb = styled.ul`
    display: flex;
    align-items: center;
    margin: 0 30px;
    @media screen and (max-width: 630px) {
        display: none;
    }
`;
const Gitem = styled.li`
    a{
        display: block;
        margin: 0 5px;
        padding: 0 10px;
        line-height: 40px;
    }
`;
const Search = styled.form`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 630px) {
        display: none;
    }
`;
const SearchInp = styled(motion.input)`
    transform-origin: right center;
    width: 230px;
    padding: 8px 10px 8px 40px;
    line-height: 18px;
    background-color: ${props=>props.theme.bgColor};
    border: 1px solid ${props=>props.theme.textColor};
`;
const SearchBtn = styled(motion.button)`
    position: absolute;
    right:0;
    border: 0;
    background-color: transparent;
    svg{
        fill:${props=>props.theme.textColor};
        width: 24px;
    }
`;
const Close = styled.button`
        display: none;
        position: absolute;
        right: 20px;
        top: 14px;
        z-index: 6;
        background-color: transparent;
        border: 0;
        :before{
            content: "";
            display: block;
            width: 24px;
            height: 4px;
            background-color: #eee;
            margin: 4px 0;
        }
        em{
            display: block;
            :before{
                content: "";
                display: block;
                width: 24px;
                height: 4px;
                background-color: #eee;
                margin: 4px 0;
            }
            ::after{
                content: "";
                display: block;
                width: 24px;
                height: 4px;
                background-color: #eee;
                margin: 4px 0;
            }
        }
        @media screen and (max-width: 630px) {
        display: block;
    }
`;

const logoVariants = {
    normal: {
      fillOpacity: 1,
    },
    active: {
      fillOpacity: [1,0,1,0,1],
      transition: {
        duration:1,
    },
  },
};
const headBgAni={
    up:{background:'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0))'},
    down:{background:'linear-gradient(rgba(0,0,0,1), rgba(0,0,0,1))',transition:{duration:0.1,}}
}

interface ISearch{
    searchtext:string
}


function Header(){
    const navigate  =  useNavigate();
    const [serch , setSerch] = useState(false);
    const openInp = () => setSerch((state) => !state);
    const {scrollY} = useScroll();
    const navAni = useAnimation();
    const { register , handleSubmit , setValue} = useForm<ISearch>();
    const { width } = useWindowSize();
    const [hmode ,setHmote] = useRecoilState<string>(hamberger);
    const setResizeWidth = useSetRecoilState<number>(resize);
    useEffect(()=>{
       return scrollY.onChange(()=>{
        if(scrollY.get() > 50){
            navAni.start('down');
        }else{
            navAni.start('up');
        }
        })
    },[scrollY,width]);
    setResizeWidth(width);
    const onSubmit = (searchtext:ISearch) =>{
        setValue('searchtext','');
        navigate(`search?keyword=${searchtext.searchtext}`);
        setHmote('100%');
        setSerch(false);
    }
 
    const onhambugerClick = () =>{
        if(hmode === '100%'){
            setHmote('0%');
            setSerch(true);
        }else if(hmode === '0%'){
            setHmote('100%');
            setSerch(false);
        }
    }


    return <MHeader className={(hmode !== '100%') ? 'open' : ''} variants={headBgAni} initial='up' animate={navAni}>
    <Nav>
        <HeadBox className="leftbox">
        <Logo 
        className='logo'
            variants={logoVariants}
            initial="normal"
            whileHover="active"
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="276.742"
          viewBox="0 0 1024 276.742"
        >
          <motion.path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
        </Logo>
        <Gnb>
            <Gitem><Link to='/' onClick={onhambugerClick}>Home</Link></Gitem>
            <Gitem><Link to='/tv' onClick={onhambugerClick}>Tv Show</Link></Gitem>
        </Gnb>
        </HeadBox>
        <HeadBox className="rightbox">
            <Search onSubmit={handleSubmit(onSubmit)}>
                <SearchInp {...register('searchtext')} initial={{scaleX:0}} animate={{scaleX:serch ? 1 : 0}} placeholder="검색어를 적어주세요" autoComplete="off"/>
                <SearchBtn type='button' onClick={openInp} initial={{right:0}} animate={{right:serch ? '192px' : 0}}>
                    <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                        ></path>
                    </svg>
                </SearchBtn>
            </Search>
            <Close className="close" onClick={onhambugerClick}>
                <em></em>
            </Close>
        </HeadBox>
    </Nav>
</MHeader>;
}
export default Header;