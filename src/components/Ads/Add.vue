<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
              <v-card v-if="!loading">
                  <v-img :src="ad.imageSrc" height="300px"
                  width="auto"
                  >

                  </v-img>
                  <v-card-text>
                      <h1 class="text--primary"> {{ad.title}}</h1>
                      <p>{{ad.description}}</p>
                  </v-card-text>
                  <v-card-actions>
                      <v-spacer></v-spacer>

                      <app-edit-ad-modal class="mr-2"  :ad="ad" v-if="isOwner">

                      </app-edit-ad-modal>
                      <add-buy-modal class="ml-2 " :ad="ad"></add-buy-modal>
                  </v-card-actions>
              </v-card>
                <div v-else class="text-center">
                    <v-progress-circular
                            :size="100"
                            :width="10"
                            color="purple"
                            indeterminate
                    ></v-progress-circular>
                </div>
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
    import EditAdModal from "@/components/Ads/EditAdModal";
    export default {
        components:{
            appEditAdModal:EditAdModal
        },
        props:['id'],
        name: "Add",
        computed:{
            isOwner(){
              return this.ad.ownerId === this.$store.getters.user.id;
            },
            loading(){
                return this.$store.getters.loading;
            },
            ad(){
                const id= this.id;
               return this.$store.getters.adById(id)
            }
        }
    }
</script>

<style scoped>


</style>