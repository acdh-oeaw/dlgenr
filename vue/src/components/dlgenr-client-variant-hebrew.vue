<template>
    <span class="dlgenr-client-variant-hebrew">{{ hebrew }}</span>
</template>
<script>
export default {
    name : 'dlgenr-client-variant-hebrew',
    props : { hebrew : { type : String }}
}
</script>
<style scoped>
    span.dlgenr-client-variant-hebrew {
        font-family: 'Frank Ruhl Libre', serif;
        font-weight: normal;
        font-size: 12pt;
        text-align: left;
        color: black;
    }
</style>