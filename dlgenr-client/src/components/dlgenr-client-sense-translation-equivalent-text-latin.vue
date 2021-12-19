<template>
    <div class="dlgenr-client-sense-translation-equivalent-text-div">
        <span class="dlgenr-client-sense-translation-equivalent-text-latin">{{ translationEquivalent.translation }}</span>
        <span class="dlgenr-client-sense-translation-equivalent-text-language">({{ translationEquivalent.language }})</span>
    </div>
</template>
<script>
export default {
    name : 'dlgenr-client-sense-translation-equivalent-text-latin',
    props : { translationEquivalent : { type : Object }}
}
</script>
<style scoped>
    span.dlgenr-client-sense-translation-equivalent-text-latin {
        background-color: #f5e3c9;
        color: black;
        padding: 3pt;
        border-radius: 2.5pt;
        font-family: 'Cormorant Garamond', serif;
        font-weight: medium;
    }
    span.dlgenr-client-sense-translation-equivalent-text-language {
        color: black;
        font-family: 'Cormorant Garamond', serif;
        font-weight: medium;
    }
    div.dlgenr-client-sense-translation-equivalent-text-div {
        display: inline;
    }
</style>