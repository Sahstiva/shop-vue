Vue.component("products", {
  props: ['usersearch'],
  data() {
    return {
      catalogUrl: "/products",
      cartUrl: "/cart",
      products: [],
      cart: [],
      quantity: null,
    };
  },

  computed: {
    filtered: function () {
      const regexp = new RegExp(this.usersearch, "i");
      return this.$data.products.filter((product) =>
        regexp.test(product.title)
      );
    },
  },

  methods: {
    addProduct(item) {
      let find = this.$data.cart.find((el) => el.id === item.id);
      if (find) {
        this.$parent
          .putJson(`${this.$parent.API}${this.$data.cartUrl}/${find.id}`, {
            quantity: 1,
          })
          .then((data) => {
            if (data.result === 1) {
              find.quantity++;
              this.calcQuantity();
            }
          });
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
              this.$data.cart.push(prod);
              this.calcQuantity();
            }
          });
      }
    },
    
    calcQuantity() {
      this.quantity = this.$data.cart.reduce((sum, item) => sum + item.quantity, 0);
      this.$parent.quantity = this.quantity;
    },

  },

  mounted() {
    this.$parent
      .getJson(`${this.$parent.API + this.$data.catalogUrl}`)
      .then((data) => {
        for (let el of data) {
          this.$data.products.push(el);
        }
      });
    this.$parent
      .getJson(`${this.$parent.API + this.$data.cartUrl}`)
      .then((data) => {
        for (let el of data) {
          this.$data.cart.push(el);
        }
        this.calcQuantity();
      });
  },

  template: `<div 
                v-if="!$parent.$refs.cartlist.showCart"
                class="catalog__grid">
                    <product v-for = "product of filtered" 
                    :key = "product.id"
                    :product = "product">
                    </product>
                </div>`,
});

Vue.component("product", {
  props: ["product"],
  template: `<div class="catalog__item">
                    <div class="catalog__item-imgwrapper">
                        <img class="catalog__item-img" :src="product.image" :alt="product.title">
                        <div class="catalog__item-overlay"></div>
                        <button type="button" class="catalog__item-button add-button" @click.stop="$parent.addProduct(product)">
                            <img src="img/basket.svg" alt="Добавить в корзину"
                                class="catalog__item-btnimg add-button"><span
                                class="catalog__item-btntxt add-button">Add to cart</span>
                        </button>
                    </div>
                    <h3 class="catalog__item-heading">{{ product.title }}</h3>
                    <p class="catalog__item-text">{{ product.description }}</p>
                    <p class="catalog__item-price">{{ product.price }}</p>
                </div>`,
});
