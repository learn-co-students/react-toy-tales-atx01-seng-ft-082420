import React from "react";
import ToyCard from "./ToyCard";

//Functional component
const ToyContainer = (props) => {
  return (
    <div id="toy-collection">
    {/* Mapping through our array we passed as a prop */}
      {props.allToys.map((toy) => {
        {/* We want to return a toycard for each toy, passing it the toy and function props as well as setting a key */}
        return <ToyCard key={toy.id} toy={toy} backEndDelete={props.backEndDelete} frontEndLikePatch={props.frontEndLikePatch}/>;
      })}
    </div>
  );
};

export default ToyContainer;