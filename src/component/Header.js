import React from 'react';

function Header(props) {
  return (
    <>
      <header className='header'>
        <h1>
        <img src={`${process.env.PUBLIC_URL}/images/LUSH_logo.png`} alt="상단로고"></img>
        </h1>
        </header> 
    </>
  );
}

export default Header;