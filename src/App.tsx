import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Join from './pages/Join/Join';
import All from './pages/All/All';
import Welcome from './pages/Welcome/Welcome';
import Order from './pages/Order/Order';
import OrderDetail from './pages/OrderDetail/OrderDetail';
import OrderHistory from './pages/OrderHistory/OrderHistory';
import OrderHistories from './pages/OrderHistories/OrderHistories';
import Community from './pages/Community/Community';
import CustomCursor from './components/layout/CustomCursor';
import LoginRedirect from './pages/Login/LoginRedirect';

const App = () => {
  const location = useLocation();
  const noHeaderPaths: string[] = ['/login', '/join', '/all', '/welcome']; // Header를 숨길 경로들

  return (
    <>
      {!noHeaderPaths.includes(location.pathname) && <Header />}
      <CustomCursor />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/loginredirect' element={<LoginRedirect />} />
        <Route path='/join' element={<Join />} />
        <Route path='/all' element={<All />} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/order' element={<Order />} />
        <Route path='/orderdetail' element={<OrderDetail />} />
        <Route path='/orderhistories' element={<OrderHistories />} />
        <Route path='/orderhistories/:id' element={<OrderHistory />} />
        <Route path='/Community' element={<Community />} />
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
