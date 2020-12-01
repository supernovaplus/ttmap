function isArray(r){return"[object Array]"===Object.prototype.toString.call(r)}
function cel(r){if(!isArray(r))return cel.call(this,Array.prototype.slice.call(arguments));var e=r[0],t=r[1],a=document.createElement(e),c=1;if("object"==typeof t&&null!==t&&!isArray(t)){for(var l in t)a[l]=t[l];c=2}for(var n=c;n<r.length;n++)isArray(r[n])?a.appendChild(cel(r[n])):a.appendChild(document.createTextNode(r[n]));return a}
function randomColor (colorNum, colors) { return "hsl(" + (colorNum * (360 / (colors < 1 ? 1 : colors)) % 360) + ",100%,50%)"; };
function randomColor2 () { return randomColor(Math.floor(Math.random() * 999), 100); };
function promiseTimeout (promise) { return new Promise(function(resolve, reject) {
    setTimeout(() => reject(new Error("timeout")), 4000);
    promise.then(resolve, reject);
}); };