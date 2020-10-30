import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  console.log("this is working", props.toys)
  return (
    <div id="toy-collection">
      {props.toys.map(toy => {
        return (
          <ToyCard 
            toy = {toy}
            key = {toy.id}
            name = {toy.name}
            image = {toy.image}
            likes = {toy.likes}
            updateLikes = {props.updateLikes}
            donateToy = {props.donateToy}
          />
        )
      })}
      {/* <ToyCard updateLikes = {props.updateLikes}/> */}
    </div>
  )
}

export default ToyContainer;
