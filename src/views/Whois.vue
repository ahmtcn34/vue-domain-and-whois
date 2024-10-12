<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import isValidDomain from 'is-valid-domain';
import { toast } from 'vue3-toastify';
const router = useRouter();
const route = useRoute();

const isDisabled = ref<boolean>(true);
const domain = ref<string>('');

const search = computed({
    get() {
        return route.query.whois ?? ''
    },
    set(whois: string) {
        router.push({ query: { ...route.query, whois } })
    }
});

onMounted(() => {
    if (search.value || route.query.whois) {
        domain.value = search.value as string;
        isDisabled.value = false;
    }
})

const submitHandler = async () => {
    if (!domain.value.trim().length) return toast('Alan adı boş bırakılamaz.');
    if (!isValidDomain(domain.value.trim(), { subdomain: false, wildcard: false })) return toast('Lütfen geçerli bir alan adı giriniz.', { type: "error", });
    router.push(`/whois/${domain.value.trim()}`);
}

const updateSearchParam = function () {
    search.value = domain.value;
    if (domain.value.trim().length && isValidDomain(domain.value.trim(), { subdomain: false, wildcard: false })) {
        isDisabled.value = false
    } else {
        isDisabled.value = true
    }
}
</script>
<template>
    <h2 class="mb-8 text-2xl">Whois Sorgula</h2>
    <form @submit.prevent="submitHandler">
        <div class="flex flex-col items-start">
            <label for="search-domain" class="mb-2 text-gray-300">Domain Adı</label>
            <input id="search-domain" placeholder="Aramak için domain adresi giriniz." v-model="domain"
                @input="updateSearchParam"
                class="px-2 py-3 rounded bg-zinc-500/30 text-white focus:outline-none text-sm w-full" autocomplete="off"
                type="text">
        </div>
        <div class="flex justify-start mt-6">
            <button :disabled="isDisabled" class="bg-indigo-500 text-lg p-2 rounded min-w-24"
                :class="{ 'cursor-not-allowed bg-gray-300 opacity-50': isDisabled }"> Sorgula</button>
        </div>

    </form>
</template>

<style scoped>
.lds-dual-ring,
.lds-dual-ring:after {
    box-sizing: border-box;
}

.lds-dual-ring {
    display: inline-block;
    width: 40px;
    height: 40px;
}

.lds-dual-ring:after {
    content: " ";
    display: block;
    width: 32px;
    height: 32px;
    margin: 8px;
    border-radius: 50%;
    border: 3.4px solid currentColor;
    border-color: currentColor transparent currentColor transparent;
    animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>