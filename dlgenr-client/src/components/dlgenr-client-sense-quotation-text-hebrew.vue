<template>
    <span class="dlgenr-client-sense-quotation-text-hebrew"> {{ hebrewText }} </span>
</template>
<script>
export default {
    name : 'dlgenr-client-sense-quotation-text-hebrew',
    computed : {
        hebrewText(){
            let hebrewText = this.$attrs.hebrewText;
            return hebrewText;
        }
    }
}
</script>
<style scoped>
    span.dlgenr-client-sense-quotation-text-hebrew {
        font-family: 'Frank Ruhl Libre', serif;
        font-size: 14pt;
        color: black;
    }
</style>