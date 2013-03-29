/*!
 * HTMLHint v0.9.2
 * https://github.com/yaniswang/HTMLHint
 *
 * (c) 2013 Yanis Wang <yanis.wang@gmail.com>.
 * MIT Licensed
 */
var HTMLHint=function(e){var t=[],a={};return a.version="0.9.2",a.defaultRuleset={"tagname-lowercase":!0,"attr-lowercase":!0,"attr-value-double-quotes":!0,"doctype-first":!0,"tag-pair":!0,"spec-char-escape":!0},a.addRule=function(e){t[e.id]=e},a.verify=function(n,r){r===e&&(r=a.defaultRuleset);var i,s=new HTMLParser,o=new a.Reporter(n.split(/\r?\n/),r);for(var l in r)i=t[l],i!==e&&i.init(s,o,r[l]);return s.parse(n),o.messages},a}();"object"==typeof exports&&exports&&(exports.HTMLHint=HTMLHint),function(e){var t=function(){var e=this;e._init.apply(e,arguments)};t.prototype={_init:function(e,t){var a=this;a.lines=e,a.ruleset=t,a.messages=[]},error:function(e,t,a,n,r){this.report("error",e,t,a,n,r)},warn:function(e,t,a,n,r){this.report("warning",e,t,a,n,r)},info:function(e,t,a,n,r){this.report("info",e,t,a,n,r)},report:function(e,t,a,n,r,i){var s=this;s.messages.push({type:e,message:t,raw:i,evidence:s.lines[a-1],line:a,col:n,rule:r})}},e.Reporter=t}(HTMLHint);var HTMLParser=function(e){var t=function(){var e=this;e._init.apply(e,arguments)};return t.prototype={_init:function(){var e=this;e._listeners={},e._mapCdataTags=e.makeMap("script,style"),e._arrBlocks=[]},makeMap:function(e){for(var t={},a=e.split(","),n=0;a.length>n;n++)t[a[n]]=!0;return t},parse:function(t){function a(t,a,n,r){var i=n-h+1;r===e&&(r={}),r.raw=a,r.pos=n,r.line=w,r.col=i,L.push(r),c.fire(t,r);for(var s;s=p.exec(a);)w++,h=n+p.lastIndex}var n,r,i,s,o,l,d,c=this,u=c._mapCdataTags,g=/<(?:\/([^\s>]+)\s*|!--([\s\S]*?)--|!([^>]*?)|([\w\-:]+)((?:"[^"]*"|'[^']*'|[^"'<>])*?)\s*(\/?))>/g,f=/\s*([\w\-:]+)(?:\s*=\s*(?:(")([^"]*)"|(')([^']*)'|([^\s]+)))?/g,p=/\r?\n/g,m=0,v=0,h=0,w=1,L=c._arrBlocks;for(c.fire("start",{pos:0,line:1,col:1});n=g.exec(t);)if(r=n.index,r>m&&(d=t.substring(m,r),o?l.push(d):a("text",d,m)),m=g.lastIndex,!(i=n[1])||(o&&i===o&&(d=l.join(""),a("cdata",d,v,{tagName:o}),o=null,l=null),o))if(o)l.push(n[0]);else if(i=n[4]){s=[];for(var b,H=n[5],y=0;b=f.exec(H);){var T=b[1],x=b[2]?b[2]:b[4]?b[4]:"",M=b[3]?b[3]:b[5]?b[5]:b[6]?b[6]:"";s.push({name:T,value:M,quote:x,index:b.index,raw:b[0]}),y+=b[0].length}y===H.length?(a("tagstart",n[0],r,{tagName:i,attrs:s,close:n[6]}),u[i]&&(o=i,l=[],v=m)):a("text",n[0],r)}else(n[2]||n[3])&&a("comment",n[0],r,{content:n[2]||n[3],"long":n[2]?!0:!1});else a("tagend",n[0],r,{tagName:i});t.length>m&&(d=t.substring(m,t.length),a("text",d,m)),c.fire("end",{pos:m,line:w,col:m-h+1})},addListener:function(t,a){for(var n,r=this._listeners,i=t.split(/[,\s]/),s=0,o=i.length;o>s;s++)n=i[s],r[n]===e&&(r[n]=[]),r[n].push(a)},fire:function(t,a){a===e&&(a={}),a.type=t;var n=this,r=[],i=n._listeners[t],s=n._listeners.all;i!==e&&(r=r.concat(i)),s!==e&&(r=r.concat(s));for(var o=0,l=r.length;l>o;o++)r[o].call(n,a)},removeListener:function(t,a){var n=this._listeners[t];if(n!==e)for(var r=0,i=n.length;i>r;r++)if(n[r]===a){n.splice(r,1);break}},fixPos:function(e,t){var a,n=e.raw.substr(0,t),r=n.split(/\r?\n/),i=r.length-1,s=e.line;return i>0?(s+=i,a=r[i].length+1):a=e.col+t,{line:s,col:a}}},t}();"object"==typeof exports&&exports&&(exports.HTMLParser=HTMLParser),HTMLHint.addRule({id:"attr-lowercase",description:"Attribute name must be lowercase.",init:function(e,t){var a=this;e.addListener("tagstart",function(e){for(var n,r=e.attrs,i=e.col+e.tagName.length+1,s=0,o=r.length;o>s;s++){n=r[s];var l=n.name;l!==l.toLowerCase()&&t.error("Attribute name [ "+l+" ] must be lower case.",e.line,i+n.index,a,n.raw)}})}}),HTMLHint.addRule({id:"attr-value-double-quotes",description:"Attribute value must closed by double quotes.",init:function(e,t){var a=this;e.addListener("tagstart",function(e){for(var n,r=e.attrs,i=e.col+e.tagName.length+1,s=0,o=r.length;o>s;s++)n=r[s],'"'===n.quote||""===n.value&&""!==(n.value===n.quote)||t.error("The value of attribute [ "+n.name+" ] must closed by double quotes.",e.line,i+n.index,a,n.raw)})}}),HTMLHint.addRule({id:"attr-value-not-empty",description:"Attribute must set value.",init:function(e,t){var a=this;e.addListener("tagstart",function(e){for(var n,r=e.attrs,i=e.col+e.tagName.length+1,s=0,o=r.length;o>s;s++)n=r[s],""===n.quote&&""===n.value&&t.warn("The attribute [ "+n.name+" ] must set value.",e.line,i+n.index,a,n.raw)})}}),HTMLHint.addRule({id:"csslint",description:"Scan css with csslint.",init:function(e,t,a){var n=this;e.addListener("cdata",function(e){if("style"===e.tagName.toLowerCase()){var r=a.verify,i=a.options;if(void 0!==r&&void 0!==i){var s=e.line-1,o=e.col-1,l=r(e.raw,i).messages;l.forEach(function(e){var a=e.line;t["warning"===e.type?"warn":"error"](e.message,s+a,(1===a?o:0)+e.col,n,e.evidence)})}}})}}),HTMLHint.addRule({id:"doctype-first",description:"Doctype must be first.",init:function(e,t){var a=this,n=function(r){"start"===r.type||"text"===r.type&&/^\s*$/.test(r.raw)||(("comment"!==r.type&&r.long===!1||/^DOCTYPE\s+/i.test(r.content)===!1)&&t.error("Doctype must be first.",r.line,r.col,a,r.raw),e.removeListener("all",n))};e.addListener("all",n)}}),HTMLHint.addRule({id:"doctype-html5",description:"Doctype must be html5.",init:function(e,t){function a(e){e.long===!1&&"doctype html"!==e.content.toLowerCase()&&t.warn("Doctype must be html5.",e.line,e.col,r,e.raw)}function n(){e.removeListener("comment",a),e.removeListener("tagstart",n)}var r=this;e.addListener("all",a),e.addListener("tagstart",n)}}),HTMLHint.addRule({id:"head-script-disabled",description:"The script tag can not be used in head.",init:function(e,t){function a(e){"script"===e.tagName.toLowerCase()&&t.warn("The script tag can not be used in head.",e.line,e.col,r,e.raw)}function n(t){"head"===t.tagName.toLowerCase()&&(e.removeListener("tagstart",a),e.removeListener("tagstart",n))}var r=this;e.addListener("tagstart",a),e.addListener("tagend",n)}}),HTMLHint.addRule({id:"id-class-value",description:"Id and class value must meet some rules.",init:function(e,t,a){var n,r=this,i={underline:{regId:/^[a-z\d]+(_[a-z\d]+)*$/,message:"Id and class value must lower case and split by underline."},dash:{regId:/^[a-z\d]+(-[a-z\d]+)*$/,message:"Id and class value must lower case and split by dash."},hump:{regId:/^[a-z][a-zA-Z\d]*([A-Z][a-zA-Z\d]*)*$/,message:"Id and class value must meet hump style."}};if(n="string"==typeof a?i[a]:a,n&&n.regId){var s=n.regId,o=n.message;e.addListener("tagstart",function(e){for(var a,n=e.attrs,i=e.col+e.tagName.length+1,l=0,d=n.length;d>l;l++)if(a=n[l],"id"===a.name.toLowerCase()&&s.test(a.value)===!1&&t.warn(o,e.line,i+a.index,r,a.raw),"class"===a.name.toLowerCase())for(var c,u=a.value.split(/\s+/g),g=0,f=u.length;f>g;g++)c=u[g],c&&s.test(c)===!1&&t.warn(o,e.line,i+a.index,r,c)})}}}),HTMLHint.addRule({id:"img-alt-require",description:"Alt of img tag must be set value.",init:function(e,t){var a=this;e.addListener("tagstart",function(e){if("img"===e.tagName.toLowerCase()){for(var n=e.attrs,r=!1,i=0,s=n.length;s>i;i++)if("alt"===n[i].name.toLowerCase()){r=!0;break}r===!1&&t.warn("Alt of img tag must be set value.",e.line,e.col,a,e.raw)}})}}),HTMLHint.addRule({id:"jshint",description:"Scan script with jshint.",init:function(e,t,a){var n=this;e.addListener("cdata",function(e){if("script"===e.tagName.toLowerCase()){var r=a.verify,i=a.options;if(void 0!==r&&void 0!==i){var s=e.line-1,o=e.col-1,l=e.raw.replace(/\t/g," "),d=r(l,i);d===!1&&r.errors.forEach(function(e){var a=e.line;t.warn(e.reason,s+a,(1===a?o:0)+e.character,n,e.evidence)})}}})}}),HTMLHint.addRule({id:"spec-char-escape",description:"Special characters must be escaped.",init:function(e,t){var a=this;e.addListener("text",function(n){for(var r,i=n.raw,s=/[<>]/g;r=s.exec(i);){var o=e.fixPos(n,r.index);t.error("Special characters must be escaped : [ "+r[0]+" ].",o.line,o.col,a,n.raw)}})}}),HTMLHint.addRule({id:"style-disabled",description:"Style tag can not be use.",init:function(e,t){var a=this;e.addListener("tagstart",function(e){"style"===e.tagName.toLowerCase()&&t.warn("Style tag can not be use.",e.line,e.col,a,e.raw)})}}),HTMLHint.addRule({id:"tag-pair",description:"Tag must be paired.",init:function(e,t){var a=this,n=[],r=e.makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed");e.addListener("tagstart",function(e){var t=e.tagName.toLowerCase();void 0!==r[t]||e.close||n.push(t)}),e.addListener("tagend",function(e){for(var r=e.tagName.toLowerCase(),i=n.length-1;i>=0&&n[i]!==r;i--);if(i>=0){for(var s=[],o=n.length-1;o>i;o--)s.push("</"+n[o]+">");s.length>0&&t.error("Tag must be paired, Missing: [ "+s.join("")+" ]",e.line,e.col,a,e.raw),n.length=i}else t.error("Tag must be paired, No start tag: [ "+e.raw+" ]",e.line,e.col,a,e.raw)}),e.addListener("end",function(e){for(var r=[],i=n.length-1;i>=0;i--)r.push("</"+n[i]+">");r.length>0&&t.error("Tag must be paired, Missing: [ "+r.join("")+" ]",e.line,e.col,a,"")})}}),HTMLHint.addRule({id:"tag-self-close",description:"The empty tag must closed by self.",init:function(e,t){var a=this,n=e.makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed");e.addListener("tagstart",function(e){var r=e.tagName.toLowerCase();void 0!==n[r]&&(e.close||t.warn("The empty tag : [ "+r+" ] must closed by self.",e.line,e.col,a,e.raw))})}}),HTMLHint.addRule({id:"tagname-lowercase",description:"Tagname must be lowercase.",init:function(e,t){var a=this;e.addListener("tagstart,tagend",function(e){var n=e.tagName;n!==n.toLowerCase()&&t.error("Tagname [ "+n+" ] must be lower case.",e.line,e.col,a,e.raw)})}});