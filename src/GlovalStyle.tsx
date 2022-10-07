import{ createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video ,input , textarea,select{
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
	box-sizing: border-box;
	color: ${props=>props.theme.textColor};
	font-size: 14px;
	font-family: 'Noto Sans KR', sans-serif;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	background-color: ${props =>props.theme.bgColor};
	overflow-x: hidden;
	-webkit-overflow-x: hidden;
	-ms-overflow-x: hidden;
	-o-overflow-x: hidden;
	width: 100vw;
}
body.hidden{
	overflow: hidden;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
a{text-decoration:none}
button{background-color: transparent;border: 0;}
.loding{
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
	text-align: center;
	font-size:30px;
	color: ${props =>props.theme.textColor};
}
.container{
	padding: 80px 40px;
	min-height:calc(100vh - 60px);
	margin-bottom: 100px;
	@media only screen and (max-width: 630px) {
		padding: 60px 20px;
	}
}
.movieTitle{
		position: absolute;
        left: 40px;
        top: 60%;
        width: 70%;
        z-index: 3;
        .title{ font-size: 40px; font-weight:bold; word-break: keep-all;}
        .desc{font-size: 16px; padding:20px 0; line-height:1.4; word-break: keep-all;}
       
    @media only screen and (max-width: 1000px) {
        width: 70%;
        .title{ font-size:30px; word-break: keep-all;}
        .desc{ font-size: 14px; word-break: keep-all;}
 
    }
    @media only screen and (max-width: 630px) {
        left: 20px;
        top: 65%;
        .title{ font-size:20px;}
        .desc{padding:10px 0;}
      
    }
    @media only screen and (max-width: 450px) {
        .desc{display:none}
    }
}
/* swiper */
.swiper {overflow:unset}
.swiper-slide{
	position: relative;
	width: 300px;
	height: 200px;
    color: red;
    overflow: hidden;
    padding: 1px;
	transition: all 0.3s;
	:hover{
		transform: scale(1.04) translateY(-15%);
        transition: transform 0.3s;
        height: 300px;
        z-index: 10;
    }
	@media only screen and (max-width: 1000px) {
		width: 250px;
		height: auto;
		:hover{
			transform: scale(1) translateY(0);
			transition: transform 0.3s;
			height: auto;
			z-index: 10;
		}
	}
	@media only screen and (max-width: 630px) {
		width: 200px;
		height: 180px;
	}

}

.ptitle{
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	line-height: 1.3;
	background: linear-gradient(to bottom,rgba(0,0,0,0) 5%,rgba(0,0,0,1));
	padding: 40px 30px 16px;
	font-size: 20px;
	font-weight: bold;
	letter-spacing: -0.5px;
	word-break:keep-all;
}

.section{
	padding:40px; 
	margin:40px 0;
	@media screen and (max-width: 800px) {
		padding:20px; 
		margin:20px 0;
	}
}
.btw_flex{
	display: flex;
	align-items: center;
	justify-content: space-between;
}.top{align-items:flex-start}
.border_left{border-left:1px solid #eee}
.dummy{
	img{
		opacity: 0;
		border: 0;
	}
}
.searchImgList{
	display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px , 2fr));
    grid-gap: 4px;
	li{
		width: 100%;
	}
}
@keyframes ani {
	0%{opacity: 0;}
	100%{opacity: 1;}
}
`;
