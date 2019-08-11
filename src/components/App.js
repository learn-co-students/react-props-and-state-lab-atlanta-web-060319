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






  onChangeType = (e) => {
    this.setState({
      filters: {...this.state.filters,
      type: e.target.value
      }
    })
  }


  onFindPetsClick = (e) => {
    let filter = this.state.filters.type
    const PETS_URL = `/api/pets`
    const q = `?type=`
    if (filter === 'cat'){
      // make a fetch request for cats
      fetch(PETS_URL + q + filter)
      .then(res => res.json())
      .then(pets => this.setState({
        pets: pets
      }))
    } else if (filter === 'dog'){
      // make fetch request for dogs
      fetch(PETS_URL + q + filter)
      .then(res => res.json())
      .then(pets => this.setState({
        pets: pets
      }))
    } else if (filter === 'micropig'){
      // make fetch request for micropigs
      fetch(PETS_URL + q + filter)
      .then(res => res.json())
      .then(pets => this.setState({
        pets: pets
      }))
    } else {
      // make fetch request for 'all'
      fetch(PETS_URL)
      .then(res => res.json())
      .then(pets => this.setState({
        pets: pets
      }))
    }
  }

  onAdoptPet = (id) => {
     const pets = this.state.pets.map(pet =>{
       return pet.id === id ? {...pet, isAdopted: true} : pet;
     });
     this.setState({
       pets
     })
      
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
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
