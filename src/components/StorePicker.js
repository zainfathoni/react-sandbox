import React from 'react';
import Loading from 'react-loading';

import base from '../base';

class StorePicker extends React.Component {
  constructor() {
    super();

    this.state = {
      stores: {},
      filteredStores: [],
      keyword: 'ojek-belanja'
    }
  }

  componentWillMount() {
    // Fetch Stores
    base
      .fetch(`/stores`, {
        context: this
      })
      .then(data => {
        console.log(data);
        this.setState({
          stores: data,
          filteredStores: Object.keys(data)
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  filterStores = (keyword) => {
    const filteredStores = Object
      .keys(this.state.stores)
      .filter(storeName => storeName.indexOf(keyword) !== -1);
    console.log(filteredStores);
    this.setState({
      filteredStores,
      keyword
    })
  }

  goToStore(event) {
    event.preventDefault();
    // first grab the text from the box
    const storeId = this.storeInput.value;
    console.log(`Going to ${storeId}`);
    // second we're going to transition from / to /store/:storeId
    this.context.router.transitionTo(`/store/${storeId}`);
  }

  renderButtonStore = (key) => {
    return (
      <button key={key} onClick={(e) => this.context.router.transitionTo(`/store/${key}`)}>{this.state.stores[key].name}</button>
    )
  }

  render() {
    // Any where else
    return (
      <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
        <h2>Pilih Toko</h2>
        <input
          type="text"
          required placeholder="Store Name" 
          value={this.state.keyword} 
          ref={(input) => { this.storeInput = input }}
          onChange={(e) => this.filterStores(e.target.value)}
        />
        {this.state.filteredStores.map(this.renderButtonStore)}
        <button type="submit">Visit Store →</button>
      </form>
        <Loading type='bars' color='#000' />
    )
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
