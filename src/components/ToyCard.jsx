import React, { Component } from 'react';
import ToyEditForm from './ToyEditForm'

class ToyCard extends Component {

  handleClick = () => {
    this.props.editClick()
  }

  render() {
    const toy = this.props
    return (
      <div className="card">
        <h2>{toy.name}</h2>
        <img src={toy.img} alt={toy.name} className="toy-avatar" />
        <p>{toy.likes} Likes </p>
        <button onClick={() => toy.addLike(toy.toy)} className="like-btn">Like {'<3'}</button>
        <button onClick={() => toy.deleteToy(toy.id)} className="del-btn">Donate to GoodWill</button>
        {this.props.clicked ? null : <button onClick={this.handleClick} className="del-btn">Edit {toy.name}</button>}
        {this.props.clicked ?  <ToyEditForm updateToy={toy.updateToy} toy={toy.toy}/> : null}
      </div>
    );
  }
}

export default ToyCard;
