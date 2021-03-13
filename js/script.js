const API = 'http://127.0.0.1:5500/json';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogdata.json',
        cartUrl: '/cartdata.json',
        products: [],
        cart: [],
        userSearch: '',
        showCart: false,
        showNav: false
    },
    computed: {
        filtered: function () {
            const regexp = new RegExp(this.userSearch, 'i');
            return this.products.filter(product => regexp.test(product.title));
        }
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product) {
            this.getJson(`${API}/addtobasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.cart.find(item => item.id === product.id);
                        if (find) {
                            find.quantity++;
                        } else {
                            let newItem = {
                                id: product.id,
                                title: product.title,
                                price: product.price,
                                image: product.image,
                                size: "XL",
                                color: "red",
                                quantity: 1
                            };
                            this.cart.push(newItem);
                        }
                    } else {
                        alert('Error');
                    }
                });
        },

        removeProduct(product) {
            this.getJson(`${API}/deletefrombasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.cart.find(item => item.id === product.id);
                        if (find)
                            this.cart.splice(this.cart.indexOf(find), 1);
                    } else {
                        alert('Error');
                    }
                });
        }
    },
    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data) {
                    this.cart.push(el);
                }
            });
    }
});

// *****************   ОБЩИЕ КЛАССЫ ДЛЯ КАТАЛОГА И КОРЗИНЫ  *****************


// class List {
//     constructor(url, container, list = list2) {
//         this.container = container;
//         this.list = list;
//         this.url = url;
//         this.goods = [];
//         this.allProducts = [];
//         this._init();
//     }

//     getJson(url) {
//         return fetch(url ? url : `${API + this.url}`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log(error);
//             })
//     }

//     handleData(data) {
//         this.goods = [...data];
//         this.render();
//     }

//     calcSum() {
//         return this.allProducts.reduce((accum, item) => accum += item.price, 0);
//     }

//     render() {
//         const block = document.querySelector(this.container);
//         for (let product of this.goods) {
//             //console.log(this.constructor.name);
//             const productObj = new this.list[this.constructor.name](product); //мы сделали объект товара либо CartItem, либо ProductItem
//             //            console.log(productObj);
//             this.allProducts.push(productObj);
//             block.insertAdjacentHTML('beforeend', productObj.render());
//         }
//     }

//     filter(value) {
//         const regexp = new RegExp(value, 'i');
//         this.filtered = this.allProducts.filter(product => regexp.test(product.title));
//         this.allProducts.forEach(el => {
//             const block = document.querySelector(`.catalog__item[data-id="${el.id}"]`);
//             if (!this.filtered.includes(el)) {
//                 block.classList.add('visually-hidden');
//             } else {
//                 block.classList.remove('visually-hidden');
//             }
//         })
//     }

//     _init() {
//         return false
//     }
// }

// class Item {
//     constructor(el) {
//         this.id = el.id;
//         this.title = el.title;
//         this.price = el.price;
//         this.image = el.image;
//         this.description = el.description;
//     }

//     render() { //генерация товара для каталога товаров
        // return `<div class="catalog__item" data-id="${this.id}">
        //             <div class="catalog__item-imgwrapper">
        //                 <img class="catalog__item-img" src="${this.image}" alt="${this.title}">
        //                 <div class="catalog__item-overlay"></div>
        //                 <button type="button" class="catalog__item-button add-button" data-id="${this.id}" data-title="${this.title}" data-price="${this.price}" data-image="${this.image}">
        //                     <img src="img/basket.svg" alt="Добавить в корзину" class="catalog__item-btnimg add-button" data-id="${this.id}" data-title="${this.title}" data-price="${this.price}" data-image="${this.image}"><span class="catalog__item-btntxt add-button" data-id="${this.id}" data-title="${this.title}" data-price="${this.price}" data-image="${this.image}">Add to cart</span>
        //                 </button>
        //             </div>
        //             <h3 class="catalog__item-heading">${this.title}</h3>
        //             <p class="catalog__item-text">${this.description}</p>
        //             <p class="catalog__item-price">$${this.price}</p>
        //         </div>`
//     }
// }

// // *****************   КАТАЛОГ ТОВАРОВ   *****************

// class ProductsList extends List {
//     constructor(cart, container = '.catalog__grid', url = "/catalogdata.json") {
//         super(url, container);
//         this.cart = cart;
//         this.getJson()
//             .then(data => this.handleData(data)); //handleData запускает отрисовку либо каталога товаров, либо списка товаров корзины
//     }
//     _init() {
//         document.querySelector(this.container).addEventListener('click', e => {
//             //            console.log(e.target);
//             if (e.target.classList.contains('add-button'))
//                 this.cart.addProduct(e.target);
//         });

//         document.querySelector('.header__search-form').addEventListener('submit', e => {
//             e.preventDefault();
//             this.filter(document.querySelector('.header__search-input').value)
//         });
//     }
// }

// class ProductItem extends Item { }

// // *****************   КОРЗИНА   *****************

// class Cart extends List {
//     constructor(container = ".cart__list", url = "/cartdata.json") {
//         super(url, container);
//         this.getJson()
//             .then(data => {
//                 this.handleData(data.contents); //вывели все товары в корзине 
//                 this._updatePrice();
//             });
//     }
//     addProduct(element) {
        // this.getJson(`${API}/addtobasket.json`)
        //     .then(data => {
        //         if (data.result === 1) {
        //             let productId = +element.dataset['id'];
        //             let find = this.allProducts.find(product => product.id === productId);
        //             if (find) {
        //                 find.quantity++;
        //                 this._updateCart(find);
        //             } else {
        //                 let product = {
        //                     id: productId,
        //                     title: element.dataset['title'],
        //                     price: +element.dataset['price'],
        //                     image: element.dataset['image'].replace('img/', ''),
        //                     size: "XL",
        //                     color: "red",
        //                     quantity: 1
        //                 };
        //                 this.goods = [product];
        //                 this.render();
        //             }
        //             this._updatePrice();
        //         } else {
        //             alert('Error');
        //         }
        //     });
//     }
//     removeProduct(element) {
        // // console.log(element.dataset['id']);
        // this.getJson(`${API}/deletefrombasket.json`)
        //     .then(data => {
        //         if (data.result === 1) {
        //             let productId = +element.dataset['id'];
        //             let find = this.allProducts.find(product => product.id === productId);
        //             if (find.quantity > 1) {
        //                 find.quantity--;
        //                 this._updateCart(find);
        //             } else {
        //                 this.allProducts.splice(this.allProducts.indexOf(find), 1);
        //                 document.querySelector(`.cart__list-item[data-id="${productId}"]`).remove();
        //                 this._updatePrice();
        //             }
        //         } else {
        //             alert('Error');
        //         }
        //     });
//     }

//     _updateCart(product) {
//         let block = document.querySelector(`.cart__list-item[data-id="${product.id}"]`);
//         block.querySelector('.cart__list-qty').value = `${product.quantity}`;
//         block.querySelector('.cart__list-pink').textContent = `$${product.quantity * product.price}`;
//         this._updatePrice();
//     }

//     _updatePrice() {
//         let subtotalPrice = this.allProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);
//         let totalQuantity = this.allProducts.reduce((sum, item) => sum + item.quantity, 0);

//         const subTotal = document.querySelector("#subtotal");
//         const grandTotal = document.querySelector("#grandtotal");
//         const Quantity = document.querySelector('.header__cart');
//         const Empty = document.querySelector('.cart__list-empty');

//         Quantity.textContent = totalQuantity;
//         if (totalQuantity > 0) {
//             Quantity.style.display = 'block';
//             Empty.classList.add('visually-hidden');
//         }
//         else {
//             Quantity.style.display = 'none';
//             Empty.classList.remove('visually-hidden');
//         }
//         //      Quantity.style.display = 'none';
//         subTotal.textContent = `sub total $${subtotalPrice}`;
//         grandTotal.textContent = `grand total $${subtotalPrice}`;
//     }

//     _init() {
//         // document.querySelector('.btn-cart').addEventListener('click', () => {
//         //     document.querySelector('.cart').classList.toggle('visually-hidden');
//         // });
//         document.querySelector('.cart').addEventListener('click', e => {
//             // console.log(e.target);
//             if (e.target.classList.contains('cart__list-cross')) {
//                 this.removeProduct(e.target);
//             }
//             if (e.target.classList.contains('cart__list-plus')) {
//                 this.addProduct(e.target);
//             }
//             if (e.target.classList.contains('cart__list-minus')) {
//                 this.removeProduct(e.target);
//             }
//             if (e.target.classList.contains('cart__list-clear')) {
//                 let arr = document.querySelectorAll('.cart__list-item');
//                 arr.forEach((item) => {
//                     if (!item.classList.contains('cart__list-empty'))
//                         this.removeProduct(item);
//                     else
//                         item.classList.remove('visually-hidden');
//                 });

//             }
//         });
//     }

// }

// class CartItem extends Item {
//     constructor(el) {
//         super(el);
//         this.size = el.size;
//         this.color = el.color;
//         this.quantity = el.quantity;
//     }

//     render() {
        // return `<li class="cart__list-item" data-price="${this.price}" data-id="${this.id}">
        //     <img src="img/cart_${this.image}" alt="${this.title}" width="262" height="306" class="cart__list-img">
        //     <div class="cart__list-wrapper">
        //     <h3 class="cart__list-heading">${this.title}</h3>
        //     <p class="cart__list-text">Price: <span class="cart__list-pink" data-id="${this.id}" data-price="${this.price}">$${this.price}</span></p>
        //     <p class="cart__list-text">Color: ${this.color}</p>
        //     <p class="cart__list-text">Size: ${this.size}</p>
        //     <img class="cart__list-cross" src="img/cross.svg" data-id="${this.id}">
        //     <div class="cart__list-subwrapper">
        //     <label class="cart__list-text">Quantity:</label>
        //     <i class="fas fa-plus cart__list-plus" data-id="${this.id}"></i>
        //     <input type="text" class="cart__list-qty" value="${this.quantity}" placeholder="${this.quantity}" data-id="${this.id}">
        //     <i class="fas fa-minus cart__list-minus" data-id="${this.id}"></i>
        //     </div></div></li>`;
//     }
// }

// const list2 = {
//     ProductsList: ProductItem,
//     Cart: CartItem
// };


// let cart = new Cart();
// let products = new ProductsList(cart);



// function toggleCart() { // отображение и скрытие корзины
//     const cart = document.querySelector(".cart");
//     const ovl = document.querySelector(".main__overlay");

//     if (cart) {
//         cart.classList.toggle("visually-hidden");
//         ovl.classList.toggle("visually-hidden");
//     }
// }

