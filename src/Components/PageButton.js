import "../CSS/PageButton.css";

const PageButton = (props) => {
  return (
    <div
      className={
        props.selected
          ? "pageSelected Button pageButton b flex justify-center items-center"
          : "Button pageButton flex justify-center items-center"
      }
      onClick={props.onPress}
    >
      {props.text}
    </div>
  );
};

export default PageButton;
