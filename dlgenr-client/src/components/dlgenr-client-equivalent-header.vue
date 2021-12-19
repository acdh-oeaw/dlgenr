<template>
    <span class="dlgenr-client-equivalent-header">{{ header }}</span>
</template>
<script>
export default {
    name : 'dlgenr-client-equivalent-header',
    props : { header : { type : String }}
}
</script>
<style scoped>
    span.dlgenr-client-equivalent-header {
        font-family: 'Cormorant Garamond', serif;
        font-size: 12pt;
        color: black;
        text-align: left;
        font-weight: normal;
    }
</style>