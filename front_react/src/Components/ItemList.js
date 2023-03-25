import React from 'react';
import '../CSS/App.css';
import '../CSS/ItemList.css';

const Item = (props) => {
    return (
        <div className="item">
          <img src={props.item.image} alt={'nothing'} width='100%' height='200'/>
          <div>{props.item.name}</div>
          <div>{props.item.price}</div>
        </div>
    );
  }

const ItemList = (props) => {
    return (
        <div className="list">
          {props.items.map((item) => (
            <Item item={item} />
          ))}
        </div>
    );
}

export default ItemList;