import { useState } from 'react'
export default function FavoriteButton({ id }) { const [favorites,setFavorites]=useState([]);/* localStorage 저장 */return <button>찜하기</button> }
