import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  return(
    <div id="toy-collection">
      {props.toys.map(toy => (
        <ToyCard toy={toy} key={toy.id} id={toy.id} name={toy.name} img={toy.image} likes={toy.likes} deleteToy={props.deleteToy} addLike={props.addLike}
        updateToy={props.updateToy} clicked={props.clicked} editClick={props.editClick}/>
      ))}
    </div>
  );
}

export default ToyContainer;
