<template>
  <div class="browse">
    <h4>Select as many people as you would like.</h4>
    <h4>Then click "View Parents" to see parental relations.</h4>
    <ImageList :photos="photos"/>
  </div>
</template>

<script>
import axios from 'axios';
import ImageList from "../components/ImageList.vue"
export default {
  name: 'Browse',
  components: {
    ImageList
  },
  data() {
    return {
      photos: [],
      error: '',
    }
  },
  created() {
    this.getPhotos();
  },
  methods: {
    async getPhotos() {
      try {
        let response = await axios.get("/api/photos");
        this.photos = response.data;
        // console.log(this.photos)
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
  }
}
</script>

<style scoped>
  h4 {
    margin-inline: 30vw;
  }
</style>