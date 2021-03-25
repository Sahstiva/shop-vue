Vue.component("cartlist", {
  data() {
    return {
      cartUrl: "/cart",
      cart: [],
      showCart: false,
      //      quantity: null,
    };
  },
  computed: {
    total: function () {
      return this.$data.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
  },
  methods: {
    calcQuantity() {
      this.$parent.quantity = this.$data.cart.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
    },

    addProduct(item) {
      let find = this.cart.find((el) => el.id === item.id);
      if (find) {
        this.changeProduct(item, ++item.quantity);
        // this.$parent
        //   .putJson(`${this.$parent.API}${this.$data.cartUrl}/${find.id}`, {
        //     quantity: 1,
        //   })
        //   .then((data) => {
        //     if (data.result === 1) {
        //       find.quantity++;
        //     }
        //   });
      } else {
        const prod = Object.assign(item, {
          size: "XL",
          color: "red",
          quantity: 1,
        });
        this.$parent
          .postJson(`${this.$parent.API}${this.$data.cartUrl}`, prod)
          .then((data) => {
            if (data.result === 1) {
              this.cart.push(prod);
            }
          });
        this.changeProduct(item, ++item.quantity);
      }
      this.calcQuantity();
    },

    changeProduct(item, change) {
      let find = this.cart.find((el) => el.id === item.id);
      if (find) {
        this.$parent
          .putJson(`${this.$parent.API}${this.$data.cartUrl}/${find.id}`, {
            quantity: +change,
          })
          .then((data) => {
            if (data.result === 1) {
              find.quantity = +change;
            }
          });
      }
      this.calcQuantity();
    },

    removeProduct(item) {
      let find = this.cart.find((el) => el.id === item.id);
      this.$parent
        .deleteJson(`${this.$parent.API}${this.$data.cartUrl}/${find.id}`, find)
        .then((data) => {
          if (data.result === 1)
            this.cart = this.cart.filter((el) => el.id != item.id);
        });
      this.calcQuantity();
    },

    clearCart() {
      this.cart.forEach((element) => {
        this.removeProduct(element);
      });
      $parent.quantity = null;
    },
  },
  mounted() {
    this.$parent
      .getJson(`${this.$parent.API + this.$data.cartUrl}`)
      .then((data) => {
        for (let el of data) {
          this.$data.cart.push(el);
        }
        this.calcQuantity();
      });
  },
  template: `<div v-if="showCart" class="cart container">
                    <h2 class="visually-hidden">корзина</h2>
                    <div class="cart__wrapper">
                        <ul class="cart__list">
                        <cartitem  v-for="item of cart"
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
                                    @click="showCart = !showCart">continue shopping</button></li>
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
                                <p class="cart__subtotal_text">sub total {{ total }}</p>
                                <p class="cart__grandtotal_text">grand total {{ total }}</p>
                            </div>
                            <div class="cart__total_checkout_wrapper">
                                <hr class="cart__total_line">
                                <button type="submit" class="cart__total_checkout">proceed to checkout</button>
                            </div>
                        </div>
                    </div>
                </div>`,
});

Vue.component("cartitem", {
  props: ["cartitem"],
  template: `<li class="cart__list-item">
                    <img :src="cartitem.image" :alt="cartitem.title" width="262" height="306"
                        class="cart__list-img">
                    <div class="cart__list-wrapper">
                        <h3 class="cart__list-heading">{{ cartitem.title }}</h3>
                        <p class="cart__list-text">Price: <span class="cart__list-pink">{{ cartitem.price }}</span></p>
                        <p class="cart__list-text">Color: {{ cartitem.color }}</p>
                        <p class="cart__list-text">Size: {{ cartitem.size }}</p>
                        <img @click="$parent.removeProduct(cartitem)" class="cart__list-cross" src="img/cross.svg">
                        <div class="cart__list-subwrapper">
                            <label class="cart__list-text">Quantity:</label>
                            <i class="fas fa-minus cart__list-minus"
                                @click.stop="cartitem.quantity > 1 ? $parent.changeProduct(cartitem, --cartitem.quantity) : $parent.removeProduct(cartitem)"></i>
                            <input type="text" class="cart__list-qty" :value="cartitem.quantuty"
                                :placeholder="cartitem.quantity">
                            <i class="fas fa-plus cart__list-plus" @click.stop="$parent.changeProduct(cartitem, ++cartitem.quantity)"></i>
                        </div>
                    </div>
                </li>`,
});
