<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useActiveLink } from "@/composables/activelink";
const route = useRoute();
const router = useRouter();
const activeMenuEffect = ref();
const activeEl = ref();
watch(() => route.path, (_val, _prev) => {
  setTimeout(() => {
    const el = document.querySelector('.active-menu')?.parentElement as HTMLElement;
    if (!el) return
    const { style } = useActiveLink(el);
    activeMenuEffect.value.style = style;
    activeEl.value = el;
  });
});
onMounted(() => {
  setTimeout(() => {
    const el = document.querySelector('.active-menu')?.parentElement as HTMLElement;
    if (!el) return
    const { style } = useActiveLink(el);
    activeMenuEffect.value.style = style;
    activeEl.value = el;
  }, 200)
});
const back = () => {
  if (router.options.history.state.back) {
    return router.back();
  } else {
    return router.push({ path: '/', query: { whois: route.params.domain } });
  }
}
</script>
<template>
  <nav>
    <ul class="inline-flex bg-zinc-800 rounded relative">
      <li v-if="route.meta.isShowBackButton" class="flex items-center">
        <a @click="back" to="/whois/test" class="p-4 rounded cursor-pointer flex items-center gap-x-2"
          href="javascript:void(0)">
          <img class="w-4 h-4" src="/back-two-arrows.svg" alt="Back">
          Geri
        </a>
      </li>
      <li>
        <router-link :to="{ path: '/', query: { ...route.query } }" class="p-4 rounded block">
          Domain Sorgula
        </router-link>
      </li>
      <li>
        <router-link class="p-4 rounded block" :to="{ path: '/whois', query: { ...route.query } }">
          Whois Sorgula
        </router-link>
      </li>
      <div id="active-link-style" ref="activeMenuEffect"
        class="w-6 h-6 bg-zinc-500/20 absolute top-0 left-0 transition-all rounded pointer-events-none ">
      </div>
    </ul>
  </nav>
</template>