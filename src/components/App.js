import React from 'react';

import Filters from './Filters';
import PetBrowser from './PetBrowser';

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    };
  }

  onChangeType = value => {
    this.setState({ filters: { ...this.state.filters, type: value } });
  };

  onFindPetsClick = () => {
    fetch(
      this.state.filters.type === "all"
        ? `/api/pets`
        : `/api/pets?type=${this.state.filters.type}`
    )
      .then(this.parseJSON)
      .then(json => this.setState({ pets: json }));
  };

  parseJSON = response => {
    return response.json();
  };

  onAdoptPet = petId => {
    this.setState({
      pets: this.state.pets.map(pet =>
        pet.id === petId ? { ...pet, isAdopted: true } : pet
      )
    });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App
