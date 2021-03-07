const API = 'http://127.0.0.1:5500/json';

// *****************   КАТАЛОГ ТОВАРОВ   *****************

class ProductsList { // класс списка товаров на странице каталога
    constructor(container = '.catalog__grid') {
        this.container = container;
        this.goods = []; //массив товаров
        this.allProducts = []; //массив объектов
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render()
            });
        }

    render() {
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend',productObj.render())
        }
        console.log(this.calc());
    }

    calc() {
        return this.allProducts.reduce((sum,item) => sum += item.price, 0);
    }

    _getProducts() {
        return fetch(`${API}/catalogdata.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
}

class ProductItem{
	constructor(product, description = 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'){
		this.title = product.title;
		this.price = product.price;
		this.id = product.id;
        this.image = product.image;
        if(product.description)
            this.description = product.description;
        else
            this.description = description;
		
	}
	
	render(){
            return `<div class="catalog__item" data-id="${this.id}"><div class="catalog__item-imgwrapper"><img class="catalog__item-img" src="${this.image}" alt="${this.title}"><div class="catalog__item-overlay"></div><button type="button" class="catalog__item-button"><img src="img/basket.svg" alt="Добавить в корзину" class="catalog__item-btnimg"><span class="catalog__item-btntxt">Add to cart</span></button></div><h3 class="catalog__item-heading">${this.title}</h3><p class="catalog__item-text">${this.description}</p><p class="catalog__item-price">$${this.price}</p></div>`;
	}
}

// *****************   КОРЗИНА   *****************

class CartList { // класс списка товаров в корзине при заполнении из JSON
    constructor(container = '.cart__list') {
        this.container = container;
        this.goodsInCart = [];
        this._getProducts()
            .then(data => { 
                this.goodsInCart = [...data];
                this.render()
            });
        }

    _getProducts() {
        return fetch(`${API}/cartdata.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    AddToCart() {}
    RemoveFromCart() {}
    Checkout() {}
    render() {
        const block = document.querySelector(this.container);
        for(let product of this.goodsInCart){
            const productObj = new CartItem(product);
            block.insertAdjacentHTML('beforeend',productObj.render())
        }
        this.updateTotalSum(this.calc());

    }

    calc() {
        return this.goodsInCart.reduce((sum,item) => sum += (item.price * item.quantity), 0);
    }

    updateTotalSum(sum) {
        let subTotal = document.querySelector("#subtotal");
        let grandTotal = document.querySelector("#grandtotal");

        subTotal.textContent = `sub total $${sum}`;
        grandTotal.textContent = `grand total $${sum}`;
    }

}

class CartItem { // элемент корзины товаров
    constructor(product, quantity = 1) {
		this.id = product.id;
		this.title = product.title;
		this.price = product.price;
        this.image = product.image;
        this.size = product.size;
        this.color = product.color;
        if(product.quantity)
            this.quantity = product.quantity;
        else
            this.quantity = quantity;
    }
    render() {
        let renderStr = `<li class="cart__list-item" data-price="${this.price}" data-id="${this.id}">
                    <img src="img/cart_${this.image}" alt="${this.title}" width="262" height="306" class="cart__list-img">
                    <div class="cart__list-wrapper">
                        <h3 class="cart__list-heading">${this.title}</h3>
                        <p class="cart__list-text">Price: <span class="cart__list-pink" data-id="${this.id}" data-price="${this.price}">$${this.price}</span></p>
                        <p class="cart__list-text">Color: ${this.color}</p>
                        <p class="cart__list-text">Size: ${this.size}</p>
                        <div class="cart__list-subwrapper">
                            <label class="cart__list-text">Quantity:</label>
                            <input type="text" class="cart__list-qty" value="${this.quantity}" placeholder="${this.quantity}" data-id="${this.id}" onchange="qtyChanged()">
                        </div>
                    </div>
                </li>`;
        return renderStr;
    }
}

function renderProductList() { // функция вызывается при загрузке страницы каталога
    let list = new ProductsList();
    list.render();
}

function renderCartList() { // функция вызывается при загрузке страницы корзины
    let cart = new CartList();
    cart.render();
}

class cartCalc { // класс для пересчёта стоимости корзины
    constructor() {
        this.subtotal = this._getPrice('.cart__list-pink','.cart__list-qty');
        this.grandtotal = this.subtotal;
    }

    _selectAll(name) {
        return [...document.querySelectorAll(name)];
    }

    _getPrice(price,quantity) {
        let result = this._selectAll(price).reduce((sum,item)=> {
            return sum + (+item.dataset.price * this._qetQuantity(item.dataset.id,quantity));
        },0);
        return result;
    }

    _qetQuantity(id,quantity) {
        let result = this._selectAll(quantity).filter(item=>item.dataset.id == id);
        return +result[0].value;
    }

    render() {
        let subTotal = document.querySelector("#subtotal");
        let grandTotal = document.querySelector("#grandtotal");

        subTotal.textContent = `sub total $${this.subtotal}`;
        grandTotal.textContent = `grand total $${this.grandtotal}`;

    }
}

function qtyChanged() { // функция вызывается при изменении количества в элементе корзины
    let cart = new cartCalc;
    cart.render();

}
