import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  
  console.log(props)

  return( 
    <div id="toy-collection">
      {props.toys.map(toy => 
        <ToyCard id={toy.id} key={toy.id} name={toy.name} image={toy.image} likes={toy.likes} deleteToy={props.deleteToy} updateLikes={props.updateLikes}/>
      )}
    </div>
  )
    
}


export default ToyContainer;
