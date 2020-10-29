import React, { Component } from 'react';

class ToyCard extends Component {
  render() {
    // console.log(this.props);
    let { toy } = this.props;
    return (
      <div className='card'>
        <h2>{toy.name}</h2>
        <img src={toy.image} alt={toy.name} className='toy-avatar' />
        <p>{toy.likes} Likes </p>
        <button
          onClick={() => this.props.updateLikes(toy)}
          className='like-btn'
        >
          Like {'<3'}
        </button>
        <button
          onClick={() => this.props.deleteToy(toy.id)}
          className='del-btn'
        >
          Donate to GoodWill
        </button>
      </div>
    );
  }
}

export default ToyCard;
