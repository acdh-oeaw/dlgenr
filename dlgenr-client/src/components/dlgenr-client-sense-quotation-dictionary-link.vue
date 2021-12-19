<template>
    <div class="dlgenr-client-sense-quotation-dictionary-link">
        <span class="dlgenr-client-sense-quotation-dictionary-link-text" v-on:click="$emit('showLink',linkToEntry)"> {{ hebrewText }} </span>
    </div>
</template>
<script>
export default {
    name : 'dlgenr-client-sense-quotation-dictionary-link',
    emits: ['showLink'],
    data() {
        return {
          linkToEntry: this.$attrs.link.reference
        }
    },
    computed : {
        hebrewText(){
            let hebrewText = this.$attrs.link.linkText;
            return hebrewText;
        }
    }
}
</script>
<style scoped>
    div.dlgenr-client-sense-quotation-dictionary-link {
        margin-left: 20pt;
    }
    span.dlgenr-client-sense-quotation-dictionary-link-text {
        font-family: 'Frank Ruhl Libre', serif;
        font-size: 14pt;
        color: #fc9803;
        direction: rtl;
        cursor: pointer;
    }
</style>