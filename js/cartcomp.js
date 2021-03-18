Vue.component('cartlist', {
    props: ['cartitems', 'visibility'],
    template:   `<div v-if="visibility" class="cart container">
                    <h2 class="visually-hidden">корзина</h2>
                    <div class="cart__wrapper">
                        <ul class="cart__list">
                        <cartitem  v-for="item of cartitems"
                                    :key = "item.id"
                                    :cartitem = "item">
                        </cartitem>
                        <li class="cart__list-item  cart__list-empty"
                                v-if="!$parent.quantity">
                                <img src="img/girl_wonder.jpg" width="262" height="306" class="cart__list-img">
                                <div class="cart__list-wrapper">
                                    <h3 class="cart__list-heading">Корзина пуста</h3>
                                </div>
                            </li>
                        </ul>
                        <ul class="cart__list-buttons">
                            <li><button type="reset" class="cart__list-button cart__list-clear"
                                    @click="$parent.clearCart()">clear shopping cart</button>
                            </li>
                            <li><button type="button" class="cart__list-button cart__list-continue"
                                    @click="$parent.showCart = !$parent.showCart">continue shopping</button></li>
                        </ul>
                    </div>
                    <div class="cart__shipping_wrapper">
                        <form action="post" class="cart__shipping">
                            <h3 class="cart__shipping_heading">shipping adress</h3>
                            <label for="city" class="visually-hidden">City</label>
                            <input type="text" id="city" class="cart__shipping_input" placeholder="Bangladesh">
                            <label for="state" class="visually-hidden">State</label>
                            <input type="text" id="state" class="cart__shipping_input" placeholder="State">
                            <label for="zip" class="visually-hidden">Postcode/zip</label>
                            <input type="text" id="zip" class="cart__shipping_input" placeholder="Postcode / Zip">
                            <button type="submit" class="cart__shipping_button">get a quote</button>
                        </form>
                        <div class="cart__total">
                            <div class="cart__total_text_wrapper">
                                <p class="cart__subtotal_text">sub total {{ $parent.total }}</p>
                                <p class="cart__grandtotal_text">grand total {{ $parent.total }}</p>
                            </div>
                            <div class="cart__total_checkout_wrapper">
                                <hr class="cart__total_line">
                                <button type="submit" class="cart__total_checkout">proceed to checkout</button>
                            </div>
                        </div>
                    </div>
                </div>`
});

Vue.component('cartitem', {
    props: ['cartitem'],
    template:   `<li class="cart__list-item">
                    <img :src="cartitem.image" :alt="cartitem.title" width="262" height="306"
                        class="cart__list-img">
                    <div class="cart__list-wrapper">
                        <h3 class="cart__list-heading">{{ cartitem.title }}</h3>
                        <p class="cart__list-text">Price: <span class="cart__list-pink">{{ cartitem.price }}</span></p>
                        <p class="cart__list-text">Color: {{ cartitem.color }}</p>
                        <p class="cart__list-text">Size: {{ cartitem.size }}</p>
                        <img @click="$parent.$emit('remove', cartitem)" class="cart__list-cross" src="img/cross.svg">
                        <div class="cart__list-subwrapper">
                            <label class="cart__list-text">Quantity:</label>
                            <i class="fas fa-minus cart__list-minus"
                                @click="cartitem.quantity > 1 ? cartitem.quantity-- : $parent.$emit('remove', cartitem)"></i>
                            <input type="text" class="cart__list-qty" :value="cartitem.quantuty"
                                :placeholder="cartitem.quantity">
                            <i class="fas fa-plus cart__list-plus" @click="cartitem.quantity++"></i>
                        </div>
                    </div>
                </li>`
});