import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/LandingPage/Home';
import LoginForm from './components/LoginForm';
import Signup from './components/SignUpForm';
// import UserHome from './components/UserComponents/UserHome';
import ProfileComponent from './components/UserComponents/UserProfile';
import PaymentsHistoryComponent from './components/UserComponents/UserPaymentsHistory/PaymentsHistory';
import PaymentsComponent from './components/UserComponents/UserPayments/Payments';
import PaymentDetails from './components/UserComponents/UserPaymentDetails';
import UploadPaymentComponent from './components/UserComponents/UploadPayment';
import ProtectedRoute from './components/UserComponents/ProtectRoute'; // Import the ProtectedRoute component
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import AdminLoginForm from './components/AdminComponents/AdminLogin';
import AdminDashBoard from './components/AdminComponents/AdminDashBoard';
import StudentsTable from './components/AdminComponents/Students';
import PaymentsTable from './components/AdminComponents/Payments';
import AdminPaymentDetails from './components/AdminComponents/AdminPaymentDetails';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/user/login' element={<LoginForm />} />
        <Route path='/admin/login' element={<AdminLoginForm />} />
        <Route path='/user/signup' element={<Signup />} />
        <Route path='/user/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} /> {/* Updated route */}
        {/* Protected Routes */}
        <Route path='/user/payments' element={<ProtectedRoute><PaymentsComponent /></ProtectedRoute>} />
        <Route path='/user/paymentDetails/:paymentId' element={<ProtectedRoute><PaymentDetails /></ProtectedRoute>} />
        <Route path='/user/addPayment' element={<ProtectedRoute><UploadPaymentComponent /></ProtectedRoute>} />
        <Route path='/user/paymentsHistory' element={<ProtectedRoute><PaymentsHistoryComponent /></ProtectedRoute>} />
        <Route path='/user/profile' element={<ProtectedRoute><ProfileComponent /></ProtectedRoute>} />
        <Route path='/admin/dashboard' element={<AdminDashBoard/>}/>
        <Route path='/admin/students' element={<StudentsTable/>}/>
        <Route path='/admin/payments' element={<PaymentsTable/>}/>
        <Route path='/admin/payments/:paymentId' element={<AdminPaymentDetails/>}/>


      </Routes> 
      <ToastContainer /> {/* Add ToastContainer to the app */}
    </div>
  );
}

export default App;
