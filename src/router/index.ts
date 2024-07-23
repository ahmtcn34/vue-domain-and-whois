import { createWebHistory, createRouter } from "vue-router";
import { useActiveLink } from "@/composables/activelink";

const routes = [
  { path: "/", component: () => import("../views/Home.vue") },
  { path: "/whois", component: () => import("../views/Whois.vue") },
  { path: "/whois/:domain", component: () => import("../views/WhoisQuery.vue"),meta: { isShowBackButton: true }, },
];

export const router = createRouter({
  linkActiveClass: 'active-menu',
  linkExactActiveClass: 'active-menu',
  history: createWebHistory(),
  routes,
});

router.afterEach((_to: any, _from:any) => {
  setTimeout(() => {
    const activeLink = document.querySelector('.active-menu') as HTMLElement;
    if (activeLink) {
      const { style } = useActiveLink(activeLink);
      (document.getElementById('active-link-style') as HTMLElement).style.cssText = style;
    }else{
      (document.getElementById('active-link-style') as HTMLElement).style.cssText = 'display: none';
    }
  }, 1);
});