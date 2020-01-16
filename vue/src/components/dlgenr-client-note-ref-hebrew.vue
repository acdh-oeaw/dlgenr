<template>
    <span class="dlgenr-client-note-ref-hebrew">{{ content }}</span>
</template>
<script>
export default {
    name : 'dlgenr-client-note-ref-hebrew',
    computed : {
        content(){
            let content = this.$attrs.content;
            return content;
        }
    }
}
</script>
<style scoped>
    span.dlgenr-client-note-ref-hebrew {
        font-family: 'Frank Ruhl Libre', serif;
        font-size: 12pt;
        font-weight: medium;
        color: #fc9803;
    }
</style>