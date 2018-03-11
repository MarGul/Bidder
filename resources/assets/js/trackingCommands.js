/**
 * This file contains user tracking events for Google Analytics that are being reused.
 */

 export default {
     registerOpened(label = 'unknown') {
         this.$ga.event('Sign Up', 'Register Modal Opened', label);
     }
 }