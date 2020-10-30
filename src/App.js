import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

const url = "http://localhost:3000/toys/"

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      display: false,
      allToys: []
    }
  }

  componentDidMount() {
    fetch(url)
      .then(res => res.json())
      .then(toys => {
        this.setState({
          allToys: toys
        });
      })
  }

  addNewToy = (toyObj) => {
    console.log(toyObj)
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(toyObj)
    })
      .then((res) => res.json())
      .then((newToy) => {
        console.log("Server Response", newToy)
        this.setState({
          allToys: [...this.state.allToys, newToy]
        })
      })
  }

  
  updateLikes = (chosenToy) => {
    // ++chosenToy.likes
    // console.log(chosenToy.likes)
    fetch(`http://localhost:3000/toys/${chosenToy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "likes": ++chosenToy.likes
      })
    })
      .then(res => res.json())
      .then(updatedToy => this.setState({ 
        likes: updatedToy.likes
      }))
  } 


  donateToy = (id) => {
    console.log("this will delete toy id ->", id)

    fetch(url + id, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then((data) => {
        this.setState({
          allToys: this.state.allToys.filter((toy) => toy.id !== id)
        })
      })
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }


  render() {
    return (
      <>
        <Header />
        { this.state.display
          ?
          <ToyForm addNewToy={this.addNewToy} />
          :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.allToys} updateLikes={this.updateLikes} donateToy={this.donateToy} />
      </>
    );
  }

}

export default App;
