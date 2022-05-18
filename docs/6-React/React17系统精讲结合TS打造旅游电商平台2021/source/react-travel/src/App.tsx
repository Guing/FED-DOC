import React from 'react';
import styles from "./App.module.css";
import { BrowserRouter, Route, Switch,Redirect } from "react-router-dom";
import { HomePage, SignInPage, RegisterPage, DetailPage,SearchPage,ShoppingCartPage } from "./pages";
import { useSelector } from "./redux/hooks";

// 使用创建私有路由组件
const PrivateRoute= ({ component,isAuthenticated,...rest })=>{
   const routeComponent =(props)=>{
       return isAuthenticated?(React.createElement(component,props)):(<Redirect to={{ pathname: "/signIn" }}></Redirect>)
   }
   return <Route render={routeComponent} {...rest} ></Route>
}

function App() {
  const jwt = useSelector((s) => s.user.token);
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signIn" component={SignInPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/detail/:touristRouteId" component={DetailPage} />
          <PrivateRoute
            isAuthenticated={jwt !== null}
            path="/shoppingCart"
            component={ShoppingCartPage}
          />
          <Route path="/search/:keywords?" component={SearchPage} />
          <Route render={() => <h1>404 not found 页面去火星了 ！</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
