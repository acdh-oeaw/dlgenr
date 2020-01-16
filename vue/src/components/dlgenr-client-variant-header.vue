<template>
    <span class="dlgenr-client-variant-header">{{ header }}</span>
</template>
<script>
export default {
    name : 'dlgenr-client-variant-header',
    props : { header : { type : String }}
}
</script>
<style scoped>
    span.dlgenr-client-variant-header {
        font-family: 'Cormorant Garamond', serif;
        font-weight: normal;
        font-size: 12pt;
        text-align: left;
        color: black;
    }
</style>