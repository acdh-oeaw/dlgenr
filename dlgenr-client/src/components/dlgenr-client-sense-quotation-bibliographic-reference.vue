<template>
    <div class="dlgenr-client-sense-quotation-bibliographic-reference">({{ bibliographicReference }})</div>
</template>
<script>
export default {
    name : 'dlgenr-client-sense-quotation-bibliographic-reference',
    computed : {
        bibliographicReference(){
            let bibliographicReference = this.$attrs.bibliographicReference;
            return bibliographicReference;
        }
    }
}
</script>
<style scoped>
    div.dlgenr-client-sense-quotation-bibliographic-reference {
        font-family: 'Cormorant Garamond', serif;
        font-weight: medium;
        font-size: 12pt;
        color: black;
        padding-left:20pt;
    }
</style>