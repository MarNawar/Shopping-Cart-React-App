import { useContext } from 'react'
import { Card, Button } from 'react-bootstrap'
import Rating from './Rating'
import { Cart } from './context/Context'


function SingleProduct({ prod }) {
  const { state: { cart }, dispatch } = useContext(Cart);
  return (
    <div className='products'>
      <Card>
        <Card.Img variant='top' src={prod.image} alt={prod.name} />

        <Card.Body>
          <Card.Title>{prod.name}</Card.Title>

          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>
              $ {prod.price.split('.')[0]}
            </span>

            {prod.fastDelivery ? (
              <div>Fast Delivery</div>
            ) : (
              <div>4 Days Delivery</div>
            )}

            <Rating rating={prod.rating} />
          </Card.Subtitle>
          
          {
            cart.some(p => p.id === prod.id) ? (
              <Button variant='danger' onClick={() => {
                dispatch({
                  type: 'REMOVE_FROM_CART',
                  payload: prod,
                })
              }}>
                Remove From Cart
              </Button>
            ) : (
              <Button disabled={!prod.instock} onClick={() => {
                dispatch({
                  type: 'ADD_TO_CART',
                  payload: prod,
                });
              }}>
                Add to Cart
              </Button>
            )
          }
        </Card.Body>
      </Card>
    </div>
  )
}

export default SingleProduct