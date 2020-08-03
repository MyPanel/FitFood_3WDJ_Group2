<template>
  <v-img src="/static/web_main.png">
    <HomeJumbotron />
    <HomeContext />
    <HomeIntroduce />
  </v-img>
</template>

<script>
import HomeJumbotron from "./HomeJumbotron";
import HomeContext from "./HomeContext";
import HomeIntroduce from "./HomeIntroduce";

export default {
  name: "home",
  components: {
    HomeJumbotron,
    HomeContext,
    HomeIntroduce
  }
};
</script>
