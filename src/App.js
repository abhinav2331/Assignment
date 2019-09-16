import React, { Suspense } from 'react';
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import History from './history.js';
import "./assets/style.scss";


import Products from "./component/products";
import Cart from "./component/cart";

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>; 


class App extends React.Component {
    render() {
        return (
            <section>
                <BrowserRouter>
                    <Router history={History}>
                        <section>
                            <Suspense fallback={loading()}>
                                <Switch>
                                    <Route exact path="/" component={Products} />
                                    <Route exact path="/cart" component={Cart} />
                                </Switch>
                            </Suspense>
                        </section>
                    </Router>
                </BrowserRouter>

            </section>
        )
    }
};

export default App;
