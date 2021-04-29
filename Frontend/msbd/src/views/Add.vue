<template>
  <div>
    <b-container>
      <b-jumbotron class="mt-4">
        <b-row class="d-flex justify-content-center align-items-center">
          <b-col lg="6" md="8" sm="12">
            <b-form @submit="onSubmit" @reset="onReset">
              <b-form-group
                id="input-group-1"
                label="Titre de votre fiche"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.titre"
                  type="text"
                  placeholder="Entrez le titre de votre fiche"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-1"
                label="Contenu de votre fiche"
                label-for="textarea-large"
              >
                <b-form-textarea
                  id="textarea-large"
                  v-model="form.contenu"
                  placeholder="Entrez le contenu de votre fiche"
                  rows="6"
                  required
                ></b-form-textarea>
              </b-form-group>

              <b-form-group
                id="input-group-3"
                label="Produits"
                label-for="input-3"
              >
                <b-form-select
                  id="input-3"
                  v-model="form.produit"
                  :options="produits"
                  placeholder="Veuillez selectionner un produit"
                  required
                ></b-form-select>
              </b-form-group>

              <b-form-group
                id="input-group-3"
                label="Catégories"
                label-for="input-3"
              >
                <b-form-select
                  id="input-3"
                  v-model="form.categorie"
                  :options="categories"
                  label-field="required"
                ></b-form-select>
              </b-form-group>

              <b-button block type="submit" variant="success">Envoyer</b-button>
            </b-form>
          </b-col>
        </b-row>
      </b-jumbotron>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import base_uri from "../constants/constants";
import Swal from "sweetalert2";

export default {
  name: "Add",
  data() {
    return {
      form: {
        titre: "",
        contenu: "",
        produit: null,
        categorie: null,
      },
      produits: [],
      categories: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      axios
        .all([
          axios.get(`${base_uri}/api/categories`),
          axios.get(`${base_uri}/api/products`),
        ])
        .then(
          axios.spread((...resp) => {
            let arrayOne = [];

            let arrayTwo = [];

            resp[0].data.map((el) => {
              if (el.label) {
                arrayOne.push({
                  value: el.id,
                  text: el.label,
                });
              }
            });
            resp[1].data.map((el) => {
              if (el.nom) {
                arrayTwo.push({
                  value: el.id,
                  text: el.nom,
                });
              }
            });
            this.produits = arrayOne;
            this.categories = arrayTwo;
          })
        )
        .catch((err) => {
          console.log(err);
        });
    },
    onSubmit(event) {
      event.preventDefault();
      axios
        .post(`${base_uri}/api/fiches`, this.form)
        .then((resp) => {
          Swal.fire({
            title: "Good Job !",
            text: resp.data.response,
            icon: "success",
          }).then(() => {
            this.onReset();
            this.$router.push("/");
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onReset() {
      // Reset our form values
      this.form.titre = "";
      this.form.contenu = "";
      this.form.produit = null;
      this.form.categorie = null;
    },
  },
};
</script>
