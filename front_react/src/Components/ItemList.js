import React from 'react';
import Item from './Item';
import '../CSS/App.css';

const ItemList = ({ items }) => {
    return (
        <div className="list">
            {items.map((item) => (
                <Item item={item} />
            ))}
        </div>
    );
}

export default ItemList;