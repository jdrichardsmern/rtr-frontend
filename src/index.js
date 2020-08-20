import React from 'react';
import ReactDom from 'react-dom';
import App from './App';

const Me = () => {
  return <div>Here I am</div>;
};

ReactDom.render(<Me />, document.getElementById('root'));
