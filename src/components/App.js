import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (newType) => {
    console.log("inside onChangeType", newType)
    this.setState({
      filters: {
        ...this.state.type,
        type: newType
      }
    })
  }

  onFindPetsClick = () => {
    console.log("in onFindPetsClick")
    let correctURL = '/api/pets'
    if(this.state.filters.type === 'all'){
      correctURL = '/api/pets' 
    } else if(this.state.filters.type === 'cat') {
      correctURL = '/api/pets?type=cat'
    } else if(this.state.filters.type === 'dog') {
      correctURL = '/api/pets?type=dog'
    } else if(this.state.filters.type === 'micropig') {
      correctURL = '/api/pets?type=micropig'
    }
    console.log("correctURL", correctURL)

    fetch(correctURL)
    .then(resp => resp.json())
    .then(pets => this.setState({pets}))
  }

  onAdoptPet = (id) => {
    console.log("inside onAdoptPet", id)
    const pets = this.state.pets.map(p => {
      return p.id === id ? { ...p, isAdopted: true } : p;
    });
    this.setState({ pets });
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onFindPetsClick={this.onFindPetsClick} pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
