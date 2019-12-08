<template>
    <v-dialog  width="400px" v-model="modal">
        <template v-slot:activator="{ on }">
        <v-btn class="warning" v-on="on">Edit </v-btn>
        </template>
        <v-card>
            <v-container>
                <v-layout row>
                    <v-flex>
                        <v-card-title class="text--primary">Edit Ad</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row>
                    <v-flex>
                        <v-card-text class="text--primary">
                            <v-text-field
                                label="Title"
                                name="title"
                                type="text"
                                v-model="editedTitle"
                            />
                            <v-text-field
                                label="Description"
                                name="description"
                                type="text"
                                v-model="editedDescription"
                            />
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex>
                        <v-card-actions class="text--primary">
                            <v-spacer>
                            </v-spacer>
                            <v-btn @click="onCancel">Cancel</v-btn>
                            <v-btn class="success" @click="onSave">Save</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props:['ad'],
        methods:{
          onCancel(){
                this.editedTitle=this.ad.title,
                    this.editedDescription=this.ad.description,
                this.modal= false
          },
          onSave(){
              if (this.editedDescription!=="" && this.editedTitle !==""){
                  this.$store.dispatch('updateAd',{
                      title: this.editedTitle,
                      description: this.editedDescription,
                      id : this.ad.id
                  })

                  this.modal=false;
              }
          }
        },
        name: "EditAdModal",
        data(){
            return{
                modal:false,
                editedTitle:this.ad.title,
                editedDescription:this.ad.description,
            }
        }
    }
</script>

<style scoped>

</style>