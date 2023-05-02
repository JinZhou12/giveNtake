import { useDropzone } from "react-dropzone";
import { Container } from "react-bootstrap";

function DropBox({ onDrop }) {
  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    open,
    isDragAccept,
    isFocused,
    isDragReject,
  } = useDropzone({
    accept: "image/*",
    onDrop,
    noClick: true,
    noKeyboard: true,
  });
  const lists = acceptedFiles.map((list) => (
    <li key={list.path}>
      {list.path} - {list.size} bytes
    </li>
  ));
  return (
    <>
      {" "}
      <section className="dropbox ph0">
        <Container
          className="dropbox flex-column justify-center"
          {...getRootProps({ isDragAccept, isFocused, isDragReject })}
        >
          <input {...getInputProps()} />
          <p className="b mb2">Drag 'n' drop some files here</p>
          <div className="h2">
            <button type="button" className="btnDrop" onClick={open}>
              Click to select file
            </button>
          </div>
        </Container>
      </section>
      <aside>
        <h4>Images</h4>
        <p>{lists}</p>
      </aside>
    </>
  );
}
export default DropBox;
