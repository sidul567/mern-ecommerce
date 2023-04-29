import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';

import Header from './components/layout/Header/Header';
import { useEffect } from 'react';
import webfontloader from 'webfontloader'
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home';
import Toaster from './components/Toaster/Toaster';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products';
import Search from './components/Product/Search';
import LoginSignUp from './components/User/LoginSignUp';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser } from './actions/userAction';
import UserOptions from './components/layout/Header/UserOptions';

function App() {
  const {isAuthenticate, error, user} = useSelector(state=>state.userDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    webfontloader.load({
      google: {
        'families': ['Roboto','Quicksand', 'Sans-Serif']
      }
    })

    dispatch(loadUser());
  },[dispatch])

  useEffect(()=>{
    if(error){
      dispatch(clearErrors());
    }
  }, [dispatch, error])

  return (
    <Router>
      <Toaster />
      <Header />
      {isAuthenticate && <UserOptions user={user} />}
      <Routes>
        <Route exact path='/' Component={Home} />
        <Route exact path='/product/:id' Component={ProductDetails} />
        <Route exact path='/products' Component={Products} />
        <Route exact path='/products/:keyword' Component={Products} />
        <Route exact path='/search' Component={Search} />
        <Route exact path='/login' Component={LoginSignUp} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
