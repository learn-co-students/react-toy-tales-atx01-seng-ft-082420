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

  componentDidMount(){
    fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(toys=> this.setState({allToys:toys}))
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  addNewToy = (toy) => {
    let allToys = this.state.allToys
    this.setState({
      allToys:[...allToys, toy]
    })
  }

  postNewToy=(toy)=>{
    fetch("http://localhost:3000/toys",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(toy)
    })
    .then(res => res.json())
    .then(newToy=> this.addNewToy(newToy))
  }
frontEndDelete=(toyId)=>{
let newToys = this.state.allToys.filter(toy=> toy.id != toyId)
this.setState({allToys: newToys})
}

backEndDelete=(toyId)=>{
    fetch(`http://localhost:3000/toys/${toyId}`,{
    method: "DELETE"
    })
    .then(res => res.json())
    .then(this.frontEndDelete(toyId))
  }

  frontEndLikePatch=(toy)=>{
    console.log(this.state.allToys)
    let allToys= this.state.allToys
    let thisToyIndex= allToys.indexOf(toy)
    ++ allToys[thisToyIndex].likes
    fetch(`http://localhost:3000/toys/${toy.id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(toy)
      })
      
      .then(this.setState({allToys: allToys}))
    
    //indexOf searches through an array
    //for the value you've given it
    //if that value exists it returns that value's index
    //else it returns -1
    //we have taken the allToys array found the index of that particular toy
    //and then access its likes key's value with .notation 
    //and finally increment that value
   
  }


  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
            
           <ToyForm postNewToy={this.postNewToy}/>
        
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer 
         allToys={this.state.allToys} 
       backEndDelete={this.backEndDelete}
       frontEndLikePatch={this.frontEndLikePatch}
        />
      </>
    );
  }

}

export default App;
