import React from 'react';
import '../CSS/Item.css';

const Item = ({ item }) => {
  return (
    <div className="item">
      <img src={item.image} alt={'nothing'} width='100%' height='200'/>
      <div>{item.name}</div>
      <div>{item.price}</div>
    </div>
  );
}

export default Item;