<template>
  <!-- App.vue -->

  <v-app>
    <v-navigation-drawer app  v-model="drawer" temporary>
      <!-- -->
      <v-list>
        <v-list-item

                v-for="link of links"
                :key="link.title"
                :to="link.url"
        >
          <v-list-item-icon>
            <v-icon >{{link.icon}}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="link.title"></v-list-item-title>
          </v-list-item-content>


        </v-list-item >
        <v-list-item @click="logout" v-if="isUserLoggedIn">
          <v-list-item-icon>
            <v-icon >mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title >Logout</v-list-item-title>
          </v-list-item-content>


        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark color="primary">
      <!-- -->


      <v-app-bar-nav-icon @click="drawer=!drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer" >Add ap</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>



        <v-btn color="primary"

               v-for="link of links"
               :key="link.title"
               :to="link.url"

               style="margin: 0 5px"
               class="hidden-sm-and-down"
        >
          <v-icon left>{{link.icon}}</v-icon>

          {{link.title}}
        </v-btn>

      <v-btn color="primary"
              @click="logout"
              v-if="isUserLoggedIn"
             style="margin: 0 5px"
             class="hidden-sm-and-down"
      >
        <v-icon left>mdi-logout</v-icon>
          Logout

      </v-btn>
    </v-app-bar>



    <!-- Sizes your content based upon application components -->
    <v-content>


      <!-- Provides the application the proper gutter -->


      <!-- If using vue-router -->
      <router-view>

      </router-view>

    </v-content>

    <template v-if="error">
    <v-snackbar
            :timeout="5000"
            :bottom=" 'bottom'"
            :color="error"
            :multi-line=" 'multi-line'"
            @input="closeError"
            :value="true"
            :vertical="'vertical'"
    >
      {{error}}
      <v-btn
              dark
              text
              @click="closeError"
      >
        Close
      </v-btn>
    </v-snackbar>
    </template>
  </v-app>
</template>

<script>


  export default {
    computed:{
      error(){
       return this.$store.getters.error
      },
      isUserLoggedIn() {
        return this.$store.getters.isUserLoggedIn;
      },
      links(){
        if (this.isUserLoggedIn){
        return  [
          {title:'Orders', icon:"mdi-bookmark", url:'/orders'},
          {title:'New ad', icon:"mdi-note", url:'/new'},
          {title:'My ads', icon:"mdi-format-list-bulleted", url:'/list'},

        ]
        }else
         return [
           {title:'Login', icon:"mdi-lock", url:'/login'},
           {title:'Registration', icon:"mdi-face", url:'/registration'},
         ]
      },
    },
    methods:{
      logout(){
        this.$store.dispatch('logout');
        this.$router.push('/');
      },
      closeError(){
        this.$store.dispatch('clearError');
      }
    },
    data(){
      return{
        drawer:false,

      }
    }
  };
</script>

<style scoped>

  .pointer{
    cursor: pointer;
  }
</style>