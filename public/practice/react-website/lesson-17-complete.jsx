import { useState } from 'react'
const readFavorites=()=>{try{return JSON.parse(localStorage.getItem('edu:favorites'))||[]}catch{return []}}
export default function FavoriteButton({ id }) { const [favorites,setFavorites]=useState(readFavorites);const saved=favorites.includes(id);const toggle=()=>setFavorites(current=>{const next=saved?current.filter(item=>item!==id):[...current,id];localStorage.setItem('edu:favorites',JSON.stringify(next));return next});return <button aria-pressed={saved} onClick={toggle}>{saved?'찜 해제':'찜하기'}</button> }
