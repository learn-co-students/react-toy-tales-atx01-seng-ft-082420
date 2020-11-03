import React from 'react';
import './App.css';
import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

class App extends React.Component{

  state = {
    display: false,
    toys: [],
    clicked: false
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  componentDidMount() {
    fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toys => {
      this.setState({
        toys: toys
      })
    })
  }

  editClick = () => {
    this.setState({clicked: !this.state.clicked})
  }

  addToy = (toy) => {
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body: JSON.stringify(toy)
    })
    .then(res => res.json())
    .then(newToy => {
      this.setState({
        toys: [...this.state.toys, newToy]
      })
      this.handleClick()
    })
  }

  updateToy = (toy) => {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body: JSON.stringify(toy)
    })
    .then(res => res.json())
    .then(newToy => {
      this.setState ({
        toys: this.state.toys.map(toy => toy.id === newToy.id ? newToy : toy),
        clicked: !this.state.clicked
      })
    })
  }

  deleteToy = (id) => {
    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'DELETE'
    })
    .then(
      this.setState({
        toys: this.state.toys.filter(toy => toy.id !== id)
      })
    )
  }

  addLike = (toy) => {
    ++toy.likes
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body: JSON.stringify({
        likes: toy.likes
      })
    })
    .then(res => res.json())
    .then(newToy => {
      this.setState ({
        toys: this.state.toys.map(toy => toy.id === newToy.id ? newToy : toy)
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
        <ToyContainer clicked={this.state.clicked} editClick={this.editClick} updateToy={this.updateToy} toys={this.state.toys} deleteToy={this.deleteToy} addLike={this.addLike}
        />
      </>
    );
  }

}

export default App;
