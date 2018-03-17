/**
 * This file contains user tracking events for Google Analytics that are being reused.
 */

 export default {
     registerOpened(label = 'unknown') {
         this.$ga.event('Login and Signup', 'Register Modal Opened', label);
     }
 }