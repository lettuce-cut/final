<template>
<div id="app">
  <div class="header">
    <div class="brand">
      <h1></h1>
      <h2>Parentals</h2>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/browse">Browse</router-link> | 
        <router-link to='/view'>View Parents</router-link> | 
        <router-link class='no_line' to='#' v-if="cartSize==1">{{cartSize}} Person Chosen</router-link>
        <router-link class='no_line' to='#' v-if="cartSize!=1">{{cartSize}} People Chosen</router-link>
        <button v-if='user' @click="logout" class="logout_button">Logout</button>
      </div>
    </div>

  </div>
  <div class="content">
    <router-view />
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  computed: {
    cartSize() {
      return this.$root.$data.cart.length
    },
    user() {
      return this.$root.$data.user;
    },
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
  }
}
</script>


<style>
/* green yellow red orange */
/* 96ceb4 ffeead d9534f ffad60 */
body {
  margin: 0px;
  background: brown;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: brown;
}

#nav a.router-link-exact-active {
  color: goldenrod;
}

.no_line{
  text-decoration: none;
}


.brand {
  display: flex;
  background: black;
  padding: 10px 100px;
}

.brand h1 {
  display: inline-block;
  background: brown;
  width:35px;
  height:35px;
  border-radius: 50px;
  color: goldenrod;
}

.brand h2 {
  font-size: 12px;
  padding: 10px;
  margin-top: 12px;
  color: brown;
}

.main {
  padding: 20px 100px;
}

.pure-button {
  font-size: 13px;
}

h1 {
  font-size: 16px;
}

h2 {
  font-size: 12px;
}

.space-right {
  margin-right: 10px;
}

a {
  color: #ffad60;
}

.pure-button-primary {
  background-color: goldenrod;
  color: black;
  border-radius: 30px;
}

.logout_button {
  margin-inline: 40px 0px;
  background-color: goldenrod;
  border-radius: 30px;
}
</style>
