!function(){"use strict";var e="undefined"!=typeof window?window:global;if("function"!=typeof e.require){var o={},i={},r=function(e,o){return{}.hasOwnProperty.call(e,o)},t=function(e,o){var i,r,t=[];i=/^\.\.?(\/|$)/.test(o)?[e,o].join("/").split("/"):o.split("/");for(var n=0,s=i.length;s>n;n++)r=i[n],".."===r?t.pop():"."!==r&&""!==r&&t.push(r);return t.join("/")},n=function(e){return e.split("/").slice(0,-1).join("/")},s=function(o){return function(i){var r=n(o),s=t(r,i);return e.require(s,o)}},u=function(e,o){var r={id:e,exports:{}};return i[e]=r,o(r.exports,s(e),r),r.exports},f=function(e,n){var s=t(e,".");if(null==n&&(n="/"),r(i,s))return i[s].exports;if(r(o,s))return u(s,o[s]);var f=t(s,"./index");if(r(i,f))return i[f].exports;if(r(o,f))return u(f,o[f]);throw new Error('Cannot find module "'+e+'" from "'+n+'"')},a=function(e,i){if("object"==typeof e)for(var t in e)r(e,t)&&(o[t]=e[t]);else o[e]=i},c=function(){var e=[];for(var i in o)r(o,i)&&e.push(i);return e};e.require=f,e.require.define=a,e.require.register=a,e.require.list=c,e.require.brunch=!0}}(),require.register("client/app/app/social-sidebar",function(e,o){window.socialSidebar=function(e){function i(i){o("client/bower_components/jquery/jquery.min");var r=jQuery;r(e).load(function(){function o(){var o=r(e).scrollTop(),f=e.innerHeight||r(e).height(),a=n.height(),p=Math.floor(Math.max((f-a)/2,0)),l=s.offset().top;o+p+a+i.distanceToFooter>l?(t.css({position:"relative"}),n.css({position:"absolute",top:l-i.distanceToFooter-a-t.offset().top})):u.offset().top>o+p?(t.css({position:"relative"}),n.css({position:"absolute",top:c})):n.offset().top-o!=p&&(t.css({position:"absolute"}),n.css({position:"fixed",top:p}))}var t=r(".social-sidebar-container"),n=r(".social-sidebar"),s=r(".page-footer"),u=r(i.anchor);if(u.length){var f=u.offset().top,a=n.offset().top,c=f-a;a!=f&&n.css({top:c}),n.css({visibility:"visible"}),r(e).scroll(o),r(e).resize(o)}else n.css({display:"none"})})}return{init:i}}(window,document)});