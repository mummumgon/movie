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
	line-height: 1;
	background-color: ${props =>props.theme.bgColor};
	overflow-x: hidden;
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

.loding{
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
	text-align: center;
	font-size:30px;
	color: ${props =>props.theme.textColor};
}

/* swiper */
.swiper {overflow:unset}
.swiper-slide{
	width: 300px;
	height: 200px;
    color: red;
    font-size: 50px;
    overflow: hidden;
    padding: 0.1px;
	:hover{
		transform: scale(1.1) translateY(-10%);
        transition: transform 0.3s;
        height: auto;
        z-index: 10;
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
`;
