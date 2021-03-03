
const goods = [
    { title: 'A man with the backpack', price: 150, image: 'img/man_with_backpack.jpg', description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.' },
    { title: 'A man in the red shirt', price: 50, image: 'img/man_in_red_shirt.jpg' },
    { title: 'A man in a hoody', price: 350, image: 'img/man_in_hoody.jpg' },
    { title: 'A man in a yellow pants', price: 250, image: 'img/man_yellow_pants.jpg' },
    { title: 'A man in a white shirt', price: 250, image: 'img/man_in_white_shirt.jpg', description: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.' },
    { title: 'A man in a baseball cap', price: 250, image: 'img/man_in_baseball_cap.jpg' },
    { title: 'A man with the belt', price: 250, image: 'img/man_with_the_belt.jpg' },
    { title: 'A man with the dog', price: 250, image: 'img/man_with_a_dog.jpg' },
    { title: 'A man man scratching his head', price: 250, image: 'img/man_scratching_his_head.jpg' },
];

const renderGoodsItem = (title, price, image, description = "There is no description yet.") => {
    return `<div class="catalog__item"><div class="catalog__item-imgwrapper"><img class="catalog__item-img" src="${image}" alt="${title}"><div class="catalog__item-overlay"></div><button type="button" class="catalog__item-button"><img src="img/basket.svg" alt="Добавить в корзину" class="catalog__item-btnimg"><span class="catalog__item-btntxt">Add to cart</span></button></div><h3 class="catalog__item-heading">${title}</h3><p class="catalog__item-text">${description}</p><p class="catalog__item-price">$${price}</p></div>`;
};

const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price, item.image, item.description));
    document.querySelector('.catalog__grid').innerHTML = goodsList.reduce(function (list, item) {
        return list + item;
    });
}

renderGoodsList(goods);
