<template>
  <v-flex xs12>
    <v-card>
      <v-toolbar flat color="orange">
        <v-toolbar-title class="white--text" style="font-family : 'MapoPeacefull';">レビュー</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn color="white" class="mb-2 orange--text"  style="font-family : 'MapoPeacefull';" @click="mdUp">レビュー作成</v-btn>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="reviews"
        :loading="loading"
        :sort-by="['created_at']"
        :sort-desc="[true]"
        class="elevation-1"
        style="font-family : 'MapoPeacefull';"
      >
        <template v-slot:item.review_title="{item}">
          <div style="font-family : 'MapoPeacefull';" @click="rowClick(item)">{{item.review_title}}</div>
        </template>
        <template v-slot:item.user_id="{item}">
          <v-chip class="ma-2" color="orange"  outlined pill>
            {{item.user_id}}
            <v-icon right>mdi-account-outline</v-icon>
          </v-chip>
        </template>
        <template v-slot:item.created_at="{item}">
          <v-chip class="ma-2" color="orange" outlined pill>
            {{
            item.created_at
            }}
          </v-chip>
        </template>
        <template v-slot:item.review_id="{item}"> 
          <v-chip>
             <v-btn class="mx-0" @click="editItem(item.review_id)">
                <v-icon color="teal" style="font-family : 'MapoPeacefull';">{{ icons.mdiPencil }}</v-icon>
              </v-btn>
              <v-btn icon class="mx-0" @click="deleteItem(item.review_id)">
                <v-icon dark color="pink" style="font-family : 'MapoPeacefull';">{{ icons.mdiDelete }}</v-icon>
              </v-btn>
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="orange--text" style="font-family : 'MapoPeacefull';">レビュー作成</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="題目" style="font-family : 'MapoPeacefull';" v-model="form.review_title" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea label="内容" style="font-family : 'MapoPeacefull';" v-model="form.review_message" required></v-textarea>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-rating
                  v-model="form.review_star_rating"
                  color="yellow darken-3"
                  background-color="grey darken-1"
                  empty-icon="$vuetify.icons.ratingFull"
                  half-increments
                  hover
                ></v-rating>
              </v-col>
            </v-row>
          </v-container>
          <small style="font-family : 'MapoPeacefull';">不適切な内容は処罰の対象になります。</small>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1" style="font-family : 'MapoPeacefull';"></div>
          <v-btn color="orange darken-1" style="font-family : 'MapoPeacefull';" text @click="close()">Close</v-btn>
          <v-btn color="orange darken-1" style="font-family : 'MapoPeacefull';" text @click="postSuggestion()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

        <v-dialog v-model="edit_dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="orange--text" style="font-family : 'MapoPeacefull';">レビュー修正</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="題目" style="font-family : 'MapoPeacefull';" v-model="edit_form.review_title" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea label="内容" style="font-family : 'MapoPeacefull';" v-model="edit_form.review_message" required></v-textarea>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-rating
                  v-model="edit_form.review_star_rating"
                  color="yellow darken-3"
                  background-color="grey darken-1"
                  empty-icon="$vuetify.icons.ratingFull"
                  half-increments
                  hover
                ></v-rating>
              </v-col>
            </v-row>
          </v-container>
          <small style="font-family : 'MapoPeacefull';">不適切な内容は処罰の対象になります。</small>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="orange darken-1" style="font-family : 'MapoPeacefull';" text @click="close()">Close</v-btn>
          <v-btn color="orange darken-1" style="font-family : 'MapoPeacefull';" text @click="edit_postSuggestion()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script>
import axios from "axios";
import {
    mdiPencil,
    mdiDelete
  } from '@mdi/js'
export default {
  name: "review",
  data() {
    return {
      dialog: false,
      edit_dialog:false,
      form: {
        review_title: "",
        review_message: "",
        review_star_rating: 0,
      },
      edit_form: {
        review_id:0, //수정할 아이디값
        review_title: "",
        review_message: "",
        review_star_rating: 0,
      },
       icons: {
        mdiPencil,
        mdiDelete
      },
      updateMode: false,
      reviews: [],
      editedIndex: false,
      headers: [
        { text: "題目", value: "review_title", sortable: true },
        {
          text: "著者",
          value: "user_id",
          width: 150,
          sortable: false
        },
        {
          text: "日数",
          value: "created_at",
          sortable: true,
          width: 300,
          class: "hidden-sm-and-down"
        },
        { 
          text: ' ',
          value: 'review_id', sortable: false }
      ],
      loading: false
    };
  },
  created() {
    this.getSuggestions();
  },
  
  methods: {
    rowClick(item) {
      this.$router.push({
        path: `/review/detail/${item.review_id}`,
        params: {id: item.review_id}
      });
    },
    mdUp() {
      // this.editedIndex = false;
      this.dialog = true;
      // this.editedIndex = -1;
      this.updateMode = false;
    },
    getSuggestions() {
      if (this.loading) return;
      this.loading = true;
      axios
        .get("/showReview/"+this.$route.params.id)
        .then(response => {
          this.reviews = response.data;
          this.loading = false;         
          console.log("리뷰",this.reviews);
          // console.log(response);
        })
        .catch(e => {
          console.log(e);
          this.loading = false;
        });
    },
    postSuggestion() {
      this.dialog = false;
        axios
        .post('/storeReview', 
        {
          review_title: this.form.review_title,
          review_message: this.form.review_message,
          review_star_rating: this.form.review_star_rating,
          store_id: this.$route.params.id,
        })
        .then(res => {
          console.log("스토어리뷰",res.data);
          this.getSuggestions();
        })
        .catch(e => {
          console.log(e);
        });
    },
    edit_postSuggestion() {

      this.dialog = false;
        axios
        .post('/updateReview', 
        {
          review_title: this.edit_form.review_title,
          review_message: this.edit_form.review_message,
          review_star_rating: this.edit_form.review_star_rating,
          store_id: this.$route.params.id,
          review_id: this.edit_form.review_id
        })
        .then(res => {
          console.log("스토어리뷰",res.data);
          this.getSuggestions();
        })
        .catch(e => {
          console.log(e);
        });

      console.log("수정 아이디값",this.edit_form.review_id) // 여기서 수정 요청
    },
    id2date(created_at) {
      if (!created_at) return "まちがった時間情報";
      return new Date(
        parseInt(created_at.substring(0, 8), 16) * 1000
      ).toLocaleString();
    },
    editItem(id){
    console.log("에디트 실행");
    // this.editedIndex = true;
    this.edit_form.review_id = id;
    // console.log("수정 아이디값", this.edit_form.review_id);
    this.edit_dialog=true;
    this.updateMode = true;
  },
    deleteItem(id) {

      this.edit_form.review_id = id;

      axios
        .post('/deleteReview', 
        {
          review_id: this.edit_form.review_id,
          store_id: this.$route.params.id,
        })
        .then(res => {
          console.log(res.data);
          this.getSuggestions();
        })
        .catch(e => {
          console.log(e);
        });

    console.log("딜리트 실행");
  },
    close(){
    this.dialog=false
    this.edit_dialog=false
    this.form.review_title = "";
    this.form.review_message = "";
    this.form.review_star_rating = 0;
    this.edit_form.review_title = "";
    this.edit_form.review_message = "";
    this.edit_form.review_star_rating = 0;
  }
  },
};
</script>

<style>
@font-face { font-family: 'MapoPeacefull'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/MapoPeacefullA.woff') format('woff'); font-weight: normal; font-style: normal; }

/* .mytable table tr {
    background-color: lightgoldenrodyellow;
    border-bottom: none !important;
} */
</style>