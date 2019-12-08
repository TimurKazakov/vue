<template>
    <div v-if="!loading">
    <v-container fluid>
        <v-layout row>
            <v-flex xs12>
                <v-carousel>
                    <v-carousel-item
                            v-for="(ad,i) in promoAds"
                            :key="i"
                            :src="ad.imageSrc"
                            reverse-transition="fade-transition"
                            transition="fade-transition"

                    >
                        <div class="car-link">
                            <v-btn class="error" :to="'/ad/'+ad.id"> {{ad.title}}</v-btn>

                        </div>
                    </v-carousel-item>


                </v-carousel>
            </v-flex>
        </v-layout>

    </v-container>
    <v-container>
        <v-layout row >
            <v-flex xs12 sm6 md6 lg4 class="mx-auto mb-6"
            v-for="ad of ads"
                    :key="ad.id"
            >
                <v-card
                        class="mr-10"
                        max-width="400"
                >
                    <v-img
                            class="white--text align-end"
                            height="200px"
                            :src="ad.imageSrc"
                    >
                        <v-card-title>{{ad.title}}</v-card-title>
                    </v-img>



                    <v-card-text class="text--primary">
                        <div>{{ad.description}}</div>


                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                                text
                                :to="'/ad/'+ad.id"
                        >
                            Open
                        </v-btn>

                        <add-buy-modal :ad="ad"></add-buy-modal>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
    </div>
    <div v-else>
        <v-container>
            <v-layout row>
                <v-flex xs12 class="text-center pt-7">
                    <v-progress-circular
                            :size="100"
                            :width="10"
                            color="purple"
                            indeterminate
                    ></v-progress-circular>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    export default {
        computed:{
            loading(){
                return this.$store.getters.loading;
            },
          promoAds(){
              return this.$store.getters.promoAds
          },
            ads(){
              return this.$store.getters.ads
          },
        },
        data(){
            return{
                name: "Home",

            }
        }

    }
</script>

<style scoped>

    .car-link{
        position: absolute;
        bottom: 50px;
        left: 50%;
        background: rgba(0,0,0,.5);
        transform: translate(-50%,0);
        padding: 5px 15px;

        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
    }
</style>