import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './pages/Home/Home';
// import Login from './pages/Login';
import Join from './pages/Join/Join';
import Welcome from './pages/Welcome/Welcome';
import Order from './pages/Order/Order';
// import OrderDetail from './pages/OrderDetail';
// import OrderHistory from './pages/OrderHistory';
import OrderHistories from './pages/OrderHistories/OrderHistories';
// import All from './pages/All';
import CustomCursor from './components/layout/CustomCursor';

const App = () => {
  const location = useLocation();
  const noHeaderPaths: string[] = ['/login', '/join', '/all', '/welcome']; // Header를 숨길 경로들

  return (
    <>
      {!noHeaderPaths.includes(location.pathname) && <Header />}
      <CustomCursor />
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/login' element={<Login />} /> */}
        <Route path='/join' element={<Join />} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/order' element={<Order />} />
        <Route path='/orderhistories' element={<OrderHistories />} />
        {/* <Route path='/orderdetail' element={<OrderDetail />} />
        <Route path='/orderhistories/:id' element={<OrderHistory />} /> 
        <Route path='/all' element={<All />} /> */}
      </Routes>
    </>
  );
};

const Root = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default Root;
