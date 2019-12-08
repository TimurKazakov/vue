<template>
    <v-dialog  width="400px" v-model="modal">
        <template v-slot:activator="{ on }">
            <v-btn class="success mr-2 ml-2" v-on="on">Buy </v-btn>
        </template>
        <v-card>
            <v-container>
                <v-layout row>
                    <v-flex>
                        <v-card-title class="text--primary">Do you want buy it?</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row>
                    <v-flex>
                        <v-card-text class="text--primary">
                            <v-text-field
                                    label="Name"
                                    name="name"
                                    type="text"
                                    v-model="name"
                            />
                            <v-text-field
                                    label="Your Phone"
                                    name="phope"
                                    type="text"
                                    v-model="phone"
                            />
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex>
                        <v-card-actions class="text--primary">
                            <v-spacer>
                            </v-spacer>
                            <v-btn @click="onCancel" :disabled="localLoading">Close</v-btn>
                            <v-btn class="success" @click="onSave" :disabled="localLoading" :loading="localLoading">Buy it!</v-btn>
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
                this.name='',
                    this.phone='',
                    this.modal= false
            },
            onSave(){
                if (this.name!=="" && this.phone !==""){
                    this.localLoading = true;
                    this.$store.dispatch('createOrder',{
                        name: this.name,
                        phone: this.phone,
                        adId : this.ad.id,
                        ownerId:this.ad.ownerId
                    }).finally(()=>{
                        this.name='';
                        this.phone='';
                        this.localLoading = false;

                        this.modal=false;
                    })


                }
            }
        },

        data(){
            return{
                modal:false,
                phone:'',
                name:'',
                localLoading:false,
            }
        }
    }
</script>

<style scoped>

</style>