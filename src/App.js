import React from 'react';
import './App.css';
import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'
import Filter from './components/Filter'

class App extends React.Component{

  state = {
    display: false,
    toys: [],
    clicked: false,
    search: '',
    sort: '',
    min: 0,
    max: 99999
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  handleSearch = (input) => {
    let search = input.toLowerCase()
    this.setState({search})
  }

  handleFilter = (selected) => {
    let filter = parseInt(selected)
    if (filter === 2) {
      this.setState({
        min: 0,
        max: 2
      })
    } else if (filter === 5) {
      this.setState({
        min: 3,
        max: 5
      })
    } else if (filter === 0) {
      this.setState({
        min: 0,
        max: 9999
      })
    } else {
      this.setState({
        min: 6,
        max: 99999
      })
    }
  }

  handleSort = (sort) => {
    this.setState({sort})
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

  sortBy = () => {
    let toys = this.state.toys
    if (this.state.sort === 'alphabetically') {
      toys = toys.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    } else if (this.state.sort === 'likes') {
      toys = toys.sort((a,b) => (b.likes > a.likes) ? 1 : ((a.likes > b.likes) ? -1 : 0))
    }
    return toys
  }

  render(){
    const sort = this.sortBy().filter(t => t.name.toLowerCase().includes(this.state.search))
    const toys = sort.filter(t => t.likes <= this.state.max && t.likes >= this.state.min)
    return (
      <>
        <Header/>
        { this.state.display ? <ToyForm addToy={this.addToy}/> : null }
        <Filter handleSearch={this.handleSearch} handleSort={this.handleSort} sort={this.state.sort} handleFilter={this.handleFilter}/>
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer clicked={this.state.clicked} editClick={this.editClick} updateToy={this.updateToy} toys={toys} deleteToy={this.deleteToy} addLike={this.addLike}
        />
      </>
    );
  }

}

export default App;
