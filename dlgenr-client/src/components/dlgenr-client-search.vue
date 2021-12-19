<template>
    <div class="dlgenr-client-search">
        <dlgenr-client-search-text-input v-on:keyDown="processKeyEvent"/>
        <dlgenr-client-search-language-selection v-on:propagateEventLanguageSelected="switchLanguage"/>
        <div class="row">
            <div class="col-8">
                <dlgenr-client-search-keymap-hebrew v-if="isHebrewEnabled" v-bind:hebrewKeyMap="getHebrewKeyMap" v-on:propagateEventKeyClicked="processMouseClick"/>
                <dlgenr-client-search-keymap-greek v-if="isGreekEnabled" v-bind:greekKeyMap="getGreekKeyMap" v-on:propagateEventKeyClicked="processMouseClick"/>
                <dlgenr-client-search-keymap-coptic v-if="isCopticEnabled" v-bind:copticKeyMap="getCopticKeyMap" v-on:propagateEventKeyClicked="processMouseClick"/>
                <dlgenr-client-search-keymap-syriac v-if="isSyriacEnabled" v-bind:syriacKeyMap="getSyriacKeyMap" v-on:propagateEventKeyClicked="processMouseClick"/>
            </div>
            <div class="col-4">
                <dlgenr-client-search-search-type-selection v-on:propagateEventLemmataSelected="lemmataSelected" v-on:propagateEventFullTextSelected="fulltextSelected"/>
                <dlgenr-client-search-submit v-on:propagateEventSubmitClicked="propagateEventSubmitClicked"/>
                <dlgenr-client-search-clear v-on:propagateEventClearClicked="clearInputField"/>
            </div>
        </div>
    </div>
</template>
<script>
/* global CodeMirror */
import { getHebrewKeyMap,getGreekKeyMap,getCopticKeyMap,getSyriacKeyMap } from './config.js';
import DlGenRClientSearchTextInput from './dlgenr-client-search-text-input';
import DlGenRClientSearchLanguageSelection from './dlgenr-client-search-language-selection';
import DlGenRClientSearchClear from './dlgenr-client-search-clear';
import DlGenRClientSearchSubmit from './dlgenr-client-search-submit';
import DlGenRClientSearchKeymapHebrew from './dlgenr-client-search-keymap-hebrew';
import DlGenRClientSearchKeymapGreek from './dlgenr-client-search-keymap-greek';
import DlGenRClientSearchKeymapCoptic from './dlgenr-client-search-keymap-coptic';
import DlGenRClientSearchKeymapSyriac from './dlgenr-client-search-keymap-syriac';
import DlGenRClientSearchSearchTypeSelection from './dlgenr-client-search-search-type-selection';

export default {
  name: 'dlgenr-client-search',
  components: {
    'dlgenr-client-search-text-input' : DlGenRClientSearchTextInput,
    'dlgenr-client-search-language-selection' : DlGenRClientSearchLanguageSelection,
    'dlgenr-client-search-clear' : DlGenRClientSearchClear,
    'dlgenr-client-search-submit' : DlGenRClientSearchSubmit,
    'dlgenr-client-search-search-type-selection' : DlGenRClientSearchSearchTypeSelection,
    'dlgenr-client-search-keymap-hebrew' : DlGenRClientSearchKeymapHebrew,
    'dlgenr-client-search-keymap-greek' : DlGenRClientSearchKeymapGreek,
    'dlgenr-client-search-keymap-coptic' : DlGenRClientSearchKeymapCoptic,
    'dlgenr-client-search-keymap-syriac' : DlGenRClientSearchKeymapSyriac
  },
  data: function(){
      return {
        getHebrewKeyMap: getHebrewKeyMap(),
        getGreekKeyMap: getGreekKeyMap(),
        getCopticKeyMap: getCopticKeyMap(),
        getSyriacKeyMap: getSyriacKeyMap(),
        isHebrewEnabled: false,
        isCopticEnabled: false,
        isGreekEnabled: false,
        isSyriacEnabled: false,
        currentLanguage: "Latin",
        myCodeMirror: null,
        idOfTextarea: "search_field"
      }
  },
  mounted() {
      this.$nextTick(function(){
      if(this.myCodeMirror === null){
        let textarea = document.getElementById("search_field");
        this.myCodeMirror = CodeMirror.fromTextArea(textarea,{ lineNumbers : false });
        this.myCodeMirror.getDoc().setValue("");
      }

      this.myCodeMirror.on('keyup',function(){
        event.preventDefault();
        event.codemirrorIgnore = true;
        });

      this.myCodeMirror.on('keypress',function(){
        event.preventDefault();
        event.codemirrorIgnore = true;
        });

      this.myCodeMirror.on('keydown',function(){
         event.preventDefault();
         event.codemirrorIgnore = true;
         });
      });
},
  methods: {
    switchLanguage(event){
        switch (event){
            case 'Latin' : { this.isHebrewEnabled = false; this.isCopticEnabled = false; this.isGreekEnabled = false; this.isSyriacEnabled = false; this.currentLanguage = "Latin"; break; }
            case 'Aramaic' : { this.isHebrewEnabled = true; this.isCopticEnabled = false; this.isGreekEnabled = false; this.isSyriacEnabled = false; this.currentLanguage = "Aramaic"; break; }
            case 'Greek' : { this.isHebrewEnabled = false; this.isCopticEnabled = false; this.isGreekEnabled = true; this.isSyriacEnabled = false; this.currentLanguage = "Greek"; break; }
            case 'Coptic' : { this.isHebrewEnabled = false; this.isCopticEnabled = true; this.isGreekEnabled = false; this.isSyriacEnabled = false; this.currentLanguage = "Coptic"; break; }
            case 'Syriac' : { this.isHebrewEnabled = false; this.isCopticEnabled = false; this.isGreekEnabled = false; this.isSyriacEnabled = true; this.currentLanguage = "Syriac"; break; }
            default: { this.isHebrewEnabled = false; this.isCopticEnabled = false; this.isGreekEnabled = false; this.isSyriacEnabled = false; this.currentLanguage = "Latin"; }
        }
    },
    clearInputField(){
        console.log("Clear input field invoked.");
        this.myCodeMirror.getDoc().setValue("");
    },
    propagateEventSubmitClicked(){
        let searchValue = this.myCodeMirror.getDoc().getValue();
        this.$emit('propagateEventSubmitClicked',searchValue);
    },
    processMouseClick(event){
        console.log("Key clicked " + event);
        this.myCodeMirror.getDoc().replaceRange(event[0],this.myCodeMirror.getDoc().getCursor('from'),this.myCodeMirror.getDoc().getCursor('to'),false);
    },
    lemmataSelected(){
        console.log("Search: lemmata selected")
        this.$emit('propagateEventLemmataSelected');
    },
    fulltextSelected(){
        console.log("Search: fulltext selected");
        this.$emit('propagateEventFullTextSelected');
    },
    processKeyEvent(event){
      let keyToTransmit = event.key;
      console.log("key: " + keyToTransmit);
      let currentKeyMap = null;
      switch(this.currentLanguage){
         case "Syriac": currentKeyMap = getSyriacKeyMap(); break;
         case "Aramaic": currentKeyMap = getHebrewKeyMap(); break;
         case "Coptic": currentKeyMap = getCopticKeyMap(); break;
         case "Greek": currentKeyMap = getGreekKeyMap(); break;
         default: currentKeyMap = null;
      }
      console.log("language: " + this.currentLanguage);
      if (currentKeyMap !== null && currentKeyMap.has(event.key)){
         keyToTransmit = currentKeyMap.get(event.key);
         console.log("key: " + keyToTransmit);
         event.preventDefault();
         event.codemirrorIgnore = true;
      }
      if (keyToTransmit.startsWith('Dead')){ keyToTransmit = keyToTransmit.substring(4,keyToTransmit.length); }
      if (keyToTransmit.startsWith('AltGraph')){ keyToTransmit = keyToTransmit.substring(8,keyToTransmit.length); }
      switch (keyToTransmit){
         case 'Backspace': this.myCodeMirror.execCommand("delCharBefore"); event.preventDefault(); event.codemirrorIgnore = true; break;
         case 'Shift': break;
         case 'Escape': break;
         case 'Tab': break;
         case 'CapsLock': break;
         case 'Control': break;
         case 'Alt': break;
         case 'OS': break;
         case 'Enter': this.propagateEventSubmitClicked(); event.preventDefault(); break;
         case 'Delete': this.myCodeMirror.execCommand('delCharAfter'); event.preventDefault(); event.codemirrorIgnore = true; break;
         case 'ArrowUp': break;
         case 'ArrowDown': break;
         case 'ArrowLeft': this.myCodeMirror.execCommand("goCharLeft"); event.preventDefault(); event.codemirrorIgnore = true; break;
         case 'ArrowRight': this.myCodeMirror.execCommand("goCharRight"); event.preventDefault(); event.codemirrorIgnore = true; break;
         case 'Insert': break;
         case 'Home': this.myCodeMirror.execCommand('goDocStart'); event.preventDefault(); event.codemirrorIgnore = true; break;
         case 'End': this.myCodeMirror.execCommand('goDocEnd'); event.preventDefault(); event.codemirrorIgnore = true; break;
         case 'PageUp': break;
         case 'PageDown': break;
         default: this.myCodeMirror.getDoc().replaceRange(keyToTransmit,this.myCodeMirror.getDoc().getCursor('from'),this.myCodeMirror.getDoc().getCursor('to'),false);
      }
    }
    }
  }
</script>
<style scoped>
div.dlgenr-client-search {
    display: block;
}
</style>