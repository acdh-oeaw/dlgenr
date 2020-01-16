<template>
    <span class="dlgenr-client-sense-translation-text-latin">{{ translation }}</span>
</template>
<script>
export default {
    name : 'dlgenr-client-sense-translation-text-latin',
    props : { translation : { type : String }}
}
</script>
<style scoped>
    span.dlgenr-client-sense-translation-text-latin {
        color: black;
        font-family: 'Cormorant Garamond', serif;
        font-weight: medium;
    }
</style>