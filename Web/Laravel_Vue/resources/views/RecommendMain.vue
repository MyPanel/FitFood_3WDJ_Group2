<template>
    <v-container>
        <v-layout>
            <v-flex>
                <h1 class="green--text font-weight-bold" style="text-align:center; font-family : 'MapoPeacefull';"></h1>

                <div style="margin-top: 100px; text-align:center; font-family : 'MapoPeacefull';" v-if="check">
                    <h1 class="font-weight-bold"><strong class="success--text"> 朝ご飯 </strong> は食べましたか?</h1>
                    <v-btn color="orange" class="mb-2 white--text" style="margin-right: 40px; margin-top:30px;" @click="breakfast_yes()">はい</v-btn>
                    <v-btn color="orange" class="mb-2 white--text" style="margin-top:30px;" @click="breakfast_no()">いいえ</v-btn>
                </div>

                <!-- 리스트 -->
                <div v-else>
                    <v-layout style="margin-top:80px;" justify-center>
                        <!-- 아침 리스트 -->
                        <v-flex xs12 sm10 md6 justify-center v-show="value==3">
                            <h2 class="font-weight-bold" style="font-family : 'MapoPeacefull';">朝食</h2>
                
                                               
                                <v-layout>
                                    <v-flex xs3 sm3 md12>
                                        <!-- <v-card class="d-flex flex-wrap" style="margin-top:30px; border-top-right-radius: 4em; border-bottom-left-radius: 4em;"> -->
                                            <div v-for="(recommend,i) in breakfast" v-bind:key="`${i}-${recommend.id}`">              
                                                <v-card width="330px" height="400px" style="margin-top:25px; margin-bottom:40px; border-top-right-radius: 2em; border-bottom-left-radius: 2em;" :elevation="4">
                                                    <div v-if="break_mealkind == 0">
                                                        <router-link rounded :to="{ name: 'Detailed',params : {id: recommend.store_id}}">
                                                        <v-card-media style="font-family : 'MapoPeacefull';">
                                                            <v-img height="250px" width="330px" style="border-top-right-radius: 2em; border-bottom-left-radius: 2em;" :src="recommend.image"></v-img>
                                                        </v-card-media>                                                   
                                                        </router-link>
                                                    </div>

                                                    <div v-else-if="break_mealkind ==1">
                                                        <router-link rounded :to="{ name: 'Recipe',params : {id: recommend.id}}">
                                                        <v-card-media style="font-family : 'MapoPeacefull';">
                                                            <v-img height="250px" width="330px" style="border-top-right-radius: 2em; border-bottom-left-radius: 2em;" :src="recommend.image"></v-img>
                                                        </v-card-media>
                                                        </router-link>
                                                    </div>

                                                    <v-card-title primary-title>
                                                        <h1 class="black--text font-weight-bold" style="margin-top: 6px; font-family : 'MapoPeacefull';">{{recommend.recommend_name}}</h1>
                                                    </v-card-title>
                                                    
                                                    <div v-if="break_mealkind == 0" style="pointer-events: none; margin-left:10px;">
                                                            <v-rating v-model="rating" background-color="orange lighten-3" color="orange" style="margin-top: 15px;" medium></v-rating>
                                                    </div>
                                                </v-card>
                                            </div>
                                        <!-- </v-card> -->
                                    </v-flex>
                                </v-layout>
                            
                        </v-flex>

                        <!-- 점심 리스트 -->
                        <v-flex xs12 sm10 md6 justify-center v-show="value==3||value==2">
                            <h2 class="font-weight-bold" style="font-family : 'MapoPeacefull';">昼食</h2>
                               
                                <v-layout justify-center>
                                    <v-flex xs3 sm3 md12>
                                        <!-- <v-card class="d-flex flex-wrap" style="margin-top:30px;">                    -->
                                            <div v-for="(recommend,i) in lunch" v-bind:key="`${i}-${recommend.id}`">              
                                                <v-card width="330px" height="400px" style="margin-top:25px; margin-bottom:40px; border-top-right-radius: 2em; border-bottom-left-radius: 2em; font-family : 'MapoPeacefull';" :elevation="4">
                                                    <div v-if="lunch_mealkind == 0">
                                                        <router-link rounded :to="{ name: 'Detailed',params : {id: recommend.store_id}}">
                                                        <v-card-media style="font-family : 'MapoPeacefull';">
                                                            <v-img height="250px" width="330px" style="border-top-right-radius: 2em; border-bottom-left-radius: 2em;" :src="recommend.image"></v-img>
                                                        </v-card-media>
                                                        </router-link>
                                                    </div>

                                                    <div v-else-if="lunch_mealkind ==1">
                                                        <router-link rounded :to="{ name: 'Recipe',params : {id: recommend.id}}">
                                                        <v-img height="250px" width="330px" style="border-top-right-radius: 2em; border-bottom-left-radius: 2em;" :src="recommend.image"></v-img>
                                                        </router-link>
                                                    </div>

                                                    <v-card-title primary-title>
                                                        <h1 class="black--text font-weight-bold" style="margin-top: 6px; font-family : 'MapoPeacefull';">{{recommend.recommend_name}}</h1>
                                                    </v-card-title>

                                                    <div v-if="lunch_mealkind == 0" style="pointer-events: none; margin-left:10px;">
                                                            <v-rating v-model="rating" background-color="orange lighten-3" color="orange" style="margin-top: 15px;" medium></v-rating>
                                                    </div>
                                                </v-card>
                                            </div>
                                        <!-- </v-card> -->
                                    </v-flex>
                                </v-layout>
                        </v-flex>

                        <!-- 저녁 -->
                        <v-flex xs12 sm10 md6 justify-center>
                            <h2 class="font-weight-bold" style="font-family : 'MapoPeacefull';">夕食</h2>
                              
                                <v-layout justify-center>
                                    <v-flex xs3 sm3 md12>
                                        <!-- <v-card class="d-flex flex-wrap" style="margin-top:30px;">                    -->
                                            <div v-for="(recommend,i) in dinner" v-bind:key="`${i}-${recommend.id}`">              
                                                <v-card width="330px" height="400px" style="margin-top:25px; margin-bottom:40px; border-top-right-radius: 2em; border-bottom-left-radius: 2em; font-family : 'MapoPeacefull';" :elevation="4">
                                                    <div v-if="dinner_mealkind == 0">
                                                        <router-link rounded :to="{ name: 'Detailed',params : {id: recommend.store_id}}">
                                                        <v-card-media style="font-family : 'MapoPeacefull';">
                                                            <v-img height="250px" width="330px" style="border-top-right-radius: 2em; border-bottom-left-radius: 2em;" :src="recommend.image"></v-img>
                                                        </v-card-media>
                                                        </router-link>
                                                    </div>

                                                    <div v-else-if="dinner_mealkind ==1">
                                                        <router-link rounded :to="{ name: 'Recipe',params : {id: recommend.id}}">
                                                        <v-img height="250px" width="330px" style="border-top-right-radius: 2em; border-bottom-left-radius: 2em;" :src="recommend.image"></v-img>
                                                        </router-link>
                                                    </div>

                                                    <v-card-title primary-title>
                                                        <h1 class="black--text font-weight-bold" style="margin-top: 6px; font-family : 'MapoPeacefull';">{{recommend.recommend_name}}</h1>
                                                    </v-card-title>

                                                    <div v-if="dinner_mealkind == 0" style="pointer-events: none; margin-left:10px;">
                                                            <v-rating v-model="rating" background-color="orange lighten-3" color="orange" style="margin-top: 15px;" medium></v-rating>
                                                    </div>
                                                </v-card>
                                            </div>
                                        <!-- </v-card> -->
                                    </v-flex>
                                </v-layout>
                        </v-flex>
                    </v-layout>
                </div>

                <v-dialog v-model="dialog1" persistent max-width="400px">
                    <v-card>
                        <div>
                            <v-card-title> 
                            <span class="headline font-weight-bold" style="margin-top:20px; margin-bottom:20px; font-family : 'MapoPeacefull';">朝ご飯で何を食べましたか?</span>
                            </v-card-title>
                            <v-divider :inset="inset"></v-divider>

                            <v-card-text>
                                <v-container>
                                    <v-row class="justify-center">
                                        <v-col cols="10" class="justify-center">
                                            <v-text-field v-model="break_input" style="font-family : 'MapoPeacefull'; text-align:center;" placeholder="何を食べましたか。" filled rounded dense></v-text-field>
                                        </v-col>

                                        <v-flex>
                                            <h2 class="orange--text font-weight-bold" style="text-align:center; margin-top:20px; font-family : 'MapoPeacefull';">昼ご飯は、どうやって食べますか？</h2>
                                            
                                            <v-layout justify-center>
                                                <v-radio-group row v-model="lunch_mealkind" class="justify-center">
                                                    <v-radio label="食堂" style="font-family : 'MapoPeacefull';" color="orange" value="0"></v-radio>
                                                    <v-radio label="レシピ" style="font-family : 'MapoPeacefull';" color="orange" value="1"></v-radio>
                                                </v-radio-group>
                                            </v-layout>
                                        
                                            <h2 class="orange--text font-weight-bold" style="text-align:center; margin-top:20px; font-family : 'MapoPeacefull';">夕ご飯は、どうやって食べますか？</h2>
                                            
                                            <v-layout justify-center>
                                                <v-radio-group row v-model="dinner_mealkind" class="justify-center">
                                                    <v-radio label="食堂" style="font-family : 'MapoPeacefull';" color="orange" value="0" ></v-radio>
                                                    <v-radio label="レシピ" style="font-family : 'MapoPeacefull';" color="orange" value="1"></v-radio>
                                                </v-radio-group>
                                            </v-layout>
                                        </v-flex>
                                    </v-row>
                                </v-container>

                                <v-divider :inset="inset"></v-divider>
                                <v-card-actions>
                                    <v-btn color="orange darken-1" style="font-family : 'MapoPeacefull';" text @click="save()">確認</v-btn>
                                    <v-btn color="orange darken-1" style="font-family : 'MapoPeacefull';" text @click="close()">取り消し</v-btn>
                                </v-card-actions>
                            </v-card-text>        
                        </div>                                              
                    </v-card>
                </v-dialog>

                <v-dialog v-model="dialog2" persistent max-width="400px">
                    <v-card>
                        <div>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-flex>
                                            <h2 class="orange--text font-weight-bold" style="text-align:center; margin-top:20px; font-family : 'MapoPeacefull';">朝ご飯は、どうやって食べますか？</h2>
                                            
                                            <v-layout justify-center>
                                                <v-radio-group row v-model="break_mealkind" class="justify-center">
                                                    <v-radio label="食堂" style="font-family : 'MapoPeacefull';" color="orange" value="0"></v-radio>
                                                    <v-radio label="レシピ" style="font-family : 'MapoPeacefull';" color="orange" value="1"></v-radio>
                                                </v-radio-group>
                                            </v-layout>

                                            <h2 class="orange--text font-weight-bold" style="text-align:center; margin-top:20px; font-family : 'MapoPeacefull';">昼ご飯は、どうやって食べますか？</h2>
                                            
                                            <v-layout justify-center>
                                                <v-radio-group row v-model="lunch_mealkind" class="justify-center">
                                                    <v-radio label="食堂" style="font-family : 'MapoPeacefull';" color="orange" value="0"></v-radio>
                                                    <v-radio label="レシピ" style="font-family : 'MapoPeacefull';" color="orange" value="1"></v-radio>
                                                </v-radio-group>
                                            </v-layout>
                                        
                                            <h2 class="orange--text font-weight-bold" style="text-align:center; margin-top:20px; font-family : 'MapoPeacefull';">夕ご飯は、どうやって食べますか？</h2>
                                            
                                            <v-layout justify-center>
                                                <v-radio-group row v-model="dinner_mealkind" class="justify-center">
                                                    <v-radio label="食堂" style="font-family : 'MapoPeacefull';" color="orange" value="0" ></v-radio>
                                                    <v-radio label="レシピ" style="font-family : 'MapoPeacefull';" color="orange" value="1"></v-radio>
                                                </v-radio-group>
                                            </v-layout>
                                        </v-flex>
                                    </v-row>
                                </v-container>

                                <v-divider :inset="inset"></v-divider>
                                <v-card-actions>
                                    <v-btn color="orange darken-1" style="font-family : 'MapoPeacefull';" text @click="save()">確認</v-btn>
                                    <v-btn color="orange darken-1" style="font-family : 'MapoPeacefull';" text @click="close()">取り消し</v-btn>       
                                    </v-card-actions>
                                </v-card-text>        
                        </div>                                              
                    </v-card>
                </v-dialog>

            </v-flex>
        </v-layout>
    <br>
    <br>
    <br>
    <br>
    <br>

    </v-container>
</template>
<script>
import axios from 'axios'
import { mdiConsoleLine } from '@mdi/js'

export default {
	name: 'RecommendMain',
	data() {
        return {
            dialog1: false, //아침 먹었을 때
            dialog2: false, //아침 안 먹었을 때 
            recommends: [],
            user_id : "",
            break_input:'', //아침 밥 입력 값
            break_mealkind:"0", //다이얼 창 아침 라디오 버튼
            lunch_mealkind:"0", //다이얼 창 점심 라디오 버튼
            dinner_mealkind:"0", //다이얼 창 저녁 라디오 버튼
            check:true,
            mealKind: "", //아점저 식당 레시피 0,0,0 보낼때는 kind로 보낼것
            // mealKind: "", //아점저 체크
            value:"", // 3이면 아점저, 2면 점저
            breakfast:[], //아침밥 추천값
            lunch:[], // 점심밥 추천값
            dinner:[], // 저녁밥 추천값
            inset: false,
            rating:3,
        }
    },
    methods: {
        breakfast_yes(){
            this.dialog1 = true;
            this.value=2;
        },
        breakfast_no(){
            this.dialog2 = true;
            this.value=3;
            // this.mealKind = "0,0,0";
            console.log("아침 안 먹음");
        },
        save(){
            console.log("세이브 버튼 눌림")
            // this.mealKind ="0,0,0";
            this.dialog1 = false;
            this.dialog2 = false;
            this.check= false;

            axios.post('/saveBreak',{   // foods에서 사용자가 먹은 음식 이름 토대로 정보 검색 후 foodeatens에 저장
                food_name: this.break_input,
            })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log("실패", err);
            })

            this.mealKind = "";
            console.log("아침, 점심, 저녁 : ",this.break_mealkind,this.lunch_mealkind,this.dinner_mealkind);
            this.mealKind += String(this.break_mealkind+","+this.lunch_mealkind+","+this.dinner_mealkind); 
            
            var formData = new FormData();
            formData.append('kind',this.mealKind);
            axios.post('http://127.0.0.1:5000/recommend/'+this.user_id,formData,{
            headers: {'Access-Control-Allow-Origin':'*'},
            })
            .then((res)=>{
            this.recommends = res.data.recommendMeals;
            console.log("데이터",this.recommends);
            this.recommends.forEach(arr =>{
                if(this.break_mealkind == 1){
                    arr[0].id = Math.abs(arr[0].id);
                }
                this.breakfast.push(arr[0]);
                if(this.lunch_mealkind == 1){
                    arr[1].id = Math.abs(arr[1].id);
                }
                this.lunch.push(arr[1]);
                if(this.dinner_mealkind == 1){
                    arr[2].id = Math.abs(arr[2].id);
                }
                this.dinner.push(arr[2]);
            })
            console.log("아침",this.breakfast);
            console.log("점심",this.lunch);
            console.log("저녁",this.dinner);
            })
            .catch((err)=>{
                console.log("실패",err)
            })
        },
        close(){
        this.dialog1 = false;
        this.dialog2 = false;
        },
    },
        computed :{
        },
        created:function(){
            axios.get('/show/'+localStorage.getItem('current_user'))
            .then(res=>
                {
                this.user_id=res.data.user_id;
                console.log('유저 아이디: ',this.user_id);
                })
        .catch(err=>console.error(err))

    },
    
}
</script>

<style scoped>
@font-face { font-family: 'MapoPeacefull'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/MapoPeacefullA.woff') format('woff'); font-weight: normal; font-style: normal; }
</style>