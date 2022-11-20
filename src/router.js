import { createRouter, createWebHistory } from 'vue-router';

// import TheLanding from './views/TheLanding.vue';
import SignIn from './components/auth/SignIn.vue';
import SignUp from './components/auth/SignUp.vue';
import MainContent from './layout/TheMainContent.vue';
import ChatRoom from './components/chatroom/ChatRoom.vue';
import UserProfile from './components/profile/UserProfile.vue';

// import store from './store/index';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: SignIn },
        {
            path: '/app', component: MainContent,
            children: [
                { path: ':chatID', component: ChatRoom },
                { path: 'me', component: UserProfile }
            ]
        },
        { path: '/signin', component: SignIn },
        { path: '/signup', component: SignUp }
    ],
    scrollBehavior() {
        return { top: 0 }
    }
});

// Function called before the user enter each route (page)
// router.beforeEach(function (to, _, next) {
//     // Redirect user to sign in page if not authenticated
//     if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
//         next('/signin')
//     } else {
//         next();
//     }
// });


export default router;