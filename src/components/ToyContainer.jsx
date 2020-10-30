import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  return(
    <div id="toy-collection">
      {/* Render the collection of ToyCards */}
      {props.allToys.map(toy => {
        return <ToyCard toy={toy} key={toy.id} deleteToy={props.deleteToy} updateLikes={props.updateLikes}/>
      } )}
    </div>
  );
}

export default ToyContainer;
