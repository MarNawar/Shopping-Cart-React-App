import {createContext, useReducer} from 'react'
import { faker } from '@faker-js/faker'
import {cartReducer,productReducer} from './Reducers'


export const Cart = createContext();

faker.seed(99);
function Context({children}) {
  const products = [...Array(21)].map(()=>({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.url(),
    instock: faker.helpers.arrayElement([0,3,5,6,7]),
    fastDelivery: faker.datatype.boolean(),
    rating: faker.helpers.arrayElement([0,3,5,6,7]),

  }))

  const [state,dispatch] = useReducer(cartReducer,{
    products,
    cart:[]
  },)

  const [productState,productDispatch] = useReducer(productReducer,{
    byStock:false,
    byFastDelivery:false,
    byRating:0,
    searchQuery:"",
  },)

  return (
    <Cart.Provider value={{
      state,dispatch,productDispatch,productState
    }}>
      {children}
    </Cart.Provider>
  )
}

export default Context

// export const cartState =()=>{
//   return useContext(Cart)
// }