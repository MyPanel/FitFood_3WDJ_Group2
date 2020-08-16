<template>
  <v-container class="my-5">
    <v-layout column>
      <v-flex xs6 style="margin-top:30px;">
        <v-layout align-center justify-center row>
          <v-flex xs6 md6 justify-center>
            <v-layout justify-center>
              <v-img src="/static/iphone3.png" class="ma-10" max-width="90%"></v-img>
            </v-layout>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs6 md6>
            <v-layout justify-center>
              <span class="text-xs-left text-md-left">
                <div
                  class="orange--text mt-4"
                  style="margin-bottom:15px; font-family : 'MapoPeacefull';"
                >App</div>
                <div class="justify-center">
                  <h1 class="black--text font-weight-bold" style="font-family : 'MapoPeacefull';">
                    タッチ一回で
                    <br />健康を守れる！
                  </h1>
                </div>
                <div class="mt-4" style="font-family : 'MapoPeacefull';">
                  iOS及びAndroid向けに設計されたFITFOODアプリを使うと、
                  <br />撮影ボタンを一回タッチすることで食事の栄養分析はもちろん、
                  <br />元気な食事を補助するサービスの利用ができます。
                  <br />また、モバイル環境でさらに便利に栄養分析
                  <br />グラフサービスとお勧めの食事サービスを
                  <br />ご利用できます。
                </div>
                <div
                  class="mt-4"
                  style="margin-bottom:15px; font-family : 'MapoPeacefull';"
                >元気な食事、ここから始めましょう！</div>
                <v-btn
                  color="orange"
                  class="white--text"
                  style="font-family : 'MapoPeacefull';"
                  rounded
                  large
                  router
                  :to="{name: 'signup'}"
                >START</v-btn>
              </span>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style scoped>
@font-face {
  font-family: "MapoPeacefull";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/MapoPeacefullA.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
</style>