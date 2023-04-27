import React, {useState} from 'react';
import '../CSS/ItemList.css';

const Item = (props) => {
    return (
        <div className="item">
          <img className='itemimg' src={props.item.image} alt={'nothing'} width='100%' height='200'/>
          <div className='fr'>
            <div style={{marginRight:10}}>{props.item.name}</div>
            <div>${props.item.price}</div>
          </div>
        </div>
    );
  }

const ItemList = (props) => {

    const itemPerPage = 20;
    const [page, setPage] = useState(1);

    return (
        <div className="list">
          {Object.keys(props.items).map((key) => {
            if (key < (page * itemPerPage) && key >= ((page - 1) * itemPerPage)){
              return <Item item={props.items[key]} key={key}/>
            }
          })}
        </div>
    );
}

export default ItemList;