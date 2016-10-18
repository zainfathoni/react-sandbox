import React from 'react';

import base from '../base';
import StoreList from './StoreList';

class StorePicker extends React.Component {
  constructor() {
    super();

    this.state = {
      stores: {},
      keyword: ''
    }
  }

  /*** Component Life Cycle ***/

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

  /*** Methods ***/

  updateKeyword = (keyword) => {
    this.setState({
      keyword
    })
  }

  goToStore = (storeId) => {
    console.log(`Going to ${storeId}`);
    this.context.router.transitionTo(`/store/${storeId}`);
  }

  /*** Render ***/

  render() {
    const { stores, keyword } = this.state;

    return (
      <div className="store-selector">
        <h2>Pilih Toko</h2>
        <input
          type="text"
          required placeholder="Nama Toko" 
          value={keyword} 
          onChange={(e) => this.updateKeyword(e.target.value)}
        />
        <StoreList
          stores={stores}
          keyword={keyword}
          goToStore={this.goToStore}
        />
      </div>
    )
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
