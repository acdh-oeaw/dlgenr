<template>
    <div class="dlgenr-client-grammatical-information">
        <dlgenr-client-grammatical-information-header v-bind:header="header"/>
        <dlgenr-client-grammatical-information-content v-bind:content="content"/>
    </div>
</template>
<script>
import DlGenRClientGrammaticalInformationHeader from './dlgenr-client-grammatical-information-header';
import DlGenRClientGrammaticalInformationContent from './dlgenr-client-grammatical-information-content';

export default {
    name : 'dlgenr-client-grammatical-information',
    components: {
        'dlgenr-client-grammatical-information-header' : DlGenRClientGrammaticalInformationHeader,
        'dlgenr-client-grammatical-information-content' : DlGenRClientGrammaticalInformationContent
    },
    props : { entry : { type: XMLDocument }},
    computed: {
        header(){ return "Grammatical information: "},
        content(){
            let grammaticalInformation = '';
            if (this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[0] != undefined){
                let numberOfFormNodes = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form').length;
                let positionOfLemma = 0;
                    for (let i = 0; i < numberOfFormNodes; i++){
                        let type = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[i].getAttribute('type');
                        if (type == 'lemma'){ positionOfLemma = i; }
                    }
                let gramGrpPos = '';
                if ( this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[positionOfLemma].getElementsByTagName('gramGrp')[0].getElementsByTagName('pos')[0] != undefined ){
                    gramGrpPos = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[positionOfLemma].getElementsByTagName('gramGrp')[0].getElementsByTagName('pos')[0].childNodes[0].nodeValue;
                }
                let gramGrpSubc = '';
                if ( this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[positionOfLemma].getElementsByTagName('gramGrp')[0].getElementsByTagName('subc')[0] != undefined ){
                    gramGrpSubc = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[positionOfLemma].getElementsByTagName('gramGrp')[0].getElementsByTagName('subc')[0].childNodes[0].nodeValue;
                }
                let gramGrpGram = '';
                if ( this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[positionOfLemma].getElementsByTagName('gramGrp')[0].getElementsByTagName('gram')[0] != undefined ){
                    let numberOfGramElements = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[positionOfLemma].getElementsByTagName('gramGrp')[0].getElementsByTagName('gram').length;
                    for (let i = 0; i < numberOfGramElements; i++){
                        let gram = '';
                        if (this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[positionOfLemma].getElementsByTagName('gramGrp')[0].getElementsByTagName('gram')[i].childNodes[0] != undefined){
                            gram = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[positionOfLemma].getElementsByTagName('gramGrp')[0].getElementsByTagName('gram')[i].childNodes[0].nodeValue;
                        }
                        if (i == 0) { gramGrpGram = gram; }
                        else { gramGrpGram = gramGrpGram + " " + gram; }
                    }
                }
                if ( gramGrpPos == '' && gramGrpSubc == '') { grammaticalInformation = gramGrpGram; }
                else { grammaticalInformation = gramGrpPos + " " + gramGrpSubc + " " + gramGrpGram; }
            }
            return grammaticalInformation;
        }
    }
}
</script>
<style scoped>
    div.dlgenr-client-grammatical-information {
        text-align : left;
        margin-top : 10pt;
        margin-left : 40pt;
        color: black;
    }
</style>