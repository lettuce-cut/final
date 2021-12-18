<template>
<div>
    <h1>Viewing Parents Of:</h1>
    <ViewList :cart="cart"/>
</div>
</template>

<script>
import ViewList from "../components/ViewList.vue"
export default {
  name: 'View',
  components: {
    ViewList
  },
  computed: {
    cart() {
      return this.$root.$data.cart
    }
  },
}
</script>

<style scoped>
h1 {
  margin-inline: 40vw;
}
</style>
