import React,{useContext} from 'react'
import Navbar from './Navbar'
import { ClickedMovieContext } from './Contexts/ClickedMovieContext';


const ClickedShell = ({}) => {
  const { data } = useContext(ClickedMovieContext)
  console.log(data)
  return (
    <div>
      <Navbar/>
      <div>
        {data}
      </div>
    </div>
  )
}

export default ClickedShell