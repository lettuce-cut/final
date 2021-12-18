<template>
<div>
  <MyPhotos v-if="user" />
  <HomePage v-else />
</div>
</template>

<script>
import axios from 'axios';
import HomePage from '@/components/HomePage.vue'
import MyPhotos from '@/components/MyPhotos.vue'

export default {
  name: 'home',
  components: {
    HomePage,
    MyPhotos,
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
  methods: {
    async created() {
      try {
        let response = await axios.get('/api/users');
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
  },
}
</script>
