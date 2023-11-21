import './App.css';
import Header from './components/Header';
import {BrowserRouter as Router, Route ,Routes} from 'react-router-dom'
import Home from './components/Home';
import CartItem from './components/CartItem';
function App() {
  return (
    <Router>
      <div className="app">
        {/* <Header/> */}
        <Routes>
          <Route exact path ='/' element={
            <>
              <Header/>
              <Home />
            </>
          }></Route>
          <Route exact path ='/cart' element={
            <>
              <Header/>
              <CartItem />
            </>
          }></Route>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
