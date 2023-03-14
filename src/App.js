import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Join from './components/Join';
import MyPage from './components/MyPage';
import Users from './components/Users';

function App() {
    return (
        <div className="App">
            <Header/>
            <Switch>
                <Route path="/" component={Home} exact={true}/>
                <Route path="/login" component={Login}/>
                <Route path="/join" component={Join}/>
                <Route path="/mypage" component={MyPage}/>
                <Route path="/users" component={Users}/>
            </Switch>
        </div>
    );
}

export default App;
