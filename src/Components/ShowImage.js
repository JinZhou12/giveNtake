function Image({ image }) {
  return (
    <div>
      <img alt="" src={image.src} />
    </div>
  );
}

const ShowImage = ({ images }) => {
  const show = (image) => {
    return <Image image={image} />;
  };
  return <div className="container2">{images.map(show)}</div>;
};

export default ShowImage;
