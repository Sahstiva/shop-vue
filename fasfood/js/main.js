const btn = document.querySelector('.buy-btn')

class ProductsList{
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];
        this._fetchProducts();
    } 
    
    _fetchProducts(){
        this.goods = [
            {id: 1, title: 'Большой гамбургер', price: 100, calories: 40, img: 'img/hamburger.jpg', type: 'hamburger', type_desc: 'Размер гамбургера', required: 'radio', checked: 'checked'},
            {id: 2, title: 'Маленький гамбургер', price: 50, calories: 20, img: 'img/hamburger.jpg', type: 'hamburger', type_desc: 'Размер гамбургера', required: 'radio', checked: ''},
            {id: 3, title: 'Сыр', price: 10, calories: 20, img: 'img/cheese.jpg', type: 'filling', type_desc: 'Начинка', required: 'radio', checked: 'checked'},
            {id: 4, title: 'Салат', price: 20, calories: 5, img:'img/salad.jpg', type: 'filling', type_desc: 'Начинка', required: 'radio', checked: ''},
            {id: 5, title: 'Картофель', price: 15, calories: 10, img: 'img/potato.jpg', type: 'filling', type_desc: 'Начинка', required: 'radio', checked: ''},
            {id: 6, title: 'Приправа', price: 15, calories: 0, img: 'img/topping.jpeg', type: 'addon', type_desc: 'Добавки', required: 'checkbox', checked: ''},
            {id: 7, title: 'Майонез', price: 20, calories: 5, img: 'img/mayones.png', type: 'addon', type_desc: 'Добавки', required: 'checkbox', checked: ''},
        ];
    }
    render() {
        const block = document.querySelector(this.container);
        let curType = "", strBlockHtml = "";
        for(let product of this.goods){
            const productObj = new ProductItem(product);
            if(curType==product.type)
                strBlockHtml += productObj.render();
            else {
                if(curType=="")
                    strBlockHtml = `<div class="${product.type}"><h2>${product.type_desc}</h2>`;
                else
                    strBlockHtml += `</div><div class="${product.type}"><h2>${product.type_desc}</h2>`;
                strBlockHtml += productObj.render();
                curType = product.type;
            }
            curType = product.type;
        }
        strBlockHtml += '</div>';
        block.insertAdjacentHTML('beforeend',strBlockHtml);
        this.calc();
    }

    calc() {
        let priceSum = 0, caloriesSum = 0;
        for(let product of this.goods) {
            if(product.checked == 'checked') {
                priceSum += product.price;
                caloriesSum += product.calories;
            }
        }
        btn.innerHTML= `${priceSum} руб/${caloriesSum} кал`
    }

    check(id) {
        for(let product of this.goods) {
            if(product.id == id) {
                if(product.checked == 'checked')
                    product.checked = '';
                else
                    product.checked = 'checked';
                if(product.required = 'radio')
                    for(let item of this.goods) 
                        if(item.type == product.type && item.id != product.id)
                            item.checked = '';
            }
        }
        this.calc();
    }
    
}

class ProductItem{
	constructor(product){
		this.id = product.id;
		this.title = product.title;
        this.price = product.price;
        this.calories = product.calories;
        this.img = product.img;
        this.type = product.type;
        this.type_desc = product.type_desc;
        this.required = product.required;
        this.checked = product.checked;
		
	}
	
	render(){
		return `<div class="${this.type}_${this.id}">
                    <h3>${this.title}</h3>
                    <img src="${this.img}" width="150" alt="${this.type}_${this.id}">
                    <p>${this.price} руб</p>
                    <p>${this.calories} ккал</p>
                    <input type="${this.required}" name="${this.type}" ${this.checked} id="${this.id}" onchange="checkItem(${this.id})">
                </div>`
	}
}

let list = new ProductsList();
list.render();

function checkItem(id) {
    list.check(id);
}
