<template>
    <span class="dlgenr-client-equivalent-text-greek">{{ formGreek }}</span>
</template>
<script>
export default {
    name : 'dlgenr-client-equivalent-text-greek',
    props : { formGreek : { type : String }}
}
</script>
<style scoped>
    span.dlgenr-client-equivalent-text-greek {
        font-family: 'Cormorant Garamond', serif;
        font-size: 12pt;
        color: black;
        text-align: left;
        font-weight: normal;
    }
</style>