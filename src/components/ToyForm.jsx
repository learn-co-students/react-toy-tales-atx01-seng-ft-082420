import React, { Component } from 'react';

class ToyForm extends Component {

  state={
    name:" ",
    image:" ",
    likes: 0

  }

  stateChange(key, newValue){
    this.setState({
      [key]: newValue
    })
  }

  submitForm=(e)=>{
    e.preventDefault()
    this.props.postNewToy(this.state)
  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={(e)=>this.submitForm(e)}>
          <h3>Create a toy!</h3>
          <input
           type="text"
            name="name"
             placeholder="Enter a toy's name..."
              className="input-text"
              onChange= {(e)=>this.stateChange(e.target.name, e.target.value)}
              />
          <br/>
          <input type="text" 
          name="image"
           placeholder="Enter a toy's image URL..." 
           className="input-text"
           onChange= {(e)=>this.stateChange(e.target.name, e.target.value)}
           />
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
