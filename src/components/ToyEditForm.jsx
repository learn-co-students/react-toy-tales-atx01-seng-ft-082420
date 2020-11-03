import React, { Component } from 'react';

class ToyEditForm extends Component {

    state = {
        id: this.props.toy.id,
      name: this.props.toy.name,
      image: this.props.toy.image,
      likes: this.props.toy.likes
    }

  handleSubmit = (e) => {
   e.preventDefault()
   this.props.updateToy(this.state)
  }

  handleChange = (e) => {
    let {name, value} = e.target
    this.setState ({
      [name]: value
    })
  }

  render() {
      const toy = this.props.toy
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="add-toy-form">
        <h3>Edit {toy.name}!</h3>
          <input onChange={this.handleChange} type="text" name="name" value={this.state.name} className="input-text"/>
          <br/>
          <input onChange={this.handleChange} type="text" name="image" value={this.state.image} className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Edit Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyEditForm;