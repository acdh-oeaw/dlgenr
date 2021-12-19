<template>
    <span class="dlgenr-client-etymology-label">{{ languageLabel }}: </span>
</template>
<script>
export default {
    name: 'dlgenr-client-etymology-label',
    props: { languageLabel: { type: String } }
}
</script>
<style scoped>
    span.dlgenr-client-etymology-label {
        font-family: 'Cormorant Garamond', serif;
        font-weight: normal;
        font-size: 12pt;
        text-align: left;
        color: black;
    }
</style>