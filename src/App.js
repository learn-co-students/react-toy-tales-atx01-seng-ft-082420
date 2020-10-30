import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    display: false,
    toys: []
  }

  componentDidMount() {
    fetch("http://localhost:3000/toys")
      .then(res => res.json())
      .then(
        toys => {
          this.setState({
            toys: toys
          });
          
        }
      )
  }


  



  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  addToy = (toy) => {
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(toy)
    })
    .then(res => res.json())
    .then(newToy => {
      this.setState({
        toys: [...this.state.toys, newToy],
        display: !this.state.display
      })
    })
  }

  deleteToy = (id) => {
    // console.log(id)
    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => {
      this.setState({
        toys: this.state.toys.filter(toy => toy.id !== id)
      })
    })
  }

  updateLikes = (toy) => {
    console.log(toy)
    let likes = toy.likes + 1
    // console.log(toy.likes)
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: likes
      })
    })
    .then(res => res.json())
    .then(newLikes => {
      console.log(newLikes)
      this.setState({
        toys: this.state.toys.map(toy =>
          toy.id === newLikes.id ? newLikes : toy
        )
      })
    })
  }


  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm addToy={this.addToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} deleteToy={this.deleteToy} updateLikes={this.updateLikes}/>
      </>
    );
  }
  
}

export default App;
