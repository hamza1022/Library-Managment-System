import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {

    const navigate= useNavigate()

    const backClick = ()=>{
        console.log('Back clicked')
        navigate(-1)
    }
  return (
    <div>
    
    <div class="col-md-5">
            <div class="headingNot">404</div>
            <div class="textFont mt-4">
                <p>Ooops! <br/> Page Not Found
                </p>
                <p>
                    This page doesn't exist or was removed!
                    We suggest you to go back.
                </p>
            </div>
            <div class="buttonHome"> 
            <button  onClick={()=>backClick()} >
            Go Back

            </button>
            </div>
        </div>
    
    
    </div>
  )
}

export default NotFound