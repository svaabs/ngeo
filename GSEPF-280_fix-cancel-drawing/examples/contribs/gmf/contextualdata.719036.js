(function(e){function r(r){var a=r[0];var l=r[1];var u=r[2];var i,c,s=0,p=[];for(;s<a.length;s++){c=a[s];if(n[c]){p.push(n[c][0])}n[c]=0}for(i in l){if(Object.prototype.hasOwnProperty.call(l,i)){e[i]=l[i]}}if(f)f(r);while(p.length){p.shift()()}o.push.apply(o,u||[]);return t()}function t(){var e;for(var r=0;r<o.length;r++){var t=o[r];var a=true;for(var u=1;u<t.length;u++){var i=t[u];if(n[i]!==0)a=false}if(a){o.splice(r--,1);e=l(l.s=t[0])}}return e}var a={};var n={28:0};var o=[];function l(r){if(a[r]){return a[r].exports}var t=a[r]={i:r,l:false,exports:{}};e[r].call(t.exports,t,t.exports,l);t.l=true;return t.exports}l.m=e;l.c=a;l.d=function(e,r,t){if(!l.o(e,r)){Object.defineProperty(e,r,{configurable:false,enumerable:true,get:t})}};l.r=function(e){Object.defineProperty(e,"__esModule",{value:true})};l.n=function(e){var r=e&&e.__esModule?function r(){return e["default"]}:function r(){return e};l.d(r,"a",r);return r};l.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)};l.p="";var u=window["webpackJsonp"]=window["webpackJsonp"]||[];var i=u.push.bind(u);u.push=r;u=u.slice();for(var c=0;c<u.length;c++)r(u[c]);var f=i;o.push([465,0]);return t()})({464:function(e,r,t){"use strict";t.r(r);var a=t(569);var n=t.n(a);var o=t(300);var l=t(56);var u=t(122);var i=t(59);var c=t(37);var f=t(46);var s=t(31);var p=t(52);var v={};v.module=angular.module("gmfapp",["gettext",o["a"].name,l["a"].name,u["a"].name]);v.module.value("gmfRasterUrl","https://geomapfish-demo.camptocamp.com/2.3/wsgi/raster");v.module.value("gmfContextualdatacontentTemplateUrl","partials/contextualdata.html");v.module.constant("defaultTheme","Demo");v.module.constant("angularLocaleScript","../build/angular-locale_{{locale}}.js");v.MainController=function(){this.map=new c["a"]({layers:[new s["a"]({source:new p["a"]})],view:new f["a"]({projection:i["a"],resolutions:[200,100,50,20,10,5,2.5,2,1,.5],center:[6e5,2e5],zoom:3})})};v.MainController.prototype.onRasterData=function(e,r){return{elelvation_diff:r["srtm"]-r["aster"]}};v.module.controller("MainController",v.MainController);r["default"]=v},465:function(e,r,t){t(73);t(72);e.exports=t(464)},569:function(e,r){}});
//# sourceMappingURL=contextualdata.719036.js.map