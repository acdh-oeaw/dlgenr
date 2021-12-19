<template>
    <span class="dlgenr-client-sense-quotation-translation-latin-text"> {{ latinText }} </span>
</template>
<script>
export default {
    name : 'dlgenr-client-sense-quotation-translation-latin-text',
    computed : {
        latinText(){
            let latinText = this.$attrs.latinText;
            return latinText;
        }
    }
}
</script>
<style scoped>
    span.dlgenr-client-sense-quotation-translation-latin-text {
        font-family : 'Cormorant Garamond', serif;
        font-weight: medium;
        font-size: 12pt;
        color: black;
    }
</style>