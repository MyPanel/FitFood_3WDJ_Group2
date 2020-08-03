<template>
  <v-layout max-height="100vh">
    <v-container fill-height>
      <v-layout>
        <v-flex text-xs-left>
          <div>
            <h1 class="white--text">.</h1>
            <h1 class="white--text">.</h1>
            <h1 class="white--text">.</h1>
          </div>
          <h3
            class="grey--text text--darken-2 font-weight-bold"
            style="margin-bottom:15px; font-family : 'MapoPeacefull';"
          >AI基盤の食事コンサルティングサービス</h3>
          <h1
            class="display-2 grey--text text--darken-3 font-weight-bold"
            style="margin-bottom:3px; font-family : 'MapoPeacefull';"
          >Find The Most</h1>
          <h1
            class="display-2 grey--text text--darken-3 font-weight-bold"
            style="margin-bottom:3px; font-family : 'MapoPeacefull';"
          >Fitfood For Your</h1>
          <h1
            class="display-2 grey--text text--darken-3 font-weight-bold"
            style="margin-bottom:15px; font-family : 'MapoPeacefull';"
          >Body</h1>
          <div class="title white--text mt-4">
            <h5
              class="grey--text text--darken-2 font-weight-light"
              style=" font-family : 'MapoPeacefull';"
            >自分の体にぴったりな</h5>
            <h5
              class="grey--text text--darken-2 font-weight-light"
              style="margin-bottom:15px; font-family : 'MapoPeacefull';"
            >食事をしましょう！</h5>
          </div>
          <v-btn
            color="orange"
            class="white--text"
            style="font-family : 'MapoPeacefull';"
            rounded
            large
            router
            :to="{name: 'signup'}"
          >Start Now</v-btn>
          <div>
            <h1 class="white--text">.</h1>
            <h1 class="white--text">.</h1>
            <h1 class="white--text">.</h1>
            <h1 class="white--text">.</h1>
            <h1 class="white--text">.</h1>
            <h1 class="white--text">.</h1>
            <h1 class="white--text">.</h1>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
  <!-- <v-fade-transition mode="out-in">
    <v-layout column>
      <v-flex xs12>
        <div
          class="pa-5" 
          data-aos="fade-right" 
          data-aos-delay="200" >
          <v-layout align-center justify-center>
          <div>
            <h1 class=" black--text font-weight-bold">
                  Al기반 식단 컨설팅 서비스
                </h1>
                <h1 class="display-2 black--text font-weight-bold">
                  FitFood 
                </h1>
                <div class="title black--text mt-4">
                  Find your FitFood! 
                </div>
                <v-btn color="white" router :to="{name : 'survey'}" round
                 class="title font-weight-bold mt-4 pl-5 pr-5 pa-4">
                 START
                </v-btn>
          </div>
          <v-img src="/static/main1.png" class="ma-5" max-width="40%"></v-img>
          </v-layout>
        </div>
      </v-flex>
      </v-layout>
  </v-fade-transition>-->
</template>


 <style scoped>
@font-face {
  font-family: "MapoPeacefull";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/MapoPeacefullA.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
.floating {
  left: 49%;
  bottom: 5%;
}
</style>
