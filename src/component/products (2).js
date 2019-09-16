import React from "react";
import { Link } from "react-router-dom";

class Products extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            products: [],
            cartItem: {ItemId:0, Name:'', Qty:0, UnitPrice:0, Price:0, Image:''},
            cart: [],
            cartItemsCount: 0,
            selectPro: ""
        };
        this.addToCart = this.addToCart.bind(this);
    }

    componentDidMount() {
        fetch("https://api.myjson.com/bins/qhnfp")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        products: result
                    });
                    console.log(result);
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );

        sessionStorage.clear();
    }

    addToCart(product) {
        let cartItem = this.state.cart;
        let count = this.state.cartItemsCount;
        let productID = product.id;

        console.log(this.state.cartItem.map((item, index) => {            
            if (item.id === product.id) {
                item.Qty = item.Qty + 1;
                item.Price = product.price * item.Qty;

                this.setState({
                    cartItem: { ItemId: product.id, Name: product.name, Qty: 1, UnitPrice: product.price, Price: item.price, Image: item.img_url }
                });

            } else {
                this.setState({
                    cartItem: { ItemId: product.id, Name: product.name, Qty: 1, UnitPrice: product.price, Price: product.price, Image: product.img_url }
                });
            }         
        }));
       

        cartItem.push(product);

       // console.log(this.state.cartItem.filter(item => item.id === product.id));

        this.setState({
            cart: cartItem,
            cartItemsCount: count + 1,
            selectPro: product.name
        });
        //alert(product.name + " is added to cart.");
        console.log(this.state.cart);
        sessionStorage.setItem('data', JSON.stringify(this.state.cart));  
    }


    render() {
        return (
            <section className="container">
                <div className="row">                             
                    <div className="col-lg-4">All Items</div>
                    <div className="col-lg-4 text-center">
                        {
                            this.state.selectPro !== "" ? <span className="btns label_btn_green">{this.state.selectPro} added to cart</span> : ""
                        }

                    </div>
                    <div className="col-lg-4 text-right">
                        <Link className="btns label_btn_blue" to="/cart">Go to cart<div className="badger">{this.state.cartItemsCount}</div></Link>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-lg-12">
                        <div className="products">
                            <ul>
                                {
                                    this.state.products.map((product, index) => {
                                        return (
                                            <li key={index}>
                                                <div className="text-center mt-5">
                                                    {
                                                        product.discount > 0 ? <div className="discount">
                                                            {product.discount} % Off
                                                        </div> : ""
                                                    }

                                                    <div className="pro_image"><img src={product.img_url} alt={product.name} /></div>
                                                </div>
                                                <div className="pro_footer">
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <div className="pro_title">
                                                                {product.name}
                                                            </div>
                                                            <div>
                                                                {
                                                                    product.discount > 0 ? <span className="old_price">$200</span> : ""
                                                                }
                                                                 {product.price}
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <button className="btn btn_blue_border" type="button" onClick={() => this.addToCart(product)}>Add to Cart</button>
                                                        </div>
                                                    </div>
                                                </div>                                                
                                            </li>)

                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Products;