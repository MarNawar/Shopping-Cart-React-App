import {useContext,useState} from 'react'
import {Cart} from './context/Context'
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import { AiFillDelete } from 'react-icons/ai';

function CartItem() {
  const [total,setTotal] = useState()
  const {state:{cart},dispatch } = useContext(Cart);
  useEffect(()=>{
    setTotal(cart.reduce((acc,curr)=>acc+=parseInt(curr.price)*(curr.qty),0))
  },[cart])

  return (
    <div className='home'>
      <div className='productContainer'>
        <ListGroup>
          {
            cart.map(prod=>(
              <ListGroup.Item key={prod.id}>
                <Row>
                  <Col md={2}>
                    <Image src={prod.image} alt={prod.name} fluid rounded/>
                  </Col>
                  {/* <Col md={2}>
                    <Image src={prod.image} alt={prod.name} />
                  </Col> */}
                  <Col md={2}>
                    <span>{prod.name}</span>
                  </Col>
                  <Col md={2}>$ {prod.price}
                  </Col>
                  <Col md={2}>
                    <Rating rating = {prod.rating}/>
                  </Col>
                  <Col md={2}>
                    <Form.Control 
                      as='select' 
                      value={prod.qty}
                      onChange={(e)=>
                        dispatch({
                          type:'CHANGE_CART_QTY',
                          payload:{
                            id:prod.id,
                            qty:e.target.value,
                          }
                        })
                      }
                    >
                      {[...Array(prod.instock).keys()].map((x)=>(
                        <option key={x+1}>{x+1}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={()=>dispatch({
                        type:"REMOVE_FROM_CART",
                        payload:prod,
                      })}
                    >
                      <AiFillDelete fontSize='20px'/>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))
          }
        </ListGroup>
      </div>
      <div className='filters summary'>
        <span className='title'> Subtotal({cart.length}) items</span>
        <span style={{fontWeight:700, fontSize:20}}> Total: ${total} </span>
        <Button type='button' disabled={cart.length===0}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  )
}

export default CartItem