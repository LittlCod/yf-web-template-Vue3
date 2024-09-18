<template>
    <div class="1">
        {{ useRoute().meta.title }}
    </div>
</template>
        
<script setup>
import { defineComponent,ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
</script>
        
<style scoped lang='scss'>
</style>