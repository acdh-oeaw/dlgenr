<template>
    <span class="dlgenr-client-sense-translation-text-latin">{{ translation }}</span>
</template>
<script>
export default {
    name : 'dlgenr-client-sense-translation-text-latin',
    props : { translation : { type : String },
              language : { type: String }
    }
}
</script>
<style scoped>
    span.dlgenr-client-sense-translation-text-latin {
        background-color: #f5e3c9;
        color: black;
        padding: 3pt;
        border-radius: 2.5pt;
        font-family: 'Cormorant Garamond', serif;
        font-weight: medium;
    }
    span.dlgenr-client-sense-translation-text-language {
        color: black;
        font-family: 'Cormorant Garamond', serif;
        font-weight: medium;
    }
</style>