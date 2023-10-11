import {useContext} from 'react'
import {Cart} from './context/Context'
import SingleProduct from './SingleProduct';
import './style.css'
import Filter from './Filter'
function Home() {
  const {state:{products,},productState:{ byStock,byFastDelivery,byRating,sort,searchQuery} } = useContext(Cart);

  const transformProducts =()=>{
    let sortedProducts = products;
    if(sort){
      sortedProducts = sortedProducts.sort((a,b)=>{
        return sort === 'lowToHigh' ? a.price-b.price : b.price-a.price
      });
    }
    if(!byStock){
      sortedProducts = sortedProducts.filter((prod)=> prod.instock);
    }
    if(byFastDelivery){
      sortedProducts = sortedProducts.filter((prod)=>prod.fastDelivery)
    }
    if(byRating){
      sortedProducts = sortedProducts.filter((prod)=>prod.rating>=byRating)
    }
    if(searchQuery){
      sortedProducts = sortedProducts.filter((prod)=>prod.name.toLowerCase().includes(searchQuery))
    }

    return sortedProducts;
  }

  // console.log(transformProducts(),'this is transformed fun',byStock,byFastDelivery,byRating,sort,searchQuery)

  return (
    <div className='home'>
      <Filter/>
      <div className='productContainer'>
        {
          transformProducts().map((prod)=>{
            return <SingleProduct key={prod.id} prod={prod}/>
          })
        }
      </div>
    </div>
  )
}

export default Home