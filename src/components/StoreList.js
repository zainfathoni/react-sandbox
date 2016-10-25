import React from 'react';
import Loading from 'react-loading';

class StoreList extends React.Component {
  render() {
    const { keyword, stores } = this.props
    const storeIds = Object.keys(stores);

    // Render Loading Bars
    if (storeIds.length === 0) {
      return (
        <div className="loading-bars">
          <Loading type='bars' color='#000' />
        </div>
      )
    }
    
    const filteredStores = storeIds
      .filter(key => 
        stores[key].name.toLowerCase()
        .indexOf(keyword.toLowerCase()) !== -1)
      .reduce((res, key) =>
        Object.assign(res,
        { [key]: stores[key].name }), {});

    return (
      <div className="store-list">
        {Object.keys(filteredStores)
          .map(key =>
            <button key={key} onClick={(e) => this.props.goToStore(key)}>
              {filteredStores[key]} →
            </button>
          )
        }
      </div>
    )
  }
}

StoreList.propTypes = {
  stores: React.PropTypes.object.isRequired,
  keyword: React.PropTypes.string.isRequired,
  goToStore: React.PropTypes.func.isRequired
}

export default StoreList;
