<template>
    <v-layout justify-center>
        <v-flex xs12 sm12 md12 class="pa-5">
                <h1 class="green--text font-weight-bold" style="margin-bottom:30px; text-align:center; font-family : 'MapoPeacefull';">
                    SIGNUP
                </h1>
        
                <v-form>
                    <span>
                    <v-layout style=" font-family : 'MapoPeacefull';" justify-center>
                        <v-flex xs12 sm8 md6>
                            <v-text-field
                                type="email" label="アイディー(イーメール)" v-model="email" :rules="emailRules" required>
                            </v-text-field>
                            <v-text-field
                                type="password" label="パスワード" counter="6" v-model="password" :rules="passwordRules" required>
                            </v-text-field>           
                            <v-text-field
                                type="password" label="パスワード　確認" counter="6" v-model="password_ok" :rules="password_okRules" required>
                            </v-text-field>
                            <v-text-field
                                type="input" label="名前" v-model="name" :rules="nameRules" required>
                            </v-text-field>
                        </v-flex>  
                    </v-layout>

                    <v-layout style=" font-family : 'MapoPeacefull';" justify-center>
                        <v-btn-toggle v-model="gender">
                            <v-btn
                                depressed text :value="1"
                                class="pl-4 pb-5 pr-4 pt-2 font-weight-bold title"
                                style="width:250px;">
                                <span stlyle="line-height:40px;">男性</span>
                            </v-btn>

                            <v-btn
                                depressed text :value="2"
                                class="pl-4 pb-5 pr-4 pt-2 font-weight-bold title"
                                style="width:250px;">
                                <span stlyle="line-height:40px; font-family : 'MapoPeacefull';">女性</span>
                            </v-btn>
                        </v-btn-toggle>
                    </v-layout>

                    <v-layout class="mt-4 mb-4" justify-center style="margin-left:10px; font-family : 'MapoPeacefull';">
                        <v-flex xs6 sm6 md6>
                            <div class="green--text font-weight-bold">活動指数</div>
                            <v-radio-group v-model="radio" row> 
                                <v-radio label="活動が少ない"  color="success" value="25" ></v-radio>
                                <v-radio label="平凡だ"  color="success" value="30"></v-radio>
                                <v-radio label="活動的だ"  color="success" value="35"></v-radio>
                                <v-radio label="活動が多い"  color="success" value="40"></v-radio>
                            </v-radio-group>
                        </v-flex>
                    </v-layout>

                    <v-layout class="mt-4 mb-4" style=" font-family : 'MapoPeacefull';" justify-center >
                        <v-flex xs6 sm4 md3 style="margin-right:20px;">
                            <v-text-field
                                type="input" label="身長" v-model="Height" :rules="HeightRules" required>
                            </v-text-field>
                        </v-flex>
                        <v-flex xs6 sm4 md3>
                            <v-text-field
                                type="input" label="体重" v-model="Weight" :rules="WeightRules" required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>


                    <v-layout justify-center style=" font-family : 'MapoPeacefull';">
                        <v-flex xs12 sm8 md6>         
                                <v-menu
                                    ref="menu"
                                    v-model="menu"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                    <v-text-field
                                        v-model="date"
                                        label="生年月日"
                                        v-on="on"
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker
                                    ref="picker"
                                    v-model="date"
                                    :max="new Date().toISOString().substr(0, 10)"
                                    min="1950-01-01"
                                    @change="save"
                                    ></v-date-picker>
                                </v-menu>
                        </v-flex>

                            <!-- <template>
                                <v-row justify="center">
                                    <v-date-picker v-model="day" color="green lighten-1"></v-date-picker>
                                </v-row>
                            </template> -->                    
                    </v-layout>

                        <v-card-actions>
                            <v-layout row wrap justify-center style="margin-top:30px; font-family : 'MapoPeacefull';">
                                <v-flex xs12 sm8 md6>
                                    <v-btn
                                        type="submit" @click="register"
                                        color="success" large block
                                        class="headline font-weight-bold mt-3">
                                        会員加入
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-card-actions>
                    </span>
                </v-form>
        </v-flex>
    </v-layout>
</template>

<script>
import axios from 'axios';

export default {   
    name: 'signup',
    data(){
        return{
            email:'', //이메일
            emailRules: [
            v => !!v || 'イーメール書いてください。', 
            v => /.+@.+/.test(v) || 'メール様式で書いてください。' 
            ],
            password:'', //비밀번호
            passwordRules: [
            v => !!v || 'パスワードを書いてください。',
            v => v.length >= 6 || '6文字以上入力してください。'
            ],
            name:'', //이름
            nameRules: [
            v => !!v || '名前を書いてください。',
            ],
            password_ok:'', //비밀번호 확인
            password_okRules:[
                v => v == this.password || '一致しません。' 
            ],
            phone:'', //핸드폰
            gender: this.gender, //성별
            //gender:0, //성별
            Height:'',//신장, double형식인데 string으로 갔기때문에 여차하면 number형으로 바꿔주자
            HeightRules: [
            v => !!v || '身長を書いてください。',
            ],
            Weight:'',//체중
            WeightRules: [
            v => !!v || '体重を書いてください。',
            ],
            menu:false,
            date:null, //생년월일
            radio: this.radio, //활동지수
            }
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
    },
     methods: {
        register(){
            axios.post('/signup',   // SignupController@signup
            {
                user_name: this.name,
                user_email: this.email,
                user_password: this.password,
                user_birthday: this.date,
                user_height: this.Height,
                user_weight: this.Weight,
                user_gender: this.gender,
                user_activity_index: this.radio,
            })
            .then((res) => {
                console.log(res);          
                let key = res.data;
                localStorage.setItem('current_user',key);
                window.location.href='/';
            })
            .catch((err) => {
                console.log(err)
            })
        },
        save (date) {
            this.$refs.menu.save(date)
        },
    },
    // methods: {
    //   save (date) {
    //     this.$refs.menu.save(date)
    //   },
    // },
    //핸드폰 숫자만 입력가능
    //  watch:{
    //         phone(){
    //         return this.phone = this.phone.replace(/[^0-9]/g, '');
    //                 }
    //         },
}
</script>

<style scoped>
@font-face { font-family: 'MapoPeacefull'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/MapoPeacefullA.woff') format('woff'); font-weight: normal; font-style: normal; }
</style>