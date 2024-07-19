import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/layout/Header';
import Home from './pages/Home/Home';
// import Login from './pages/Login';
import Join from './pages/Join/Join';
import Welcome from './pages/Welcome/Welcome';
import Order from './pages/Order/Order';
// import OrderDetail from './pages/OrderDetail';
// import OrderHistories from './pages/OrderHistories';
// import OrderHistory from './pages/OrderHistory';

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/login' element={<Login />} /> */}
        <Route path='/join' element={<Join />} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/order' element={<Order />} />
        {/* <Route path='/orderdetail' element={<OrderDetail />} />
        <Route path='/orderhistories' element={<OrderHistories />} />
        <Route path='/orderhistories/:id' element={<OrderHistory />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
