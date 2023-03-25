import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import "../CSS/Categories.css"

const Categories = () => {
    return (
        <div className='categories'>
          <Navbar bg="lg" variant="lg">
            <Nav className="me-auto">
              <Nav.Link href="#clothes">Clothes</Nav.Link>
              <Nav.Link href="#shoes">Shoes</Nav.Link>
            </Nav>
            <Form className='searchBar'> 
              <Form.Control placeholder="Search"/>
            </Form>
          </Navbar>
        </div>
    )
}

export default Categories;