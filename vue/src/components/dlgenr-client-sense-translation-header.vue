<template>
    <span class="dlgenr-client-sense-translation-header">{{ header }}</span>
</template>
<script>
export default {
    name : 'dlgenr-client-sense-translation-header',
    props : { header : { type : String }}
}
</script>
<style scoped>
    span.dlgenr-client-sense-translation-header {
        color: black;
        font-family: 'Cormorant Garamond', serif;
        font-weight: medium;
    }
</style>