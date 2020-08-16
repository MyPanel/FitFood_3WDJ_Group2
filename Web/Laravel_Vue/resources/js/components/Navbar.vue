
<template>
  <v-layout>
    <v-app-bar
      v-scroll="onScroll"
      app
      :flat="!isScrolling"
      :color="!isScrolling ? 'transparent' : '#FFFFFF'"
      style="z-index: 9999; "
    >
      <v-app-bar-nav-icon color="orange" dark @click="drawer =!drawer"></v-app-bar-nav-icon>
      <!-- <v-toolbar-title class="text-uppercase white--text">
        <span class="orange--text font-weight-light" style="font-family : 'MapoPeacefull';">Fit</span>
        <span class="orange--text" style="font-family : 'MapoPeacefull';">Food</span>
      </v-toolbar-title>-->
      <router-link to="/">
        <img
          v-if="this.$route.name == 'home'"
          :src="!isScrolling ? '/static/web_logo2.png':'/static/web_logo2.png'"
          id="top"
          height="17"
          style="margin-left : 50px;"
        />
        <img v-else src="/static/web_logo2.png" id="top" height="17" style="margin-left : 50px;" />
      </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          v-if="this.user_email"
          text
          class="grey--text text--darken-4"
          @click.prevent="signOut"
          style="font-family : 'MapoPeacefull';"
        >Logout</v-btn>
        <v-btn
          v-else
          text
          to="/login"
          class="grey--text text--darken-4"
          style="font-family : 'MapoPeacefull';"
        >Login</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" height="450" width="95" class="border_line" temporary>
      <v-list-item dense nav two-line :class="miniVariant && 'px-0'">
        <v-list-item></v-list-item>
      </v-list-item>
      <div>
        <v-list-item v-for="item in items" :key="item.title" link router :to="item.route">
          <div>
            <v-list-item-icon>
              <v-flex>
                <v-btn text icon color="orange" class="icon_center">
                  <v-icon medium dark>{{ item.icon }}</v-icon>
                </v-btn>
              </v-flex>
            </v-list-item-icon>
            <div class="text-center">
              <v-list-item-title class="text_font font-weight-bold">{{ item.title }}</v-list-item-title>
            </div>
          </div>
        </v-list-item>
      </div>
    </v-navigation-drawer>
  </v-layout>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      isScrolling: false
    };
  },
  // computed:{
  //   ...mapGetters({
  //     authenticated: 'auth/authenticated',
  //     user:'auth/user'

  //   })
  // },
  methods: {
    // ...mapActions({
    //     signOutAction:'auth/signOut'
    // }),

    signOut() {
      axios
        .get(`http://127.0.0.1:8000/logout`)
        .then(res => {
          localStorage.removeItem("current_user");
          window.location.href = "/";
          console.log(JSON.stringify(res));
        })
        .catch(err => console.error(err));
    }
  },
  onScroll() {
    this.isScrolling =
      (window.pageYOffset || document.documentElement.scrollTop || 0) > 60;
  },
  data() {
    if (localStorage.getItem("current_user") != null) {
      console.log("현재 유저 : " + localStorage.getItem("current_user"));
      axios
        .get("/show/" + localStorage.getItem("current_user"))
        .then(res => {
          console.log(JSON.stringify(res.data));
          this.user_email = res.data.user_email;
          this.user_name = res.data.user_name;
        })
        .catch(err => console.error(err));
    }

    return {
      drawer: false,
      user_email: null,
      user_name: null,
      items: [
        { title: "グラフ", icon: "mdi-chart-pie", route: "/graph/daychart" },
        { title: "おすすめ", icon: "mdi-thumb-up", route: "/recommendmain" },
        { title: "レビュー", icon: "mdi-comment-edit", route: "/review" },
        { title: "お店見る", icon: "mdi-swap-vertical-circle", route: "/income" },
        { title: "お店登録", icon: "mdi-store", route: "/newstore" }
      ],
      right: null,
      miniVariant: false
    };
  }
};
</script>

<style>
.text_font {
  font-size: 0.75rem;
  margin-top: 20px;
}
.border_line {
  border-radius: 15px;
}
.icon_center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>


