<template>
    <v-container>
        <v-layout v-if="loading">
            <v-flex xs12 class="text-center">
                <v-progress-circular
                        :size="100"
                        :width="10"
                        color="purple"
                        indeterminate
                ></v-progress-circular>
            </v-flex>
        </v-layout>

        <v-layout row v-if="!loading && myAds.length >0" >
            <v-flex xs12 sm6 offset-sm3>
               <h1 class="text--secondary mb-3">My Ads</h1>
                <v-card class="elevation-10 mb-5"
                        v-for="ad in myAds"
                        :key="ad.id"

                >
                    <div class="" style="flex-direction: row; display: flex">
                        <div class="col-4 "  >
                            <v-img
                                    :src="ad.imageSrc"
                                    class="white--text align-end"
                                    height="200px"
                            >

                            </v-img>
                        </div>
                        <div  class="col-8 ml-1" >
                            <v-card-text class="text--primary">{{ad.title}}</v-card-text>
                            <p>{{ad.description}}</p>
                            <v-container>
                                <v-spacer></v-spacer>
                                <v-btn class="info float-right" :to="'/ad/'+ad.id">
                                    Open
                                </v-btn>
                            </v-container>
                        </div>
                    </div>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout v-if="!loading && myAds.length ===0">
            <v-flex xs12 class="text-center">
                <h1 class="text--primary">No Ads</h1>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
    export default {
        computed:{
            myAds(){
                return this.$store.getters.myAds
            },
            loading(){
                return this.$store.getters.loading;
            },
        },

        name: "AddList",
        data(){
            return{

            }
        },
        created(){
            this.myAds();
        }
    }
</script>

<style scoped>

</style>