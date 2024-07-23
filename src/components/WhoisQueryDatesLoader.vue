<script setup lang="ts">
import { Skeletor } from 'vue-skeletor';
</script>


<template>
    <main class="space-y-12">
        <div>
            <Skeletor pill class=" !bg-zinc-700/50" :height="10" width="100%"></Skeletor>
            <div class="flex mt-4 gap-x-4">
                <Skeletor pill class=" !bg-zinc-700/50" :height="10" width="30%"></Skeletor>
                <Skeletor pill class=" !bg-zinc-700/50" :height="10" width="40%"></Skeletor>
            </div>
            <div class="flex mt-4 gap-x-4">
                <Skeletor pill class=" !bg-zinc-700/50" :height="10" width="50%"></Skeletor>
                <Skeletor pill class=" !bg-zinc-700/50" :height="10" width="30%"></Skeletor>
            </div>
            <div class="flex mt-4 gap-x-4">
                <Skeletor pill class=" !bg-zinc-700/50" :height="10" width="20%"></Skeletor>
                <Skeletor pill class=" !bg-zinc-700/50" :height="10" width="50%"></Skeletor>
            </div>
        </div>
    </main>
</template>