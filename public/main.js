!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){e.exports=jQuery},function(e,t,n){"use strict";n.r(t),n(2);const r="myPurchaseList",a=localStorage.getItem(r);function c(e,t){localStorage.setItem(t,JSON.stringify(e))}function o(e){if(e.hasChildNodes())for(;e.firstChild;)e.removeChild(e.firstChild)}function l(e,t,n){o(n);const r=document.createElement("p");r.className=e,r.innerHTML=t,n.appendChild(r)}function i(e){for(let t in e)e[t].disabled=!1}const u=()=>({showPurch:document.getElementById("show-btn"),clearPurch:document.getElementById("clear-btn"),clearAllPurch:document.getElementById("clear-all-btn"),reportPurch:document.getElementById("report-btn")});function s(){p.length>0?d():(l("empty-message","Purchase list is empty. Please add purchase to the list",y),function(e){for(let t in e)e[t].disabled=!0}(u()))}function d(){p.sort((e,t)=>new Date(e.date)-new Date(t.date)),o(y),p.forEach(e=>{let t=document.createElement("li");t.className="purchase-list-el";let n=document.createElement("p");n.className="purchase-date",n.innerHTML=`${e.date}`,y.appendChild(t),t.appendChild(n),e.items.map(e=>{let n=document.createElement("p");return n.className="purchase-item",n.innerHTML=`${e.productName} ${e.amount} ${e.currency}`,t.appendChild(n)})})}const m=["AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN","BAM","BBD","BDT","BGN","BHD","BIF","BMD","BND","BOB","BRL","BSD","BTC","BTN","BWP","BYN","BYR","BZD","CAD","CDF","CHF","CLF","CLP","CNY","COP","CRC","CUC","CUP","CVE","CZK","DJF","DKK","DOP","DZD","EGP","ERN","ETB","EUR","FJD","FKP","GBP","GEL","GGP","GHS","GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR","ILS","IMP","INR","IQD","IRR","ISK","JEP","JMD","JOD","JPY","KES","KGS","KHR","KMF","KPW","KRW","KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LTL","LVL","LYD","MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRO","MUR","MVR","MWK","MXN","MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SLL","SOS","SRD","STD","SVC","SYP","SZL","THB","TJS","TMT","TND","TOP","TRY","TTD","TWD","TZS","UAH","UGX","USD","UYU","UZS","VEF","VND","VUV","WST","XAF","XAG","XAU","XCD","XDR","XOF","XPF","YER","ZAR","ZMK","ZMW","ZWL"];function f(e){return"Invalid Date"!==new Date(e).toLocaleString()}let p=JSON.parse(a)||[];const y=document.getElementById("list-wrapper");var D=n(0),P=n.n(D);const g=function(e){const t="http://data.fixer.io/api/latest?access_key=c2cb5609f200c8bff6e7bb47db4dbf5d&symbols="+e;let n;return P.a.ajaxSetup({async:!1}),P.a.getJSON(t,function(e){for(let t in e.rates)n=e.rates[t]}),n},h=document.getElementById("add-btn"),B=document.getElementById("show-btn"),S=document.getElementById("clear-btn"),N=document.getElementById("clear-all-btn"),E=document.getElementById("report-btn");document.getElementById("list-wrapper"),h.addEventListener("click",function(e){const t=(e=document.getElementById("add").value).split(" ");if(0!==e.length){document.getElementById("add").value="";const e={date:void 0,currency:void 0,amount:void 0,"product name":""};if(t.forEach(t=>{f(t)&&3===t.split("-").length?e.date=t:function(e){return m.indexOf(e)>=0}(t)?e.currency=t:Number(t)?e.amount=t:e["product name"]+=` ${t}`}),void 0===e.date||void 0===e.currency||void 0===e.amount||""===e["product name"]){let t,n=[];for(let t in e)e[t]||n.push(t);switch(n.length){case 1:t=n[0];break;case 2:t=n.join(" and ");break;case 3:t=n[0]+", "+n[1]+" and "+n[2];break;default:t=""}l("error-message",`Please check ${t}`,y)}else{const t={dateP:""+e.date,amountP:""+e.amount,currencyP:""+e.currency,productP:""+e["product name"]};if(p.some(e=>e.date===t.dateP)){for(let e=0;e<p.length;e++)t.dateP===p[e].date&&p[e].items.push({amount:t.amountP,currency:t.currencyP,productName:t.productP});i(u()),c(p,r),d()}else p.push(function(){return{date:this.dateP,items:[{amount:this.amountP,currency:this.currencyP,productName:this.productP}]}}.call(t)),c(p,r),i(u()),d()}}else l("empty-input",'Please enter string in format "YYYY-MM-DD 0 USD Product"',y)}),S.addEventListener("click",function(e){if(p.length>0)if(e=document.getElementById("clear").value,document.getElementById("clear").value="",0!==e.length&&f(e)&&3===e.split("-").length)if(p.every(t=>new Date(t.date).getTime()!==new Date(e).getTime()))l("error-message","There is no any purchaise for this date",y);else for(let t=0;t<p.length;t++)new Date(p[t].date).getTime()===new Date(e).getTime()&&(p.splice(t,1),c(p,r),s());else l("empty-input",'Please enter string in format "YYYY-MM-DD"',y);else s()}),E.addEventListener("click",function(e){if(p.length>0){e=document.getElementById("report").value,document.getElementById("report").value="";const t=e.split(" ");if(0!==e.length&&2===t.length){const e=t[0],n=t[1];let r=p.filter(t=>t.date.split("-")[0]===e);if(r.length>0){let t=r.reduce((e,t)=>e+t.items.reduce((e,t)=>{let n=g(t.currency);return e+Number(t.amount)/n},0),0),a=parseFloat((t*g(n)).toFixed(2));isNaN(a)?l("error-message","Currency which you enter does not exist. Please try again",y):l("total-year-message",`Total for ${e} in ${n} currency is ${a}`,y)}else f(e)?l("error-message","There is no any purchaise in this year",y):l("error-message","Year which you enter is not correct. Please try again",y)}else l("empty-message",'Please enter string in format "YYYY USD"',y)}else s()}),B.addEventListener("click",s),N.addEventListener("click",clearAll)},function(e,t){}]);