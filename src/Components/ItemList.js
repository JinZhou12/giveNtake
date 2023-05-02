import React, { useEffect, useState } from "react";
import domtoimage from "dom-to-image";
import PageButton from "./PageButton";
import ToggleButton from "react-bootstrap/ToggleButton";
import "../CSS/ItemList.css";
import { Button } from "react-bootstrap";

const Item = (props) => {
  let photo = JSON.parse(props.item.photo).src;
  return (
    <div className="item flex-column">
      <img
        className="itemimg"
        src={photo}
        alt={"nothing"}
        width="100%"
        height="200"
      />
      <div className="">
        <div className="flex items-center justify-center mt2 b">
          {props.item.title}
        </div>
        <div className="flex items-center justify-center">
          ${props.item.price}
        </div>
        {/* <div>
          <Button variant="detail">Detail</Button>
        </div> */}
      </div>
    </div>
  );
};

const ItemList = (props) => {
  const items = props.items;
  const itemPerPage = 30;
  const [page, setPage] = useState(1);
  const [items, setItems] = useState("");
  const numPages = Math.ceil(Object.keys(items).length / itemPerPage);
  const pages = Array.from(Array(numPages).keys());

  useEffect(() => {
    fetch("http://localhost:4000/display_items", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: "" }),
    })
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      });
  }, []);

  return (
    <div className="flex-column">
      <div className="list">
        {Object.keys(items).map((key) => {
          if (key < page * itemPerPage && key >= (page - 1) * itemPerPage) {
            return <Item item={items[key]} key={key} />;
          }
        })}
      </div>
      <div className="flex justify-center">
        <div className="flex pageButtons justify-around items-center w-30">
          <PageButton
            text="Prev"
            onPress={() => {
              setPage(Math.max(page - 1, 1));
            }}
          />
          {pages.map((key) => {
            return (
              <PageButton
                selected={key + 1 === page}
                key={key}
                text={key + 1}
                onPress={() => {
                  setPage(key + 1);
                }}
              />
            );
          })}
          <PageButton
            text="Next"
            onPress={() => {
              setPage(Math.min(page + 1, numPages));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemList;
