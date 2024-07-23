<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import isValidDomain from 'is-valid-domain';
import { useWhoisCheck } from '@/composables/whoischeck';
import { format } from "date-fns";
interface IData {
    message: string,
    status: string,
    data: {
        "Domain Status"?: string[],
        "Name Server"?: string[],
        "Frozen Status"?: string,
        "Transfer Status"?: string,
        "NIC Handle"?: string,
        "Organization Name"?: string,
        Address?: string,
        Phone?: string,
        Fax?: string,
        "Created on.............."?: string,
        "Expires on.............."?: string,
        "Last Update Time"?: string,
        Text: string[],
        __raw: string,
        isTldTr: boolean,
        Registrar?: string,
        'Registrar IANA ID'?: string,
        'Registrar Abuse Contact Email'?: string,
        'Registrar Abuse Contact Phone'?: string,
        'Admin Name'?: string,
        'Admin Organization'?: string,
        'Admin Email'?: string,
        'Admin Phone'?: string,
        'Admin Street'?: string,
        'Admin City'?: string,
        'Admin Country'?: string,
        'Registrant Name'?: string,
        'Registrant Organization'?: string,
        'Registrant Email'?: string,
        'Registrant Phone'?: string,
        'Registrant Street'?: string,
        'Registrant City'?: string,
        'Registrant Country'?: string,
        'Tech Name'?: string,
        'Tech Organization'?: string,
        'Tech Email'?: string,
        'Tech Phone'?: string,
        'Tech Street'?: string,
        'Tech City'?: string,
        'Tech Country'?: string,
        'Admin Name Server'?: string[],
        'Created Date'?: string,
        'Updated Date'?: string,
        'Expiry Date'?: string,
    }
}
const route = useRoute();
const router = useRouter();
const { checkWhoisAvailability } = useWhoisCheck();
const data = ref<IData>({} as IData);
const loading = ref<boolean>(true);
const isShowMore = ref<boolean>(false);
onMounted(async () => {
    if (!isValidDomain(route.params.domain as string)) {
        if (router.options.history.state.back) {
            return router.back();
        } else {
            return router.push({ path: '/', query: { whois: route.params.domain } })
        }
    }
    let response = await checkWhoisAvailability(route.params.domain as string);
    data.value = response;
    loading.value = false
})
</script>

<template>

    <div class="py-6 rounded-lg overflow-x-hidden">
        <div v-if="loading" class="w-full flex justify-center">
            <div class="lds-dual-ring "></div>
        </div>
        <template v-if="data.data">
            <div
                class="bg-zinc-800 rounded border-white/10 p-6  flex items-start sm:items-center flex-col sm:flex-row gap-x-6 mb-8 ">
                <a href="javascript:void(0)" @click.prevent="router.back()" :to="`/?whois=${route.params.domain}`"
                    class="text-white underline-offset-[6px] underline text-sm block mb-2 md:mb-0">
                    &lt; Geri Dön
                </a>
                <h1 class="text-2xl sm:text-4xl  ">
                    <div
                        class="inline-block text-indigo-500 z-100 rounded relative before:absolute before:content-[''] before:w-[70%] before:h-full before:bg-black before:rounded-full before:left-0 before:-z-10 ">
                        {{ route.params.domain }}</div>
                    Whois Sonucu
                </h1>
            </div>
            <div class="flex flex-col lg:flex-row  gap-6">
                <div class="w-4/4  lg:w-3/4  bg-zinc-800 p-6 rounded">
                    <div class="mb-6">
                        <h2 class="font-bold text-lg mb-2 text-zinc-100">Registrar Bilgileri</h2>

                        <div class="flex flex-wrap">
                            <h4 class="font-bold me-2">Barındığı Firma : </h4>
                            {{ data.data.Registrar || ' - ' }}
                        </div>
                        <div class="flex flex-wrap">
                            <h4 class="font-bold me-2">IANA ID</h4>:
                            {{ data.data['Registrar IANA ID'] || ' - ' }}
                        </div>
                        <div class="flex flex-wrap">
                            <h4 class="font-bold me-2">Kötüye kullanım bildirimi e-mail : </h4>
                            {{ data.data['Registrar Abuse Contact Email'] || ' - ' }}
                        </div>
                        <div class="flex flex-wrap">
                            <h4 class="font-bold me-2">Kötüye kullanım bildirimi telefon : </h4>
                            {{ data.data['Registrar Abuse Contact Phone'] || ' - ' }}
                        </div>
                    </div>
                    <div class="mb-4">
                        <h2 class="font-bold text-lg mb-2 text-zinc-100">Name Servers</h2>
                        <ul class="space-y-1" v-if="data.data['Name Server']?.length">
                            <li class="text-md text-zinc-300" v-for="ns in data.data['Name Server']">{{ ns }}</li>
                        </ul>
                        <div v-else class="text-zinc-300"> - </div>
                    </div>
                    <div class="space-y-2">
                        <h2 class="font-bold text-lg mb-2 text-zinc-100">Domain Sahibi Hakkında</h2>
                        <div class="flex flex-wrap">
                            <h4 class="font-bold me-2">Adı Soyadı : </h4>
                            {{ data.data['Admin Name']?.trim() || ' - ' }}
                        </div>
                        <div class="flex flex-wrap">
                            <h4 class="font-bold me-2">Şirketi : </h4>
                            {{ data.data['Admin Organization'] || ' - ' }}
                        </div>
                        <div class="flex flex-wrap">
                            <h4 class="font-bold me-2">E-Mail Adresi : </h4>
                            {{ data.data['Admin Email'] || ' - ' }}
                        </div>
                        <div class="flex flex-wrap">
                            <h4 class="font-bold me-2">Telefonu : </h4>
                            {{ data.data['Admin Phone'] || ' - ' }}
                        </div>
                        <div class="flex flex-wrap">
                            <h4 class="font-bold me-2">Mahalle / Semt / Cadde : </h4>
                            {{ data.data['Admin Street'] || ' - ' }}
                        </div>
                        <div class="flex flex-wrap">
                            <h4 class="font-bold me-2">Şehir : </h4>
                            {{ data.data['Admin City'] || ' - ' }}
                        </div>
                        <div class="flex flex-wrap">
                            <h4 class="font-bold me-2">Ülke : </h4>
                            {{ data.data['Admin Country'] || ' - ' }}
                        </div>
                    </div>
                    <div v-if="data.data" class="mt-6 border-t pt-6 border-zinc-700/40">
                        <div v-if="isShowMore" class="space-y-12"
                            v-html="data.data.__raw.replace(/(\r\n|\n|\r)/gm, '<br />')"></div>
                        <button class="text-white text-center mx-auto flex items-center"
                            @click="isShowMore = !isShowMore">
                            Devamını Oku <img src="/public/down-arrow.svg" class="w-6 h-6"
                                :class="{ 'rotate-180': isShowMore }" />
                        </button>


                    </div>
                </div>
                <div class="w4/4 lg:w-1/4  ">
                    <div class="p-6  rounded bg-zinc-800">
                        <h3 class="text-lg mb-6">Önemli Tarihler</h3>
                        <div class="flex flex-col xs:flex-row mb-2 flex-wrap">
                            <h4 class="font-bold me-2">Kayıt Tarihi: </h4>
                            {{ format(data.data['Created Date']!, 'dd.MM.yyyy') || ' - ' }}
                        </div>
                        <div class="flex flex-col xs:flex-row mb-2 flex-wrap">
                            <h4 class="font-bold me-2">Güncelleme Tarihi: </h4>
                            {{ data.data['Updated Date'] || ' - ' }}
                        </div>
                        <div class="flex flex-col xs:flex-row flex-wrap">
                            <h4 class="font-bold me-2">Bitiş Tarihi: </h4>
                            {{ data.data['Expiry Date'] || ' - ' }}
                        </div>
                    </div>
                </div>
            </div>

        </template>
        <div class="px-6">

            <div class="text-red-400/70 bg-red-700/10 p-4 rounded text-xs font-semibold tracking-wider"
                v-if="(data.status == 'error' || data.data == null) && !loading">
                Whois bilgileri bulunamadı.
                <br>
                Hata Mesajı: {{ data.message }}
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