import React, { useEffect } from 'react'
import Sidebar from './Sidebar';
import './Dashboard.css'
import { Link, Navigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement,CategoryScale,LinearScale,PointElement, LineElement,Title, Tooltip,Legend,} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAdminProducts } from '../../actions/productAction';
import { allOrderAction } from '../../actions/orderAction';
import { allUserAction } from '../../actions/userAction';

ChartJS.register(
  CategoryScale,
  ArcElement,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const {user, isLoading, isAuthenticate} = useSelector(state=>state.userDetails);
  const {products, error} = useSelector(state=>state.products);
  const {orders} = useSelector(state=>state.allOrder.orders);
  const {users} = useSelector(state=>state.allUser.users);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(error){
      toast.error(error);
    }
    dispatch(getAdminProducts());
    dispatch(allOrderAction());
    dispatch(allUserAction());
  }, [dispatch, error])

  let outOfStock = 0; 
  let totalAmount = 0;

  products && products.forEach((product)=>{
    if(product.stock === 0){
      outOfStock++;
    }
  })

  orders && orders.forEach((order)=>{
    totalAmount += order.totalPrice;
  })

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [{
      label: "Total Amount",
      backgroundColor: ["tomato"],
      hoverBackgroundColor: ["rgb(197, 72, 49)"],
      data: [0, totalAmount]
    }]
  }
  const doughnutState = {
    labels: ["Out of Stocks", "In Stocks"],
    datasets: [{
      backgroundColor: ["#00A6B4", "#6800B4"],
      hoverBackgroundColor: ["#4B5000", "#35014F"],
      data: [outOfStock, products && products.length - outOfStock]
    }]
  }
  if(user.role !== "admin"){
    return <Navigate to="/login" />
  }

  return (
    <div className='dashboard'>
      <Sidebar />
      <div className="dashboardContainer">
          <h1>Dashboard</h1>
          <div className="dashboardSummary">
            <div>
              <p>
                Total Amount <br />${totalAmount}
              </p> 
            </div>
            <div className="dashboardSummary2">
              <Link to="/admin/products">
                <p>Products</p>
                <p>{products && products.length}</p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p>{orders && orders.length}</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>{users && users.length}</p>
              </Link>
            </div>
            <div className="lineChart">
              <Line 
                data={lineState}
              />
            </div>
            <div className="doughnut">
            <Doughnut 
              data={doughnutState}
            />
            </div>
          </div>
      </div>
    </div>
  )
}

export default Dashboard