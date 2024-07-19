import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './Header';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Join from './pages/Join';
// import Welcome from './pages/Welcome';
// import Order from './pages/Order';
// import OrderDetail from './pages/OrderDetail';
// import OrderHistories from './pages/OrderHistories';
// import OrderHistory from './pages/OrderHistory';
import All from './pages/All/All';

function App() {
  return (
    <Router>
      {/* <Header /> */}

      <Routes>
        {/* <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/join' element={<Join />} /> */}
        <Route path='/all' element={<All />} />
        {/* <Route path='/welcome' element={<Welcome />} />
        <Route path='/order' element={<Order />} />
        <Route path='/orderdetail' element={<OrderDetail />} />
        <Route path='/orderhistories' element={<OrderHistories />} />
        <Route path='/orderhistories/:id' element={<OrderHistory />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
