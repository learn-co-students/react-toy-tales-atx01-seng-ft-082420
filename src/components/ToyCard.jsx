import React, { Component } from 'react';

class ToyCard extends Component {

  render() {

    let {toy} = this.props

    return (
      <div className="card">
        <h2>{toy.name}</h2>
        <img src={toy.image} alt={toy.name} className="toy-avatar" />
        <p>{toy.likes} Likes </p>
        <button className="like-btn" onClick = {()=>this.props.updateLikes(toy)}>Like {'<3'}</button>
        <button className="del-btn" onClick = {()=>this.props.deleteToy(toy.id)}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
