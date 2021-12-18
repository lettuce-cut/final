<template>
<div class="wrapper">
  <div class="images">
    <div class="image" v-for="photo in photos" :key="photo.name">
        <img :src="'.' + photo.path">
        <p>{{photo.name}}</p>
        <div class="buttons">
          <button a @click="addToCart(photo)" href="#">View</button>
          <button v-if='user' @click="deletePhoto(photo)">Delete</button>
        </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ImageList',
  props: {
    photos: Array
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
  methods:{
    addToCart(photo) {
      this.$root.$data.cart.push(photo)
    },
    async getPhotos() {
      try {
        let response = await axios.get("/api/photos/");
        this.photos= response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async deletePhoto(photo) {
      try {
        await axios.delete("/api/photos/" + photo._id);
        // this.findItem = null;
        this.getPhotos();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    
  }
}
</script>

<style scoped>
.buttons {
  display:flex;
  justify-content: center;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.images {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.image {
  margin: 10px;
  margin-top: 50px;
  width: 200px;
}

.image img {
  border: 3px solid goldenrod;
  height: 250px;
  width: 200px;
  object-fit: cover;
  border-radius: 25px;

}

p {
  padding: 0px 0px 20px 0px;
  margin: 0;
  text-align:center;
}


h1 {
  font-size: 16px;
  background-color: goldenrod;
  padding:0;
  margin: 0;
  border-radius: 25px;
  color: black;
}

button {
  height: 40px;
  width: 80px;
  background: goldenrod;
  color: black;
  border-radius: 10px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-weight: bold;
}

.auto {
  margin-left: auto;
}
</style>