<template>
    <div class="dlgenr-client-ref-bibliography-entry">
        <span class="dlgenr-client-ref-bibliography-entry-title">{{ title }}</span>
        <span class="dlgenr-client-ref-bibliography-entry-range">{{ range }}</span>
    </div>
</template>
<script>
export default {
    name : 'dlgenr-client-ref-bibliography-entry',
    props : { entry : { type : XMLDocument },
              bibliographyPosition : { type : Number },
              numberOfEntry : { type : Number }},
    computed : {
        title(){
            let title = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('ref')[this.$props.bibliographyPosition].getElementsByTagName('bibl')[this.$props.numberOfEntry].getElementsByTagName('title')[0].childNodes[0].nodeValue;
            return title + ', ';
        },
        range(){
            let range = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('ref')[this.$props.bibliographyPosition].getElementsByTagName('bibl')[this.$props.numberOfEntry].getElementsByTagName('citedRange')[0].childNodes[0].nodeValue;
            return range + '.';
        }
    }
}
</script>
<style scoped>
    div.dlgenr-client-ref-bibliography-entry {
        text-align : left;
        margin-left : 20pt;
        color : black;
        font-family : 'Cormorant Garamond', serif;
    }
    span.dlgenr-client-ref-bibliography-entry-title {
        color : black;
        font-family: 'Cormorant Garamond', serif;
    }
    span.dlgenr-client-ref-bibliography-entry-range {
        color : black;
        font-family: 'Cormorant Garamond', serif;
    }
</style>