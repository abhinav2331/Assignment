import React from "react";

class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cartsummary: [],
            thetotal: "",
            thediscount: "",
            quantity: "",
            value:""
        };  
        this.updateQuantity = this.updateQuantity.bind(this);
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);

    }

    componentWillMount() {        
        let cartsummary = JSON.parse(sessionStorage.data);
        this.setState({
            cartsummary: cartsummary
        });
    }

    getTotal() {
        var allprice = this.state.cartsummary;
        let grandtotal = 0;
        let discount = 0;
        for (var i = 0; i < allprice.length; i++) {
            grandtotal += allprice[i].price * allprice[i].quantity;
            discount += allprice[i].price * allprice[i].discount / 100;
        }        
        this.setState({
            thetotal: grandtotal,
            thediscount: discount
        });
    };

    handleRemoveProduct(id, e) {
        let cart = this.state.cartsummary;
        let index = cart.findIndex(x => x.id == id);
        cart.splice(index, 1);
        this.setState({
            cart: cart
        });
        this.sumTotalItems(this.state.cart);
        this.sumTotalAmount(this.state.cart);
        e.preventDefault();
    }

    

    componentDidMount() {
        this.getTotal();       
    }

    updateQuantity(qty) {
        console.log("quantity added...");
        this.setState({
            quantity: qty
        });
    }

    increment(e) {
        this.setState(
            prevState => ({
                value: Number(prevState.value) + 1
            }),
            function () {
                this.updateQuantity(this.state.value);
            }
        );
        e.preventDefault();
    }

    decrement(e) {
        e.preventDefault();
        if (this.state.value <= 1) {
            return this.state.value;
        } else {
            this.setState(
                prevState => ({
                    value: Number(prevState.value) - 1
                }),
                function () {
                    this.updateQuantity(this.state.value);
                }
            );
        }
    }



    render() {
        return (
            <section className="container">
                <section className="register_wrapper">
                    <hr />
                    <h1>Order Summary</h1>
                    <hr />
                    <div className="row">
                        <div className="col-lg-8">
                            <table width="60%" className="table">
                                <thead>
                                    <tr>
                                        <th colSpan="2">Items</th>
                                        <th>Qty.</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {

                                        this.state.cartsummary.map((item, index) => {
                                            return (<tr key={index}>
                                                <td width="120"><img src={item.Image} width="50" className="pull-left" /></td>
                                                <td>{item.Name} {item.ItemId} <button type="button" className="btn pull-right" onClick={() => this.handleRemoveProduct(item.id)}>X</button></td>
                                                <td><button type="button" onClick={this.increment}>+</button> {item.quantity} <button type="button" onClick={this.decrement}>-</button> </td>
                                                <td>{item.price * item.quantity}</td>
                                            </tr>)
                                        })
                                    }
                                </tbody>
                            </table>
                            <hr />
                        </div>
                        <div className="col-lg-4">
                            <div className="card">
                                <div>
                                    Total
                                </div>
                                <div>
                                    <table>
                                        <tr>
                                            <td>Items({this.state.cartsummary.length}):</td>
                                            <td>
                                                ${this.state.thetotal}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Discount:</td>
                                            <td>- ${this.state.thediscount}</td>
                                        </tr>
                                        <tr>
                                            <td>Type Discount:</td>
                                            <td>- $0</td>
                                        </tr>
                                        <tr>
                                            <td>Total Order:</td>
                                            <td>${this.state.thetotal - this.state.thediscount}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </section>
        )
    }
}

export default Cart;