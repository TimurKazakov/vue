<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">Create ad</h1>
                <v-form ref="form"
                        v-model="valid"

                >
                    <v-text-field
                            label="Title"
                            name="Ad Title"

                            type="text"
                            v-model="title"
                            required
                            :rules="[v=>!!v ||'Title is required']"

                    />

                    <v-textarea
                            id="Description"
                            label="Description"
                            type="text"
                            name="description"
                            multi-line
                            v-model="description"
                            :rules="[v=>!!v ||'Description is required']"

                    ></v-textarea>

                </v-form>
                <v-layout row>
                    <v-btn class="warning"
                           @click="triggerUpload"

                    >
                        Upload
                        <v-icon right dark>mdi-cloud-upload</v-icon>
                    </v-btn>
                    <input ref="fileInput" @change="onFileChange" type="file" style="display: none" accept="image/*">
                </v-layout>
                <v-layout>
                    <v-flex xs8 sm6 offset-sm3>
                    <img :src="imageSrc"  height="150px" class="mt-4" v-if="imageSrc" >
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex xs8 sm6 offset-sm3>
                    <v-switch
                            v-model="promo"
                            label="Add to promo"
                    ></v-switch>
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex xs12 sm6 offset-sm3>
                    <v-spacer></v-spacer>
                    <v-btn class="success" @click="createAdd" :disabled="(!valid && Boolean( image)) || loading" :loading="loading">Create Add</v-btn>
                        </v-flex>
                </v-layout>

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        computed:{
            loading(){
                return this.$store.getters.loading;
            }
        },
        name: "NewAd",
        data(){
            return{
                promo:false,
                title:'',
                description:'',
                valid:false,
                image:null,
                imageSrc:'',
            }
        },
        methods:{
            onFileChange(event){
                const file= event.target.files[0];
                const reader = new FileReader();
                reader.onload=() =>{
                    this.imageSrc= reader.result;
                }
                reader.readAsDataURL(file);
                this.image = file;
            },
            triggerUpload(){
                this.$refs.fileInput.click();
            },
            createAdd(){
                if (this.$refs.form.validate() && Boolean( this.image)){

                    const ad = {
                        title:this.title,
                        description: this.description,
                        promo:this.promo,
                        image:this.image,

                    };

                    this.$store.dispatch('createAd', ad)
                        .then(()=>{
                            this.$router.push('/list');
                        })
                        .catch(()=>{})
                }
            }
        }

    }
</script>

<style scoped>

</style>
