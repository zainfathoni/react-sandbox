import React from 'react';

import base from '../base';

class StorePicker extends React.Component {
  constructor() {
    super();

    this.state = {
      stores: {}
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
          stores: data
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  goToStore(event) {
    event.preventDefault();
    // first grab the text from the box
    const storeId = this.storeInput.value;
    console.log(`Going to ${storeId}`);
    // second we're going to transition from / to /store/:storeId
    this.context.router.transitionTo(`/store/${storeId}`);
  }

  renderStore = (key) => {
    return (
      <li key={key}>{key} - {this.state.stores[key].name}</li>
    )
  }

  render() {
    // Any where else
    return (
      <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
        <h2>Pilih Toko</h2>
        <ul>
          {Object.keys(this.state.stores).map(this.renderStore)}
        </ul>
        <input type="text" required placeholder="Store Name" defaultValue={'ojek-belanja'} ref={(input) => { this.storeInput = input }}/>
        <button type="submit">Visit Store →</button>
      </form>
    )
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
