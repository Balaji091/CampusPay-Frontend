import {Routes,Route} from 'react-router-dom';
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
function App() {
  return (
    <div className="App">
     <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/user/login' element={<LoginForm/>}/>
          <Route path='/user/signup' element={<Signup/>}/>
          <Route path='/user/home' element={<UserHome/>}/>
          <Route path='/user/payments' element={<PaymentsComponent/>}/>
          <Route path='/user/paymentDetails' element={<PaymentDetails/>}/>
          <Route path='/user/addPayment' element={<UploadPaymentComponent/>}/>
          <Route path='/user/paymentsHistory' element={<PaymentsHistoryComponent/>}/>
          <Route path='/user/profile' element={<ProfileComponent/>}/>
     </Routes>

    </div>  
  );
}
export default App;
