System.register(["./p-4a14b061.system.js","./p-5d689c29.system.js","./p-6db41d57.system.js"],(function(n){"use strict";var t,e,r,u,i;return{setters:[function(n){t=n.c},function(n){e=n.h;r=n.a;u=n.b},function(n){i=n.createGesture}],execute:function(){var c=n("c",(function(n,c){var o;var f;var s=function(n,t,e){if(typeof document==="undefined"){return}var r=document.elementFromPoint(n,t);if(!r||!c(r)){d();return}if(r!==o){d();a(r,e)}};var a=function(n,e){o=n;if(!f){f=o}var r=o;t((function(){return r.classList.add("ion-activated")}));e()};var d=function(n){if(n===void 0){n=false}if(!o){return}var e=o;t((function(){return e.classList.remove("ion-activated")}));if(n&&f!==o){o.click()}o=undefined};return i({el:n,gestureName:"buttonActiveDrag",threshold:0,onStart:function(n){return s(n.currentX,n.currentY,r)},onMove:function(n){return s(n.currentX,n.currentY,u)},onEnd:function(){d(true);e();f=undefined}})}))}}}));