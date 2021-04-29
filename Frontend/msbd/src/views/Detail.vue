<template>
  <div class="detail">
    <b-container>
      <b-row class="d-flex justify-content-center align-items-center">
        <b-col class="mt-5" lg="6" md="12" sm="12">
          <div class="d-flex justify-content-between align-items-start">
            <div class="display-4 mb-5">
              Détail de la fiche N°{{ detail.id }}
            </div>

            <span @click="switchField(detail)" v-if="!showInput">
              <b-button pill variant="outline-secondary" class="rounded-circle"
                ><i class="fas fa-pen-nib"></i></b-button
            ></span>
            <span v-else @click="updateField">
              <b-button pill variant="outline-success" class="rounded-circle"
                ><i class="fas fa-check-double"></i></b-button
            ></span>
          </div>
          <div class="content mt-6">
            <h3>Titre de l'article</h3>
            <div v-if="!showInput">
              <p>{{ detail.titre }}</p>
            </div>
            <div v-else>
              <b-form-input
                id="input-2"
                v-model="form.titre"
                required
              ></b-form-input>
            </div>
            <h3>Contenu de l'article</h3>
            <div v-if="!showInput">
              <p>{{ detail.contenu }}...</p>
            </div>
            <div v-else>
              <b-form-textarea
                id="textarea-large"
                v-model="form.contenu"
                placeholder="Entrez le contenu de votre fiche"
                rows="6"
                required
              ></b-form-textarea>
            </div>
            <h3>Produits</h3>
            <div
              v-if="!showInput"
              class="d-flex align-items-start justify-content-center"
            >
              <div class="mr-1">{{ getProduct(detail.produit) }}</div>
              <div
                v-if="wishlistProductId === detail.produit"
                @click="deleteToFavorite(detail.produit)"
              >
                <i class="fas fa-heart"></i>
              </div>
              <div class="heart" v-else @click="addToFavorites(detail.produit)">
                <i class="far fa-heart"></i>
              </div>
            </div>
            <div v-else>
              <b-form-select
                id="input-3"
                v-model="form.produit"
                :options="products"
                placeholder="Veuillez selectionner un produit"
                required
              ></b-form-select>
            </div>
            <h3>Catégories</h3>
            <div v-if="!showInput">
              <p>{{ getCategory(detail.categories) }}</p>
            </div>
            <div v-else>
              <b-form-select
                id="input-3"
                v-model="form.categorie"
                :options="categories"
                label-field="required"
              ></b-form-select>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import base_uri from "../constants/constants";
import Swal from "sweetalert2";
export default {
  name: "Detail",
  components: {},
  data() {
    return {
      detail: {},
      category: "",
      product: "",
      showInput: false,
      form: {
        titre: "",
        contenu: "",
        produit: "",
        categorie: "",
      },
      products: [],
      categories: [],
      wishlistProductId: null,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      axios
        .get(`${base_uri}/api/fiche/${this.$route.params.id}`)
        .then((resp) => {
          this.detail = resp.data.data[0];
          this.getProductIdByWishlist(resp.data.data[0].produit);
        })
        .catch((err) => console.log(err));
    },
    getProduct(product) {
      axios
        .get(`${base_uri}/api/product/${product}`)
        .then((resp) => {
          this.product = resp.data.data;
        })
        .catch((err) => console.log(err));
      return this.product;
    },
    getProductIdByWishlist(product) {
      axios.get(`${base_uri}/api/wishlist/${product}`).then((res) => {
        console.log(res.data.product);
        this.wishlistProductId = res.data.product;
      });
    },
    getCategory(categorie) {
      axios
        .get(`${base_uri}/api/categorie/${categorie}`)
        .then((resp) => {
          this.category = resp.data.data;
        })
        .catch((err) => console.log(err));
      return this.category;
    },
    getProductList() {
      axios
        .get(`${base_uri}/api/products`)
        .then((resp) => {
          let productsArray = [];
          resp.data.map((el) => {
            if (el.nom) {
              productsArray.push({
                value: el.id,
                text: el.nom,
              });
            }
          });
          console.log(productsArray);
          this.products = productsArray;
        })
        .catch((err) => console.log(err));
    },
    getCategoriesList() {
      axios
        .get(`${base_uri}/api/categories`)
        .then((resp) => {
          let categoriesArray = [];
          resp.data.map((el) => {
            if (el.label) {
              categoriesArray.push({
                value: el.id,
                text: el.label,
              });
            }
          });
          this.categories = categoriesArray;
        })
        .catch((err) => console.log(err));
    },
    switchField(detail) {
      this.form.titre = detail.titre;
      this.form.contenu = detail.contenu;
      this.form.produit = detail.produit;
      this.form.categorie = detail.categories;
      this.showInput = !this.showInput;
      this.getProductList();
      this.getCategoriesList();
    },
    updateField() {
      axios
        .put(`${base_uri}/api/updateFiche/${this.$route.params.id}`, this.form)
        .then((resp) => {
          if (resp.status === 200) {
            console.log(resp);
            this.init();
            this.showInput = !this.showInput;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addToFavorites(produit) {
      axios
        .post(`${base_uri}/api/wishlist`, { produit })
        .then((resp) => {
          axios.get(`${base_uri}/api/wishlist/${produit}`).then((res) => {
            this.wishlistProductId = res.data.product;
          });
          Swal.fire(
            "Produit ajouté à la wishlist!",
            resp.data.message,
            "success"
          ).then(() => this.init());
        })
        .catch((err) => console.log(err));
    },
    deleteToFavorite(produit) {
      axios
        .delete(`${base_uri}/api/wishlist/${produit}`)
        .then((resp) => {
          Swal.fire(
            "Produit retiré de la wishlist!",
            resp.data.message,
            "success"
          ).then(() => this.init());
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="css" scoped>
.heart {
  cursor: pointer !important;
}
.heart > i {
}
</style>
