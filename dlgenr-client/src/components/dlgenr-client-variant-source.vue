<template>
    <span class="dlgenr-client-variant-source"> - {{ source }}</span>
</template>
<script>
export default {
    name : 'dlgenr-client-variant-source',
    props : { source : { type : String }}
}
</script>
<style scoped>
    span.dlgenr-client-variant-source {
        font-family: 'Cormorant Garamond', serif;
        font-weight: normal;
        font-size: 12pt;
        font-style: italic;
        text-align: left;
        color: black;
        direction: ltr;
    }
</style>