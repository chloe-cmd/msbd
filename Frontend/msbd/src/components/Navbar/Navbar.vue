<template>
  <b-navbar toggleable="sm" type="light" variant="light">
    <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

    <b-navbar-brand>MSBD</b-navbar-brand>

    <b-collapse id="nav-text-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="/">
          Catégories
        </b-nav-item>
        <b-nav-item href="/wishlist">
          Wishlist
        </b-nav-item>
        <b-nav-item href="/addfiches">
          Ajouter une fiche
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
  components: {},
  data() {
    return {
      isMenuOpen: false,
      isDropdownOpen: false,
    };
  },

  methods: {},
};
</script>

<style></style>
