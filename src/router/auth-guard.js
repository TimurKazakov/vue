import store from '@/store/index'



function AuthGuard (to, from, next){
    if (to.path === '/login' || to.path==='/registration'){
        window.console.log(to.path);
        next('/list')
    }
    if (store.getters.user){

        next();
    } else {
        next('/login?loginError=true');
    }
}



export {AuthGuard,}