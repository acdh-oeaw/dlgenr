<template>
    <span class="dlgenr-client-etymology-language">{{ language }}.</span>
</template>
<script>
export default {
    name: 'dlgenr-client-etymology-language',
    props: { language: { type: String } }
}
</script>
<style scoped>
    span.dlgenr-client-etymology-language {
        font-family: 'Cormorant Garamond', serif;
        font-weight: normal;
        font-size: 12pt;
        text-align: left;
        color: black;
    }
</style>