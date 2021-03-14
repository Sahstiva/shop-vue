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
        },

        clearCart() {
            this.cart.forEach(element => {
                this.removeProduct(element);
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
