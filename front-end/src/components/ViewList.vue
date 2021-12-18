<template>
<div class="cart">
  <div class="cart-item" v-for="photo in cart" :key="photo.name">
    <div class="item">
      <div class="chosen">
        <img :src="photo.path">
        <h1>{{photo.name}}</h1>
      </div>
      <h3>Child of</h3>
      <div class="chosen-mom">
        <img :src="photo.path">
        <h1>{{photo.momName}}</h1>
      </div>
      <div class="chosen-dad">
        <img :src="photo.path">
        <h1>{{photo.dadName}}</h1>
      </div>
    </div>
    <button a @click="removeFromCart(photo)" href="#">Remove Person from Viewing</button>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ViewList',
  props: {
    cart: Array,
  },
  // computed: {
  //   async imageMom(photo) {
  //     try {
  //       console.log(photo)
  //       let response = await axios.get("/api/photos/mom");
  //       this.$root.$data.photo = response.data
  //       console.log(this.$root.$data.photo.path)
  //       console.log(photo.path)
  //       // photo.path = this.$root.$data.photo.path
  //     } catch (error) {
  //       this.error = error.response.data.message;
  //     }
  //   },
  // },
  methods: {
    async getMom() {
      try {
        console.log(this.$root.$data.cart[0])
        let response = await axios.get("/api/photos/", {
          name: this.momName
        });
        this.photos= response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
   
    removeFromCart(image) {
      const index = this.$root.$data.cart.indexOf(image);
      if (index > -1) {
        this.$root.$data.cart.splice(index, 1)
      }
    }
  }
}
</script>

<style scoped>

img {
  height: 20vh;
  border-radius: 100px;
  padding: 5px;
  border: 2px solid goldenrod;
}

button {
  height: 35px;
  margin: 20px;
  padding: 2px;

  background: goldenrod;
  color: black;
  border-radius: 10px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-weight: bold;
}

.cart-item {
  /* background-color: green; */
  height: 20vh;
  padding: 60px;
  margin: 25px;
  width: 90vw;
  border: 2px solid goldenrod;
}
.item {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-direction: row;
}

h3 {
  display: flex;
  align-items: center;
}

h1 {
  font-size: 16px;
  padding:0;
  margin: 0;
  color: black;
}

.below {
  display: flex;
  /* border: 2px black solid; */
  margin: 5px;
}

.cart {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

</style>