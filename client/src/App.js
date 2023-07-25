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
import Profile from './components/User/Profile';
import ProtectedRoute from './components/Route/ProtectedRoute';
import UpdateProfile from './components/User/UpdateProfile';
import ChangePassword from './components/User/ChangePassword';
import ForgetPassword from './components/User/ForgetPassword';
import ResetPassword from './components/User/ResetPassword';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import PaymentContainer from './components/Cart/PaymentContainer';
import OrderSuccess from './components/Cart/OrderSuccess';
import MyOrders from './components/Order/MyOrders';
import OrderDetails from './components/Order/OrderDetails';
import Dashboard from './components/Admin/Dashboard';
import ProductList from './components/Admin/ProductList';
import NewProduct from './components/Admin/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct';
import OrdersList from './components/Admin/OrdersList';
import UpdateOrder from './components/Admin/UpdateOrder';
import UserList from './components/Admin/UserList';
import UpdateUser from './components/Admin/UpdateUser';
import ReviewList from './components/Admin/ReviewList';
import NotFound from './components/NotFound/NotFound';

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
        <Route exact path='/' element={<Home />} />
        <Route exact path='/product/:id' element={<ProductDetails />} />
        <Route exact path='/products' element={<Products />} />
        <Route exact path='/products/:keyword' element={<Products />} />
        <Route exact path='/search' element={<Search />} />
        <Route exact path='/login' element={<LoginSignUp />} />
        <Route exact path='/login' element={<LoginSignUp />} />
        <Route exact path='/' element={<ProtectedRoute />}>
          <Route exact path='account' element={<Profile />} />
          <Route exact path='me/update' element={<UpdateProfile />} />
          <Route exact path='password/update' element={<ChangePassword />} />
          <Route exact path='shipping' element={<Shipping />} />
          <Route exact path='order/confirm' element={<ConfirmOrder />} />
          <Route exact path='payment/process' element={<PaymentContainer />} />
          <Route exact path='success' element={<OrderSuccess />} />
          <Route exact path='orders' element={<MyOrders />} />
          <Route exact path='order/:id' element={<OrderDetails />} />
          <Route exact path='admin/dashboard' element={<Dashboard />} />
          <Route exact path='admin/products' element={<ProductList />} />
          <Route exact path='admin/product' element={<NewProduct />} />
          <Route exact path='admin/product/:id' element={<UpdateProduct />} />
          <Route exact path='admin/orders' element={<OrdersList />} />
          <Route exact path='admin/order/:id' element={<UpdateOrder />} />
          <Route exact path='admin/users' element={<UserList />} />
          <Route exact path='admin/user/:id' element={<UpdateUser />} />
          <Route exact path='admin/reviews' element={<ReviewList />} /> 
        </Route> 
        <Route exact path="/password/forget" element={<ForgetPassword />} />
        <Route exact path="/password/reset/:token" element={<ResetPassword />} />
        <Route exact path='/cart' element={<Cart />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  ); 
}

export default App;
