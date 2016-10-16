import React from 'react';

const Header = (props) => {
  return (
    <header className="top">
      <h1>
        Ojek
        <span className="ofThe">
          <span className="of">RT 05</span>
          <span className="the">RW 14</span>
        </span>
        Belanja
      </h1>
      <h3 className="tagline"><span>{props.tagline}</span></h3>
    </header>
  )
}

Header.propTypes = {
  tagline: React.PropTypes.string.isRequired
}

export default Header;
