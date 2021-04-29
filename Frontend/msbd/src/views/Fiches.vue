<template>
  <div class="fiches">
    <b-row>
      <b-col
        v-for="fiche in fiches"
        :key="fiche.id"
        class="mt-5"
        @click="getFicheById(fiche.id)"
      >
        <b-card :title="fiche.titre">
          <div class="delete-span" @click="deleteFiche(fiche.id)">
            <i class="far fa-times-circle"></i>
          </div>
          <b-card-text>
            {{ fiche.contenu }}
          </b-card-text>
          <b-link>Aller vers cette fiche</b-link>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";
import base_uri from "../constants/constants";
import Swal from "sweetalert2";

export default {
  name: "Fiches",
  components: {},
  data() {
    return {
      fiches: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      axios
        .get(
          `http://localhost:5000/api/fiches/${this.$route.params.categorieId}`
        )
        .then((res) => {
          console.log(res.data);
          this.fiches = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFicheById(id) {
      this.$router.push({ name: "Detail", params: { id } });
    },
    deleteFiche(id) {
      Swal.fire({
        title: "Etes-vous sûr de supprimer cette fiche ?",
        text: "Cette action sera irréversible!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui, je veux la supprimer!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`${base_uri}/api/fiche/${id}`)
            .then((resp) => {
              Swal.fire(
                "Fiche supprimé!",
                resp.data.message,
                "success"
              ).then(() => this.init());
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
  },
};
</script>

<style>
.delete-span {
  position: absolute;
  top: -15px;
  right: -15px;
}
.delete-span > i {
  font-size: 30px;
  cursor: pointer;
}
</style>
