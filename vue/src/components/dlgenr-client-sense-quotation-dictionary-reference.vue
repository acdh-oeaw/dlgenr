<template>
    <span class="dlgenr-client-sense-quotation-dictionary-reference"> {{ hebrewText }} </span>
</template>
<script>
export default {
    name : 'dlgenr-client-sense-quotation-dictionary-reference',
    computed : {
        hebrewText(){
            let hebrewText = this.$attrs.hebrewText;
            return hebrewText;
        }
    }
}
</script>
<style scoped>
    span.dlgenr-client-sense-quotation-dictionary-reference {
        font-family: 'Frank Ruhl Libre', serif;
        font-size: 14pt;
        color: #fc9803;
    }
</style>