<template>
  <div class="home">
    <b-row class="d-flex justify-content-center align-items-center">
      <b-col
        lg="3"
        v-for="categorie in categories"
        :key="categorie.id"
        class="mt-5 d-flex justify-content-center align-items-center"
        @click="getFichesByCategories(categorie.id)"
      >
        <b-card class="text-center  shadow p-3 bg-white rounded card-home">
          <b-card-text class="lead">{{ categorie.label }}</b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";
import base_uri from "../constants/constants";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      categories: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      axios
        .get(`${base_uri}/api/categories`)
        .then((res) => {
          console.log(res.data);
          this.categories = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFichesByCategories(id) {
      this.$router.push({ name: "Fiches", params: { categorieId: id } });
    },
  },
};
</script>

<style>
.card-home {
  width: 200px;
  height: 150px;
}
</style>
