/*레시피 */
<template>
<v-img src="/static/back_background.png">
<v-container>
        <v-layout justify-center>
            <v-flex justify-center>
                <h1 class="green--text font-weight-bold" style="text-align:center; font-family : 'MapoPeacefull';">RECIPE</h1>

                <v-layout class="d-flex flex-wrap" style="margin-top: 100px;" justify-center>
                    <div style="margin-right:100px;" xs12 sm12 md6 justify-center>
                        <v-img justify-center style="width:500px; height: 400px; margin-top:50px; margin-left:60px; margin-bottom : 50px; font-family : 'MapoPeacefull';" height="300px" :src="recipes.recipe_image_2"></v-img>
                    </div>

                    <div xs12 sm12 md6 justify-center>
                        <div style="width:500px; height: 400px;" justify-center>
                            <h1 class="font-weight-bold" style="margin-bottom : 50px; font-family : 'MapoPeacefull';">{{recipes.recipe_food}}</h1>
                            <br>
                            <h2 class="green--text font-weight-bold" style="font-family : 'MapoPeacefull';">栄養情報</h2>
                            <div style="margin-right:50px; font-family : 'MapoPeacefull';">
                                カロリー:{{nutrients.nutrient_calorie}}
                                炭水化物:{{nutrients.nutrient_carbohydrate}}
                                コレステロール:{{nutrients.nutrient_cholesterol}}
                                タンパク質:{{nutrients.nutrient_protein}}
                                脂質:{{nutrients.nutrient_fat}}
                                ナトリウム:{{nutrients.nutrient_salt}}
                            </div>
                            <br>
                            <h2 class="green--text font-weight-bold" style="margin-top : 50px; font-family : 'MapoPeacefull';">使われた食材</h2>
                            <div class="d-flex flex-wrap" justify-center>
                                <h3 style="margin-right:30px; font-family : 'MapoPeacefull';">
                                    {{recipes.recipe_material}}
                                </h3>                           
                            </div>
                        </div>
                    </div>                    
                </v-layout>

                <v-layout justify-center>  
                    <v-flex class="text-md-center" style="margin-top:50px;" xs12 sm12 md6 justify-center>
                        <h1 class="font-weight-bold" style="margin-top:100px; margin-bottom:50px; text-align:center; font-family : 'MapoPeacefull';"> 作り方 </h1>
                        <v-img style="margin-top: 25px; width:800px; margin-bottom:30px; text-align:center;" :src="recipes.how_to_make_image_1" justify-center></v-img>
                        <div class="font-weight-bold" style=" font-family : 'MapoPeacefull';">{{recipes.how_to_make_1}}</div>
                        <v-img style="margin-top: 25px; width:800px; margin-bottom:30px;" :src="recipes.how_to_make_image_2"></v-img>
                        <div class="font-weight-bold" style=" font-family : 'MapoPeacefull';">{{recipes.how_to_make_2}}</div>
                        <v-img style="margin-top: 25px; width:800px; margin-bottom:30px;" :src="recipes.how_to_make_image_3"></v-img>
                        <div class="font-weight-bold" style=" font-family : 'MapoPeacefull';">{{recipes.how_to_make_3}}</div>
                        <v-img style="margin-top: 25px; width:800px; margin-bottom:30px;" :src="recipes.how_to_make_image_4"></v-img>
                        <div class="font-weight-bold" style=" font-family : 'MapoPeacefull';">{{recipes.how_to_make_4}}</div>
                        <v-img style="margin-top: 25px; width:800px; margin-bottom:30px;" :src="recipes.how_to_make_image_5"></v-img>
                        <div class="font-weight-bold" style=" font-family : 'MapoPeacefull';">{{recipes.how_to_make_5}}</div>
                        <v-img style="margin-top: 25px; width:800px; margin-bottom:30px;" :src="recipes.how_to_make_image_6"></v-img>
                        <div class="font-weight-bold" style=" font-family : 'MapoPeacefull';">{{recipes.how_to_make_6}}</div>
                        <v-img style="margin-top: 25px; width:800px; margin-bottom:30px;" :src="recipes.how_to_make_image_7"></v-img>
                        <div class="font-weight-bold" style=" font-family : 'MapoPeacefull';">{{recipes.how_to_make_7}}</div>
                        <v-img style="margin-top: 25px; width:800px; margin-bottom:30px;" :src="recipes.how_to_make_image_8"></v-img>
                        <div class="font-weight-bold" style=" font-family : 'MapoPeacefull';">{{recipes.how_to_make_8}}</div>
                        <v-img style="margin-top: 25px; width:800px; margin-bottom:30px;" :src="recipes.how_to_make_image_9"></v-img>
                        <div class="font-weight-bold" style=" font-family : 'MapoPeacefull';">{{recipes.how_to_make_9}}</div>
                        <v-img style="margin-top: 25px; width:800px; margin-bottom:30px;" :src="recipes.how_to_make_image_10"></v-img>
                        <div class="font-weight-bold" style=" font-family : 'MapoPeacefull';">{{recipes.how_to_make_10}}</div>
                        <v-img style="margin-top: 25px; width:800px; margin-bottom:30px;" :src="recipes.how_to_make_image_11"></v-img>
                        <div class="font-weight-bold" style=" font-family : 'MapoPeacefull';">{{recipes.how_to_make_11}}</div>
                        <v-img style="margin-top: 25px; width:800px; margin-bottom:30px;" :src="recipes.how_to_make_image_12"></v-img>
                        <div class="font-weight-bold" style=" font-family : 'MapoPeacefull';">{{recipes.how_to_make_12}}</div>
                        <v-img style="margin-top: 25px; width:800px; margin-bottom:30px;" :src="recipes.how_to_make_image_13"></v-img>
                        <div class="font-weight-bold" style=" font-family : 'MapoPeacefull';">{{recipes.how_to_make_13}}</div>
                        <v-img style="margin-top: 25px; width:800px; margin-bottom:30px;" :src="recipes.how_to_make_image_14"></v-img>
                        <div class="font-weight-bold" style=" font-family : 'MapoPeacefull';">{{recipes.how_to_make_14}}</div>
                        <v-img style="margin-top: 25px; width:800px; margin-bottom:30px;" :src="recipes.how_to_make_image_15"></v-img>
                        <div class="font-weight-bold" style=" font-family : 'MapoPeacefull';">{{recipes.how_to_make_15}}</div>
                </v-flex>
                </v-layout>

            </v-flex>
        </v-layout>
</v-container>
</v-img>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Recipe',
    data(){
        return{
            food:'',
            materials:'', // recipes에 recipe_material값으로 들어가있음. 바꿔서 쓸 것
            recipes:'',
            nutrients: '',
        };
    },

    created : function(){
        axios.get('/get_recipe_detail/'+this.$route.params.id)
        .then(res => {
            console.log(res);
            this.recipes = res.data[0][0]; // 현재 페이지 id값을 가진 레시피 데이터
            this.nutrients = res.data[1][0]; // 현재 가게에 등록된 모든 음식 데이터
            console.log("레시피",this.recipes);
            console.log("영양소",this.nutrients);
        })
        .catch((err) => {
            console.log(err);
        });
    },
}
</script>

<style scoped>
@font-face { font-family: 'MapoPeacefull'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/MapoPeacefullA.woff') format('woff'); font-weight: normal; font-style: normal; }
</style>