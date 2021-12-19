<template>
    <span class="dlgenr-client-inflected-form-header">{{ header }}</span>
</template>
<script>
export default {
    name : 'dlgenr-client-inflected-form-header',
    props : { header : { type : String }}
}
</script>
<style scoped>
    span.dlgenr-client-inflected-form-header {
        font-family: 'Cormorant Garamond', serif;
        font-weight: normal;
        font-size: 12pt;
        text-align: left;
        color: black;
    }
</style>