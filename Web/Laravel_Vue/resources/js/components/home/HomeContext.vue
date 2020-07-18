<template>
  <div>
    <v-container fluid grid-list-lg class="my-1">
      <v-layout row wrap align-center text-xs-center style="margin-top:50px;">
        <v-flex xs12 text-md-center text-xs-center style="margin-bottom:20px;">
          <h5
            class="orange--text font-weight-bold"
            style="margin-bottom:3px; font-family : 'MapoPeacefull';"
          >Service</h5>
          <h2
            class="grey--text text--darken-4 font-weight-bold"
            style="margin-bottom:5px; font-family : 'MapoPeacefull';"
          >우리의 서비스</h2>
        </v-flex>
        <v-flex
          xs12
          sm8
          md8
          lg4
          style="margin-bottom:20px; font-family : 'MapoPeacefull';"
          v-for="card in service"
          :key="card.title"
        >
          <v-container>
            <v-layout column align-center text-xs-center>
              <v-card
                shaped
                elevation="8"
                justify-center
                fill-height
                wrap
                style="width:60%; height: 120px; border-top-left-radius: 2em;border-bottom-right-radius: 2em;"
              >
                <v-layout column align-center text-xs-center>
                  <v-card-actions>
                    <v-btn fab dark small color="orange">
                      <v-icon dark>{{ card.icon }}</v-icon>
                    </v-btn>
                  </v-card-actions>
                  <v-card-title>
                    <h5
                      class="grey--text text--darken-4 font-weight-bold"
                      style=" font-family : 'MapoPeacefull';"
                    >{{ card.title }}</h5>
                  </v-card-title>
                  <v-card-subtitle>
                    <div
                      class="grey--text text--darken-2"
                      style="font-family : 'MapoPeacefull';"
                    >{{ card.text }}</div>
                  </v-card-subtitle>
                </v-layout>
              </v-card>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      service: [
        {
          icon: "mdi-finance",
          title: "영양소 분석 그래프",
          text: "graph"
        },
        {
          icon: "mdi-thumb-up-outline",
          title: "식단추천",
          // text : ' 음식점 추천 서비스는 사용자의 섭취 영양소를 토대로 부족한 영양소를 섭취할 수 있는 학교 주변 음식점의 메뉴를 추천해 줍니다. 음식 추천 서비스는 등록되지 않은 음식점에 가서 식사를 하고 싶은 사용자나 집에서 밥을 해 먹는 사용자를 위해 부족한 영양소를 섭취할 수 있는 음식 추천하고 해당 레시피를 제공하는 서비스입니다.'
          text: "recommend"
        },
        {
          icon: "mdi-note-outline",
          title: "리뷰 게시판",
          // text : '학교 주변의 음식점 위치와 해당 음식점의 메뉴, 가격, 나오는 시간 등의 정보를 확인할 수 있습니다. 사용자는 음식점의 메뉴에 리뷰 작성이 가능하고 댓글 기능으로 게시판으로도 활용이 가능한 서비스 입니다.'
          text: "review"
        }
      ]
    };
  }
};
</script>

<style scoped>
@font-face {
  font-family: "MapoPeacefull";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/MapoPeacefullA.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
</style>
