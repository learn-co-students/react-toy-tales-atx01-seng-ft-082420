import React, { Component } from 'react';

class ToyForm extends Component {

  constructor() {
    super()

    this.state = {
      name: "",
      image: "",
      likes: 0
    }
  }

  handleSubmit = (e) => {
   e.preventDefault()
   this.props.addToy(this.state)
  }

  handleChange = (e) => {
    let {name, value} = e.target
    this.setState ({
      [name]: value
    })
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="add-toy-form">
          <h3>Create a toy!</h3>
          <input onChange={this.handleChange} type="text" name="name" placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input onChange={this.handleChange} type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
