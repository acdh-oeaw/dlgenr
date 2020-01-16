<template>
    <span class="dlgenr-client-inflected-form-grammatical-information"> ({{ grammaticalInformation }})</span>
</template>
<script>
export default {
    name : 'dlgenr-client-inflected-form-grammatical-information',
    props : { grammaticalInformation : { type : String }}
}
</script>
<style scoped>
    span.dlgenr-client-inflected-form-grammatical-information {
        font-family: 'Cormorant Garamond', serif;
        font-weight: normal;
        font-size: 12pt;
        text-align: left;
        color: black;
    }
</style>