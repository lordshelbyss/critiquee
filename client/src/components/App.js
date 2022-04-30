import {BrowserRouter,Route} from 'react-router-dom';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Payments from './payments/Payments';
import PaymentLanding from './payments/PaymentLanding';

const App=()=>{
    return (
        <div className='container'>
            <BrowserRouter>
                <Header/>
                <Route path="/" exact component={Landing}/>
                <Route path="/surveys" exact component={Dashboard}/>
                <Route path="/add-credits" exact component={PaymentLanding}/>
                <Route path="/payments" exact component={Payments}/>
            </BrowserRouter>
        </div>
    );
};

export default App;