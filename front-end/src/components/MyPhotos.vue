<template>
<div class="main">
  <h2>Logged in as: {{user.firstName}} {{user.lastName}}</h2>
  <h1>My Photos</h1>
  <div>
    <button @click="setCreating" class="pure-button button-xsmall">
        <i class="fas fa-plus" />
    </button>
    </div>

    <form class="pure-form" v-if="creating" @submit.prevent="upload">
       <legend>Add to the Family</legend>
        <fieldset>
          <input v-model="name" placeholder="Main person in photo?">
        </fieldset>
        <fieldset>
          <textarea v-model="momName" placeholder="Mom's name"></textarea>
        </fieldset>
        <!-- original had v-model="description" -->
        <fieldset>
          <textarea v-model="dadName" placeholder="Dad's name"></textarea>
        </fieldset>
       <fieldset>
          <div class="imageInput" @click="chooseImage">
            <img v-if="url" :src="url" />
            <div v-if="!url" class="placeholder">
              Choose an Image
            </div>
            <input class="fileInput" ref="fileInput" type="file" @input="fileChanged">
          </div>
          <p v-if="error" class="error">{{error}}</p>
        </fieldset>
        <fieldset class="buttons">
          <button type="button" @click="close" class="pure-button">Close</button>
          <button type="submit" class="pure-button pure-button-primary right">Upload</button>
        </fieldset>
    </form>
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
  name: 'MyPhotos',
  data() {
        return {
        creating: false,
        name: '',
        momName: '',
        dadName:'',
        url: '',
        file: null,
        error: '',
        }
    },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  methods: {
    async getPhotos() {
      try {
        let response = await axios.get("/api/photos");
        this.photos = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    //below function was getTickets and photos was tickets
    
    created() {
        this.getPhotos();
    },
    time(d) {
      return moment(d).format('D MMMM YYYY, h:mm:ss a');
    },
    setCreating() {
        this.creating = true;
    },
    cancelCreating() {
        this.creating = false;
    },
    fileChanged(event) {
            this.file = event.target.files[0];
            this.url = URL.createObjectURL(this.file);
        },
    close() {
      this.$emit('close');
    },
    chooseImage() {
        this.$refs.fileInput.click()
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name);
        formData.append('name', this.name);
        formData.append('momName', this.momName);
        formData.append('dadName', this.dadName);
        await axios.post("/api/photos", formData);
        this.creating = false,
        this.file = null;
        this.url = "";
        this.name = "";
        this.momName = "";
        this.dadName = "";
        this.$emit('uploadFinished');
      } 
      catch (error) {
        this.error = "Error: " + error.response.data.message;
      }
    }
  },
}
</script>

<style scoped>
textarea {
  width: 100%;
  max-width: 500px;
}

h3 {
  font-size: 12px;
  font-weight: normal;
  background-color: #ccc;
  padding: 10px 20px;
}


label {
  background-color: #000;
  color: white;
  padding: 5px;
  border-radius: 30px;
  font-size: 12px;
  margin-right: 10px;
}

</style>