<template>
    <div class="dlgenr-client-etymology">
        <dlgenr-client-etymology-header v-bind:header="etymologyHeaderAndType"/>
        <dlgenr-client-etymology-label v-bind:languageLabel="languageLabel"/>
        <dlgenr-client-etymology-language v-bind:language="language"/>
        <dlgenr-client-etymology-link-label v-bind:linkLabel="linkLabel"/>
        <dlgenr-client-etymology-link v-bind:target="link.target" v-bind:linkText="link.linkText"/>
    </div>
</template>
<script>
import DlGenRClientEtymologyHeader from './dlgenr-client-etymology-header';
import DlGenRClientEtymologyLabel from './dlgenr-client-etymology-label';
import DlGenRClientEtymologyLanguage from './dlgenr-client-etymology-language';
import DlGenRClientEtymologyLinkLabel from './dlgenr-client-etymology-link-label';
import DlGenRClientEtymologyLink from './dlgenr-client-etymology-link';

export default {
    name: 'dlgenr-client-etymology',
    components: {
        'dlgenr-client-etymology-header' : DlGenRClientEtymologyHeader,
        'dlgenr-client-etymology-label' : DlGenRClientEtymologyLabel,
        'dlgenr-client-etymology-language' : DlGenRClientEtymologyLanguage,
        'dlgenr-client-etymology-link-label' : DlGenRClientEtymologyLinkLabel,
        'dlgenr-client-etymology-link' : DlGenRClientEtymologyLink
    },
    props: { entry : { type: XMLDocument }},
    computed: {
        etymologyHeaderAndType(){
            let headerAndType = "Etymology ";
            let type = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('etym')[0].getAttribute('type');
            headerAndType = headerAndType + "(" + type + "): ";
            return headerAndType;
        },
        languageLabel(){
            let languageLabel = "";
            languageLabel = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('etym')[0].getElementsByTagName('lbl')[0].childNodes[0].nodeValue;
            return languageLabel;
        },
        language(){
            let language = "";
            language = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('etym')[0].getElementsByTagName('lang')[0].childNodes[0].nodeValue;
            return language;
        },
        linkLabel(){
            let linkLabel = "";
            linkLabel = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('etym')[0].getElementsByTagName('cit')[0].getElementsByTagName('xr')[0].getElementsByTagName('lbl')[0].childNodes[0].nodeValue;
            return linkLabel;
        },
        link(){
            let target = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('etym')[0].getElementsByTagName('cit')[0].getElementsByTagName('xr')[0].getElementsByTagName('ref')[0].getAttribute('target');
            let linkText = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('etym')[0].getElementsByTagName('cit')[0].getElementsByTagName('xr')[0].getElementsByTagName('ref')[0].childNodes[0].nodeValue;
            return ({ "target" : target, "linkText" : linkText });
        }
    }
}
</script>
<style scoped>
    div.dlgenr-client-etymology {
        text-align: left;
        margin-left: 40pt;
        margin-right: 20pt;
        margin-top: 0pt;
        margin-bottom: 0pt;
        padding: 0pt;
    }
</style>