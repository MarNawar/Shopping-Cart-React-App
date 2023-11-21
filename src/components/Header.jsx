import { useContext } from 'react'
import { Container, Navbar, Nav, FormControl, Dropdown, Badge, Button } from 'react-bootstrap'
import { FaCartShopping } from 'react-icons/fa6'
import { Cart } from './context/Context'
import { AiFillDelete } from 'react-icons/ai'
import "./style.css";
import { Link } from 'react-router-dom'

function Header() {
  const { state: { cart }, dispatch, productDispatch } = useContext(Cart);

  return (
    <Navbar bg="dark" varient="dark" style={{ height: 80 }}>
      <Container>

        <Navbar.Brand>
          <Link to="/">Shopping Cart</Link>
        </Navbar.Brand>

        <Navbar.Text className='search'>
          <FormControl
            style={{ width: 500 }}
            placeholder='search a product'
            className='m-auto'
            onChange={(e) => {
              productDispatch({
                type: 'FILTER_BY_SEARCH',
                payload: e.target.value
              })
            }}
          />
        </Navbar.Text>

        <Nav>
          <Dropdown align='end'>
            <Dropdown.Toggle variant="success" style={{ minWidth: 190 }}>
              <FaCartShopping color='white' fontSize='25px' />
              <Badge bg="none">{cart.length}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: 370 }}>
              {cart.length > 0 ? (
                <>
                  {
                    cart.map((prod) => (
                      <span key={prod.id} className='cartitem'>
                        <img
                          src={prod.image}
                          className='cartItemImg'
                          alt={prod.name}
                        />

                        <div className='cartItemDetail'>
                          <span>{prod.name}</span>
                          <span>${prod.price.split('.')[0]}</span>
                        </div>

                        <AiFillDelete
                          fontSize='20px'
                          style={{ cursor: 'pointer' }}
                          onClick={() =>
                            dispatch({
                              type: 'REMOVE_FROM_CART',
                              payload: prod,
                            })
                          }
                        />
                      </span>
                    ))
                  }

                  <Link to='/cart'>
                    <Button style={{ width: '95%', margin: '0 10px' }}> Go To Cart</Button>
                  </Link>
                </>
                )
                : (
                  <Dropdown.ItemText style={{ padding: 10 }}>
                    Cart is Empty!
                  </Dropdown.ItemText>
                )}

            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header