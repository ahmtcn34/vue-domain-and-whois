<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import isValidDomain from 'is-valid-domain';
import { toast } from 'vue3-toastify';
import { useDomainCheck } from '@/composables/domaincheck.ts';
const router = useRouter();
const route = useRoute();

const { checkDomainAvailability, domainsCheckState } = useDomainCheck()
const isDisabled = ref<boolean>(true);
const domain = ref<string>('');

const search = computed({
    get() {
        return route.query.search ?? ''
    },
    set(search) {
        router.push({ query: { ...route.query, search } })
    }
});
onMounted(() => {
    if (search.value) {
        domain.value = search.value as string;
        isDisabled.value = false;
    }
})
const submitHandler = async () => {
    if (!domain.value!.trim().length) return toast('Alan adı boş bırakılamaz.', {
        type: "error",
    });
    if (!isValidDomain(domain.value.trim(), { subdomain: false, wildcard: false })) return toast('Lütfen geçerli bir alan adı giriniz.', {
        type: "error",
    });

    checkDomainAvailability(domain.value.trim())
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
    <h2 class="mb-8 text-2xl">Domain Sorgula</h2>
    <form @submit.prevent="submitHandler" action="">
        <div class="flex flex-col items-start">
            <label for="search-domain" class="mb-2 text-gray-300">Domain Adı</label>
            <input id="search-domain" placeholder="Aramak için domain adresi giriniz." v-model="domain"
                @input="updateSearchParam"
                class="px-2 py-3 rounded bg-zinc-500/30 text-white focus:outline-none text-sm w-full" autocomplete="off"
                type="text">
        </div>
        <div class="flex justify-start mt-6">
            <button :disabled="isDisabled" class="bg-indigo-500 p-2 text-lg rounded min-w-24"
                :class="{ 'cursor-not-allowed bg-gray-300 opacity-50': isDisabled }"> Sorgula</button>
        </div>
    </form>
    <div class="space-y-4 mt-12 " v-if="domainsCheckState?.length">
        <div class="flex flex-col md:flex-row  p-4 justify-between md:items-center   rounded bg-zinc-800 "
            v-for="data in domainsCheckState.sort((a, b) => a.data?.isDomainAvailable - b.data?.isDomainAvailable)"
            :key="data.domain">
            {{ data.domain }}
            <div class="flex items-center " v-if="data.status == 'pending'">
                <div class="lds-dual-ring mr-4"></div>
                Yükleniyor
            </div>
            <div v-else-if="data.status == 'rejected'">
                {{ data.reason }}
            </div>
            <div v-else>
                <div v-if="data.data?.isDomainAvailable">
                    <div class="text-green-500">
                        Bu domain adresi satın alınabilir.
                    </div>
                </div>
                <div v-else>
                    <div class="text-red-500 flex-wrap flex items-center">
                        Bu domain adresi daha önce satın alınmıştır.
                        <router-link
                            class="text-white font-normal text-sm bg-neutral-100/10 px-2 py-1 rounded xs:ml-0 sm:ml-2 md:ml-2"
                            :to="`/whois/${data.domain}`">Whois Sorgula</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
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