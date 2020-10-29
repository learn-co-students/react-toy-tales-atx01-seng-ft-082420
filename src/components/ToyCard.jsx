import React, { Component } from 'react';

class ToyCard extends Component {

  render() {
    return (
      <div className="card">
        <h2>{this.props.name}</h2>
        <img src={this.props.img} alt={this.props.name} className="toy-avatar" />
        <p>{this.props.likes} Likes </p>
        <button onClick={() => this.props.addLike(this.props.toy)} className="like-btn">Like {'<3'}</button>
        <button onClick={() => this.props.deleteToy(this.props.id)} className="del-btn">Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
