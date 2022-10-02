import { useState,useEffect } from "react";
import styled from "styled-components";
import { motion , useScroll ,useAnimation} from "framer-motion";
import { Link ,useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";

const MHeader = styled(motion.header)`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    padding: 10px 40px;
    z-index: 100;
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
`;
const Gnb = styled.ul`
    display: flex;
    align-items: center;
    margin: 0 30px;
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
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;
const SearchInp = styled(motion.input)`
    transform-origin: right center;
    width: 230px;
    padding: 8px 10px 8px 40px;
    line-height: 18px;
    background-color: transparent;
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
    useEffect(()=>{
       return scrollY.onChange(()=>{
        if(scrollY.get() > 50){
            navAni.start('down');
        }else{
            navAni.start('up');
        }
        })
    },[scrollY]);
    const { register , handleSubmit , setValue} = useForm<ISearch>();
    const onSubmit = (searchtext:ISearch) =>{
        setValue('searchtext','');
        navigate(`search?keyword=${searchtext.searchtext}`);
    }
    //search?keyword=:text
    return <MHeader variants={headBgAni} initial='up' animate={navAni}>
    <Nav>
        <HeadBox>
        <Logo 
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
                <Gitem><Link to='/'>Home</Link></Gitem>
                <Gitem><Link to='/tv'>Tv Show</Link></Gitem>
            </Gnb>
        </HeadBox>
        <HeadBox>
            <Search onSubmit={handleSubmit(onSubmit)}>
                <SearchInp {...register('searchtext')} initial={{scaleX:0}} animate={{scaleX:serch ? 1 : 0}} placeholder="검색어를 적어주세요"/>
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
        </HeadBox>
    </Nav>
</MHeader>;
}
export default Header;