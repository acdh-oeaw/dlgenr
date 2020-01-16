<template>
    <div class="dlgenr-client-equivalent">
        <dlgenr-client-equivalent-header v-bind:header="header"/>
        <dlgenr-client-equivalent-text-greek v-bind:formGreek="formGreek"/>
    </div>
</template>
<script>
import DlGenRClientEquivalentHeader from './dlgenr-client-equivalent-header';
import DlGenRClientEquivalentTextGreek from './dlgenr-client-equivalent-text-greek';

export default {
    name : 'dlgenr-client-equivalent',
    components : {
        'dlgenr-client-equivalent-header' : DlGenRClientEquivalentHeader,
        'dlgenr-client-equivalent-text-greek' : DlGenRClientEquivalentTextGreek
    },
    props : { entry : { type : XMLDocument }},
    data : function(){ return { 'header' : 'Equivalent: '}},
    computed: {
        formGreek(){
            let position = this.$attrs.equivalentPosition;
            let formGreek = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[position].getElementsByTagName('quote')[0].childNodes[0].nodeValue;
            return formGreek;
        }
    }
}
</script>
<style scoped>
    div.dlgenr-client-equivalent {
        text-align: left;
        margin-left: 40pt;
        color: black;
        font-family: 'Cormorant Garamond', serif;
    }
</style>