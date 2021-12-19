<template>
    <span class="dlgenr-client-grammatical-information-header">{{ header }}</span>
</template>
<script>
export default {
    name : 'dlgenr-client-grammatical-information-header',
    props : { header : { type : String }}
}
</script>
<style scoped>
    span.dlgenr-client-grammatical-information-header {
        font-family: 'Cormorant Garamond', serif;
        font-weight: normal;
        font-size: 12pt;
        text-align: left;
        color: black;
    }
</style>