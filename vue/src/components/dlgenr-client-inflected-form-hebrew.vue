<template>
    <span class="dlgenr-client-inflected-form-hebrew">{{ hebrew }}</span>
</template>
<script>
export default {
    name : 'dlgenr-client-inflected-form-hebrew',
    props : { hebrew : { type : String }}
}
</script>
<style scoped>
    span.dlgenr-client-inflected-form-hebrew {
        font-family: 'Frank Ruhl Libre', serif;
        font-weight: normal;
        font-size: 12pt;
        text-align: left;
        color: black;
    }
</style>