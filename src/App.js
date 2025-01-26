import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/LandingPage/Home';
import LoginForm from './components/LoginForm';
import Signup from './components/SignUpForm';
import UserHome from './components/UserComponents/UserHome';
import ProfileComponent from './components/UserComponents/UserProfile';
import PaymentsHistoryComponent from './components/UserComponents/UserPaymentsHistory/PaymentsHistory';
import PaymentsComponent from './components/UserComponents/UserPayments/Payments';
import PaymentDetails from './components/UserComponents/UserPaymentDetails';
import UploadPaymentComponent from './components/UserComponents/UploadPayment';
import ProtectedRoute from './components/UserComponents/ProtectRoute'; // Import the ProtectedRoute component

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/user/login' element={<LoginForm />} />
        <Route path='/user/signup' element={<Signup />} />

        {/* Protected Routes */}
        <Route path='/user/payments' element={<ProtectedRoute><PaymentsComponent /></ProtectedRoute>} />
        <Route path='/user/paymentDetails/:paymentId' element={<ProtectedRoute><PaymentDetails /></ProtectedRoute>} />
        <Route path='/user/addPayment' element={<ProtectedRoute><UploadPaymentComponent /></ProtectedRoute>} />
        <Route path='/user/paymentsHistory' element={<ProtectedRoute><PaymentsHistoryComponent /></ProtectedRoute>} />
        <Route path='/user/profile' element={<ProtectedRoute><ProfileComponent /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}
export default App;
