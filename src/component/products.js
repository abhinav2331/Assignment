import React from "react";
import { Link } from "react-router-dom";

class Products extends React.Component {

    constructor() {
        super();
        this.state = {
            products: [],
            cart: [],
            totalItems: 0,
            totalAmount: 0,
            term: "",
            category: "",
            cartBounce: false,
            quantity: 1,
            quickViewProduct: {},
            modalActive: false,
            selectPro: '',
            showProduct: true,
            showCart: false,
            
        };

        this.handleAddToCart = this.handleAddToCart.bind(this);
        this.sumTotalItems = this.sumTotalItems.bind(this);
        this.sumTotalAmount = this.sumTotalAmount.bind(this);
        this.checkProduct = this.checkProduct.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);
        this.handleRemoveProduct = this.handleRemoveProduct.bind(this);   
        this.getProducts = this.getProducts.bind(this);
    }

    getProducts() {
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
    }
    componentWillMount() {
        this.getProducts();
    }

    

    // Add to Cart
    handleAddToCart(selectedProducts) {
        let cartItem = this.state.cart;
        let productID = selectedProducts.id;
        let productQty = 1;//selectedProducts.quantity;
        if (this.checkProduct(productID)) {
            debugger;
            console.log("hi");
            let index = cartItem.findIndex(x => x.ItemId === selectedProducts.id);
            cartItem[index].quantity =
                Number(cartItem[index].quantity) + Number(productQty);
            this.setState({
                cart: cartItem
            });
        } else {
          
            let itemn = { ItemId: selectedProducts.id, Name: selectedProducts.name, quantity: 1, price: selectedProducts.price, Image: selectedProducts.img_url, discount: selectedProducts.discount };

            cartItem.push(itemn);
        }
        this.setState({
            cart: cartItem,
            cartBounce: true,
            selectPro: selectedProducts.name
        });
        sessionStorage.setItem('data', JSON.stringify(this.state.cart));        

        setTimeout(
            function () {
                this.setState({
                    cartBounce: false,
                    quantity: 1
                });
                console.log(this.state.quantity);
                console.log(this.state.cart);
            }.bind(this),
            1000
        );
        this.sumTotalItems(this.state.cart);
        this.sumTotalAmount(this.state.cart);  
    }
    handleRemoveProduct(id, e) {
        let cart = this.state.cart;
        let index = cart.findIndex(x => x.ItemId === id);
        cart.splice(index, 1);
        this.setState({
            cart: cart
        });
        sessionStorage.setItem('data', JSON.stringify(this.state.cart));  
        this.sumTotalItems(this.state.cart);
        this.sumTotalAmount(this.state.cart);
        e.preventDefault();
    }
    checkProduct(productID) {        
        let cart = this.state.cart;
        return cart.some(function (item) {
            return item.ItemId === productID;
        });
    }
    sumTotalItems() {
        let total = 0;
        let cart = this.state.cart;
        total = cart.length;
        this.setState({
            totalItems: total
        });
    }
    sumTotalAmount() {
        debugger;
        let total = 0;
        let cart = this.state.cart;
        for (var i = 0; i < cart.length; i++) {
            total += cart[i].price * parseInt(cart[i].quantity);
        }
        this.setState({
            totalAmount: total
        });
         
    }
    

    //Reset Quantity
    updateQuantity(qty) {
        console.log("quantity added...");
        this.setState({
            quantity: qty
        });
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
                        {/*<button className="btns label_btn_blue">Go to cart<div className="badger">{this.state.totalItems}</div></button>*/}
                        <Link className="btns label_btn_blue" to="/cart">Go to cart<div className="badger">{this.state.totalItems}</div></Link>
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
                                                            <button className="btn btn_blue_border" type="button" onClick={() => this.handleAddToCart(product)}>Add to Cart</button>
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