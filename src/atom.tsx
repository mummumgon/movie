import { atom } from "recoil";
import { IMovie } from "./Inter";

export const movieState = atom({
    key: 'movie',
    default: [], 
  });

export const hamberger = atom<string>({
    key:'hmenu',
    default:'100%'
});

export const resize = atom<number>({
    key:'window',
    default:0
});

export const allCon = atom<IMovie[]>({
    key:'contents',
    default:[]
});
export const modalState = atom<boolean>({
    key:'modal',
    default:false,
});
