<template>
  <div class="wishlist">
    <b-container>
      <b-row
        class="d-flex flex-column justify-content-center align-items-center"
      >
        <p class="display-4">Ma Wishlist</p>
        <b-col lg="8" md="12" sm="12">
          <b-card>
            <ul v-for="product in productName" :key="product.id">
              <li>{{ product }}</li>
            </ul>
          </b-card>
        </b-col>
      </b-row></b-container
    >
  </div>
</template>

<script>
import axios from "axios";
import base_uri from "../constants/constants";

export default {
  name: "Wishlist",
  components: {},
  data() {
    return {
      productName: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      axios
        .get(`${base_uri}/api/wishlist`)
        .then((resp) => {
          this.getProductName(resp.data);
        })
        .catch((err) => console.log(err));
    },
    getProductName(wishlist) {
      for (const key in wishlist) {
        axios
          .get(`${base_uri}/api/product/${wishlist[key].produit}`)
          .then((resp) => {
            this.productName = [...this.productName, resp.data.data];
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>

<style></style>
