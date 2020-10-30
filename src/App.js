import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    display: false,
    allToys: []
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  componentDidMount(){
    fetch("http://localhost:3000/toys")
    .then(res=>res.json())
    .then(toys => {
      this.setState({
        allToys: toys,
      })
    })
  }

  addNewToy = (newToy) => {
    console.log("submit")

    fetch("http://localhost:3000/toys", {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(newToy),
    })
    .then(res=>res.json())
    .then((toyObj) => {
      this.setState({
        allToys: [...this.state.allToys, toyObj],
      })
    })
  }

  deleteToy = (id) => {

    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'DELETE',
    })
    .then((res) => res.json())
    .then(() => {
      this.setState({
        allToys: this.state.allToys.filter(toy => toy.id != id)
      })
    })
  }

  updateLikes = (toy) => {
    // console.log("in the likes", id)
    ++toy.likes

    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(toy)
    
    })
    .then(res=> res.json())
    .then((toyObj) => {
      this.setState({
        allToys: this.state.allToys.map(toy => toy.id == toyObj.id ? toyObj : toy) 
      })
    })

  }

  
  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm addNewToy={this.addNewToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer allToys={this.state.allToys} deleteToy={this.deleteToy} updateLikes={this.updateLikes} />
      </>
    );
  }

}

export default App;
