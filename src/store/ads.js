import * as fb from 'firebase';

class Ad {

    constructor(title, description, ownerId, imageSrc='https://cs10.pikabu.ru/post_img/2019/11/11/6/1573465714151783550.webp', promo=false, id=null){
        this.title =title;
        this.description =description;
        this.ownerId =ownerId;
        this.imageSrc = imageSrc;
        this.promo =promo;
        this.id =id;
    }
}

export default {
    state:{

    },

    mutations: {
        createAd(state, payload){
            state.ads.push(payload);
        },
        loadAds(state, payload){
            state.ads=payload;
        },
        updateAd(state,{title, description,id}){
          const ad = state.ads.find(a=>{
              return a.id===id
          })
            ad.title=title;
            ad.description=description;
        },
    },
    actions: {
        async updateAd({commit}, {title, description, id}){
            commit('clearError');
            commit('setLoading', true);

            try {
                await fb.database().ref('ads').child(id).update({title, description});
                commit('updateAd',{title, description,id});
                commit('setLoading', false);
            } catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error;
            }
        },

        async fetchAds({commit}){
            commit('clearError');
            commit('setLoading', true);
            const resultAds=[];
            try {
                const fbVal = await fb.database().ref('ads').once('value');
                const ads = fbVal.val();

                Object.keys(ads).forEach(key=>{
                    const ad = ads[key];

                    resultAds.push(new Ad(ad.title, ad.description,ad.ownerId, ad.imageSrc, ad.promo, key ));
                });
                commit('loadAds',resultAds);
                commit('setLoading', false);
            } catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error;
            }
        },
        async createAd({commit, getters}, payload){
            commit('clearError');
            commit('setLoading',true);
            const image = payload.image;

            let imageSrc= '';
            try {
                const ownerId = getters.user.id ||"tqGSUxkh3aYNmqxYtwyClgU5Nvd2" ;
                const newAd = new Ad(payload.title, payload.description, ownerId, '', payload.promo);
                const ad = await fb.database().ref('ads').push(newAd);

                const imageExt = image.name.slice(image.name.lastIndexOf('.'));
                 await fb.storage().ref(`ads/${ad.key}.${imageExt}`).put(image);
               await fb.storage().ref(`ads/${ad.key}.${imageExt}`).getDownloadURL().then(function(downloadURL) {
                   imageSrc =downloadURL;
                   window.console.log("File available at", downloadURL);
               });
                await fb.database().ref('ads').child(ad.key).update({imageSrc});




                commit('createAd',{...newAd, id:ad.key, imageSrc:imageSrc});
                commit('setLoading', false);
            }

            catch (error) {
                commit('setError',error.message );
                commit('setLoading', false);
                throw error;
            }
        }
    },
    getters: {
        ads(state){
            return state.ads;
        },
        promoAds(state){
            return  state.ads.filter(ad=>{
                return ad.promo;
            })
        },
        myAds(state , getters){
            return state.ads.filter(ad => {
                return ad.ownerId === getters.user.id
            });
        },
        adById(state){
            return adId =>{
                return state.ads.find(ad=>ad.id===adId);
            }
        },
    }
}