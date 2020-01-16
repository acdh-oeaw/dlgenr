<template>
    <div class="dlgenr-client-etymology">
        <dlgenr-client-etymology-header v-bind:segment="segmentLabel" v-if="segments.length != 0"></dlgenr-client-etymology-header>
        <!--<component v-for="(segment,index) in segments" v-bind:key="index" v-bind:is="componentLoader(segment)"></component>-->
        <span v-for="(segment,index) in segments" v-bind:key="index">
            <component v-if="segment.language == 'en' || segment.language == 'de'" v-bind:is="dlGenRClientEtymologyTextLatin" v-bind="segment"/>
            <component v-if="segment.language == 'hbo'" v-bind:is="dlGenRClientEtymologyTextHebrew" v-bind="segment"/>
            <component v-if="segment.language == 'grc'" v-bind:is="dlGenRClientEtymologyTextGreek" v-bind="segment"/>
        </span>
    </div>
</template>
<script>
import DlGenRClientEtymologyTextLatin from './dlgenr-client-etymology-text-latin';
import DlGenRClientEtymologyTextGreek from './dlgenr-client-etymology-text-greek';
import DlGenRClientEtymologyTextHebrew from './dlgenr-client-etymology-text-hebrew';
import DlGenRClientEtymologyHeader from './dlgenr-client-etymology-header';

export default {
    name: 'dlgenr-client-etymology',
    components: {
        'dlgenr-client-etymology-header' : DlGenRClientEtymologyHeader,
        'dlgenr-client-etymology-text-latin' : DlGenRClientEtymologyTextLatin,
        'dlgenr-client-etymology-text-greek' : DlGenRClientEtymologyTextGreek,
        'dlgenr-client-etymology-text-hebrew' : DlGenRClientEtymologyTextHebrew
    },
    props: { entry : { type: XMLDocument }},
    data: function(){ 
        return {
            'segmentLabel' : { 'content' : "Etymology: "},
            'dlGenRClientEtymologyTextLatin' : DlGenRClientEtymologyTextLatin,
            'dlGenRClientEtymologyTextGreek' : DlGenRClientEtymologyTextGreek,
            'dlGenRClientEtymologyTextHebrew' : DlGenRClientEtymologyTextHebrew
        }
    },
    computed: {
        segments(){
            let segments = new Array();
            if(this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('etym')[0] != undefined){
                let numberOfSegments = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('etym')[0].getElementsByTagName('seg').length;
                for(var i = 0; i < numberOfSegments; i++){
                    let languageOfSegment = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('etym')[0].getElementsByTagName('seg')[i].getAttribute('xml:lang');
                    let contentOfSegment = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('etym')[0].getElementsByTagName('seg')[i].childNodes[0].nodeValue;
                    if(i > 0 && i < numberOfSegments){ segments.push({ 'language' : 'en', 'content' : "-" })}
                    segments.push({ 'language' : languageOfSegment, 'content' : contentOfSegment })
                }
            }
            return segments;
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