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
                        <v-toolbar-title>Registration form</v-toolbar-title>



                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form"
                                v-model="valid"
                                :lazy-validation="true">
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
                            <v-text-field
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    prepend-icon="mdi-lock"
                                    type="password"
                                    v-model="confirmPassword"
                                    :rules="confirmPasswordRules"

                            />
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn
                                color="primary"
                                @click="onSubmit"
                                :loading="loading"
                                :disabled="!valid || loading"

                        >Create account</v-btn>
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
        name: "Registration",
        data(){
            return{
                email:'',
                password:'',
                confirmPassword:'',
                valid:false,
                emailRules:[
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
                passwordRules:[
                    v => !!v || 'Password is required',
                    v => v.length >= 8 || 'Min 8 characters',
                ],
                confirmPasswordRules:[
                    v => !!v || 'Password is required',
                    v => v === this.password|| "Password should be same"
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

                    this.$store.dispatch('registerUser', user)
                        .then(()=>{
                            this.$router.push('/');
                        })
                        .catch(()=>{})

                }
            }
        }
    }
</script>

<style scoped>

</style>