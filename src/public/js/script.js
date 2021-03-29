import cartlist from "./cartcomp";
import products from "./productcomp";
import error from "./errorcomp";

const API = "http://localhost:3000/api";
const app = new Vue({
  el: "#app",
  components: {
    cartlist,
    products,
    error,
  },
  data: {
    API: "http://localhost:3000/api",
    userSearch: "",
    showNav: false,
    quantity: 1,
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then((result) => result.json())
        .catch((error) => {
          console.log(error);
        });
    },
    postJson(url, data) {
      return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((result) => result.json())
        .catch((error) => {
          // console.log(error)
          this.$refs.error.text = error;
        });
    },

    putJson(url, data) {
      return fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((result) => result.json())
        .catch((error) => {
          // console.log(error)
          this.$refs.error.text = error;
        });
    },

    deleteJson(url, data) {
      return fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((result) => result.json())
        .catch((error) => {
          // console.log(error);
          this.$refs.error.setError(error);
        });
    },
  },
});

export default app;
