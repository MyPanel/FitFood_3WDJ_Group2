<template>
  <v-app class="white">
    <Navbar />
    <v-content>
      <router-view></router-view>
    </v-content>
    <!-- <Footer /> -->
  </v-app>
</template>

<script>
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default {
  name: 'App',
  components: { Navbar, Footer },
  data(){
    return {

    }
  }
}
</script>
