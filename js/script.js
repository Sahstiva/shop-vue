class ProductsList{
    constructor(container = '.catalog__grid'){
        this.container = container;
        this.goods = [];
        this._fetchProducts();
    } 
    
    _fetchProducts(){
        this.goods = [
        { id: 1, title: 'A man with the backpack', price: 150, image: 'img/man_with_backpack.jpg', description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.' },
        { id: 2, title: 'A man in the red shirt', price: 50, image: 'img/man_in_red_shirt.jpg' },
        { id: 3, title: 'A man in a hoody', price: 350, image: 'img/man_in_hoody.jpg' },
        { id: 4, title: 'A man in a yellow pants', price: 200, image: 'img/man_yellow_pants.jpg' },
        { id: 5, title: 'A man in a white shirt', price: 100, image: 'img/man_in_white_shirt.jpg', description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.' },
        { id: 6, title: 'A man in a baseball cap', price: 99, image: 'img/man_in_baseball_cap.jpg' },
        { id: 7, title: 'A man with the belt', price: 149, image: 'img/man_with_the_belt.jpg' },
        { id: 8, title: 'A man with the dog', price: 300, image: 'img/man_with_a_dog.jpg' },
        { id: 9, title: 'A man man scratching his head', price: 255, image: 'img/man_scratching_his_head.jpg' },
    ];
    }
    render() {
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML('beforeend',productObj.render())
        }
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

class CartList {
    constructor(container = '.cart') {
        this.container = container;
        this.goodsInCart = [];
    }
    AddToCart() {}
    RemoveFromCart() {}
    Checkout() {}

}

class CartItem {
    constructor(product, number = 1) {
		this.title = product.title;
		this.price = product.price;
		this.id = product.id;
        this.image = product.image;
        this.number = number;
    }
    render() {}
}

let list = new ProductsList();
list.render();
