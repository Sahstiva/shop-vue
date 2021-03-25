Vue.component("products", {
  data() {
    return {
      catalogUrl: "/products",
      products: [],
    };
  },
  mounted() {
    this.$parent
      .getJson(`${this.$parent.API + this.$data.catalogUrl}`)
      .then((data) => {
        for (let el of data) {
          this.$data.products.push(el);
        }
      });
  },
  computed: {
    filtered: function () {
      const regexp = new RegExp(this.$parent.userSearch, "i");
      return this.$data.products.filter((product) =>
        regexp.test(product.title)
      );
    },
  },
  template: `<div 
                v-if="!$parent.$refs.cartlist.showCart"
                class="catalog__grid">
                    <product v-for = "product of products" 
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
                        <button type="button" class="catalog__item-button add-button" @click="$parent.$emit('add-product',product)">
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
