<template>

            <v-container
                    class="fill-height"
                    fluid
            >
                <v-row
                        align="center"
                        justify="center"
                >
                    <v-col
                            cols="12"
                            sm="8"
                            md="6"
                            xs="10"
                    >
                        <v-card class="elevation-12">
                            <v-toolbar
                                    color="primary"
                                    dark
                                    flat
                            >
                                <v-toolbar-title>Login form</v-toolbar-title>



                            </v-toolbar>
                            <v-card-text>
                                <v-form ref="form"
                                        v-model="valid"
                                        :lazy-validation='true'>
                                    <v-text-field
                                            label="email"
                                            name="email"
                                            prepend-icon="mdi-account"
                                            type="email"
                                            v-model="email"
                                            :rules="emailRules"

                                    />

                                    <v-text-field
                                            id="password"
                                            label="Password"
                                            name="password"
                                            prepend-icon="mdi-lock"

                                            type="password"
                                            v-model="password"
                                            :rules="passwordRules"

                                    />
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer />
                                <v-btn color="primary" :loading="loading" @click="onSubmit" :disabled="!valid||loading">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>

</template>

<script>
    export default {
        computed:{
            loading(){
                return this.$store.getters.loading;
            }
        },
        name: "Login",
        data(){
            return{
                email:'',
                password:'',
                valid:false,
                emailRules:[
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
                passwordRules:[
                    v => !!v || 'Password is required',
                    v => v.length >= 8 || 'Min 8 characters',
                ]



            }
        },
        methods:{
            onSubmit(){
                if (this.$refs.form.validate()){
                    const user={
                        email:this.email,
                        password:this.password,
                    }

                    this.$store.dispatch('loginUser', user)
                        .then(()=>{
                            this.$router.push('/');
                        })
                        .catch(()=>{})

                }
            }
        },
        created(){
            if (this.$route.query['loginError']){
                this.$store.dispatch('setError', 'Please log in  ');
            }

        }
    }
</script>

<style scoped>

</style>