(function(o){function n(n){var r=n[0];var a=n[1];var l=n[2];var s,c,u=0,f=[];for(;u<r.length;u++){c=r[u];if(t[c]){f.push(t[c][0])}t[c]=0}for(s in a){if(Object.prototype.hasOwnProperty.call(a,s)){o[s]=a[s]}}if(p)p(n);while(f.length){f.shift()()}i.push.apply(i,l||[]);return e()}function e(){var o;for(var n=0;n<i.length;n++){var e=i[n];var r=true;for(var l=1;l<e.length;l++){var s=e[l];if(t[s]!==0)r=false}if(r){i.splice(n--,1);o=a(a.s=e[0])}}return o}var r={};var t={10:0};var i=[];function a(n){if(r[n]){return r[n].exports}var e=r[n]={i:n,l:false,exports:{}};o[n].call(e.exports,e,e.exports,a);e.l=true;return e.exports}a.m=o;a.c=r;a.d=function(o,n,e){if(!a.o(o,n)){Object.defineProperty(o,n,{configurable:false,enumerable:true,get:e})}};a.r=function(o){Object.defineProperty(o,"__esModule",{value:true})};a.n=function(o){var n=o&&o.__esModule?function n(){return o["default"]}:function n(){return o};a.d(n,"a",n);return n};a.o=function(o,n){return Object.prototype.hasOwnProperty.call(o,n)};a.p="";var l=window["webpackJsonp"]=window["webpackJsonp"]||[];var s=l.push.bind(l);l.push=n;l=l.slice();for(var c=0;c<l.length;c++)n(l[c]);var p=s;i.push([359,0]);return e()})({317:function(o,n,e){"use strict";(function(o){var r=e(357);var t=e.n(r);var i=e(356);var a=e.n(i);var l=angular.module("ngeoPopover",[]);l.component_=function(){return{restrict:"A",scope:true,controller:"NgeoPopoverController as popoverCtrl",link:function n(e,r,t,i){i.anchorElm.on("hidden.bs.popover",function(){var o=i.anchorElm.data("bs.popover");o["inState"].click=false});i.anchorElm.on("inserted.bs.popover",function(){i.bodyElm.show();i.shown=true});i.anchorElm.popover({container:"body",html:true,content:i.bodyElm,placement:t["ngeoPopoverPlacement"]||"right"});if(t["ngeoPopoverDismiss"]){o(t["ngeoPopoverDismiss"]).on("scroll",function(){i.dismissPopover()})}e.$on("$destroy",function(){i.anchorElm.popover("destroy");i.anchorElm.unbind("inserted.bs.popover");i.anchorElm.unbind("hidden.bs.popover")})}}};l.anchorComponent=function(){return{restrict:"A",require:"^^ngeoPopover",link:function o(n,e,r,t){t.anchorElm=e}}};l.contentComponent=function(){return{restrict:"A",require:"^^ngeoPopover",link:function o(n,e,r,t){t.bodyElm=e;e.hide()}}};l.PopoverController_=function(o){this.shown=false;this.anchorElm=undefined;this.bodyElm=undefined;function n(o){if(this.anchorElm[0]!==o.target&&this.bodyElm.parent()[0]!==o.target&this.bodyElm.parent().find(o.target).length===0&&this.shown){this.dismissPopover()}}angular.element("body").on("mousedown",n.bind(this));o.$on("$destroy",function(){angular.element("body").off("mousedown",n)})};l.PopoverController_.$inject=["$scope"];l.PopoverController_.prototype.dismissPopover=function(){this.shown=false;this.anchorElm.popover("hide")};l.controller("NgeoPopoverController",l.PopoverController_);l.directive("ngeoPopover",l.component_);l.directive("ngeoPopoverAnchor",l.anchorComponent);l.directive("ngeoPopoverContent",l.contentComponent);n["a"]=l}).call(this,e(53))},358:function(o,n,e){"use strict";e.r(n);var r=e(475);var t=e.n(r);var i=e(317);var a={};a.module=angular.module("app",["gettext",i["a"].name]);n["default"]=a},359:function(o,n,e){e(55);e(54);o.exports=e(358)},475:function(o,n){}});
//# sourceMappingURL=popover.7814d0.js.map