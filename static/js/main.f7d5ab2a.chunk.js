(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{104:function(e,t,n){},230:function(e,t,n){},232:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),o=n(18),l=n.n(o),i=n(35),c=n(36),u=n(38),s=n(37),d=n(39),m=(n(104),n(25)),f=n(89),p=n.n(f),g=n(9),v=n(91),h=n.n(v),b=n(2),k=n(96),y=n(97),w=n(14),j=n(15);function E(){var e=Object(w.a)(["\n  padding: 0.75em;\n  margin: 0.75em;\n  color: ",";\n  border: 1px solid;\n  border-radius: 3px;\n"]);return E=function(){return e},e}function O(){var e=Object(w.a)(["\n  position: relative;\n  padding: 1px 18px 17px;\n  margin: 0 -20px;\n  border-bottom: 2px solid #eee;\n  margin-bottom: 20px;\n"]);return O=function(){return e},e}function B(){var e=Object(w.a)(["\n  & > * {\n    display: inline-block;\n  }\n  & > * + * {\n    margin-left: 15px;\n  }\n"]);return B=function(){return e},e}function x(){var e=Object(w.a)(["\n  font-size: 18px;\n  vertical-align: text-bottom;\n"]);return x=function(){return e},e}function C(){var e=Object(w.a)(["\n  cursor: pointer;\n  color: ",";\n"]);return C=function(){return e},e}function N(){var e=Object(w.a)(["\n  display: block;\n  max-width: 100%;\n  max-height: 20em;\n  box-shadow: ",";\n"]);return N=function(){return e},e}function M(){var e=Object(w.a)(["\n  background: ",";\n  color: ",";\n  font-size: 1em;\n  margin: 1em;\n  padding: 0.25em 1em;\n  border: 2px solid palevioletred;\n  border-radius: 3px;\n\n  &:hover {\n    background: ",";\n  }\n"]);return M=function(){return e},e}var S=j.a.button(M(),function(e){return e.primary?"palevioletred":"white"},function(e){return e.primary?"white":"palevioletred"},function(e){return e.primary?"palevioletred":"white"}),_=j.a.img(N(),function(e){return e.selected?"0 0 0 2px blue;":"none"}),I=j.a.span(C(),function(e){return e.reversed?e.active?"white":"#aaa":e.active?"black":"#ccc"}),K=Object(j.a)(function(e){var t=e.className,n=Object(y.a)(e,["className"]);return r.a.createElement("span",Object.assign({className:"material-icons ".concat(t)},n))})(x()),D=j.a.div(B()),L=Object(j.a)(D)(O()),J=j.a.input(E(),function(e){return e.inputColor||"palevioletred"}),R=n(65),H=n.n(R);var P=["jpg","jpeg","png","gif","svg"],T=p()(),q=[T,function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).insertPastedImage,t=void 0===e?"insertPastedImage":e,n=["jpg","jpeg","png","gif","svg"];return{onCommand:function(e,a,r){var o,l=e.type,i=e.args;if("insertText"===l&&H()(o=i[0])||"insertFragment"===l&&H()(o=i[0].text)){var c=o.split(".").pop().toLowerCase();return-1!==n.indexOf(c)?void a.command(t,o).moveToEnd():void fetch(o).then(function(e){var l=e.headers.get("content-type").split("/").pop();l&&-1!==n.indexOf(l)?a.command(t,o).moveToEnd():r()}).catch(function(e){console.log("error in imagify",e),r()})}r()}}}()],V=b.Value.fromJSON({document:{nodes:[{object:"block",type:"paragraph",nodes:[{object:"text"}]}]}}),z={blocks:{image:{isVoid:!0}}},U="paragraph",W=Object(g.isKeyHotkey)("enter"),F=Object(g.isKeyHotkey)("tab"),$=Object(g.isKeyHotkey)("mod+b"),G=Object(g.isKeyHotkey)("mod+i"),Q=Object(g.isKeyHotkey)("mod+u"),X=Object(g.isKeyHotkey)("mod+`"),Y=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(u.a)(this,Object(s.a)(t).call(this,e))).commands={insertPastedImage:function(e,t){e.insertBlock({type:"image",data:{src:t}}).insertBlock(U).moveToStartOfNextText().focus()}},n.hasMark=function(e){return n.state.value.activeMarks.some(function(t){return t.type===e})},n.hasBlock=function(e){return n.state.value.blocks.some(function(t){return t.type===e})},n.ref=function(e){n.editor=e},n.execute=function(e){n.editor.command(e)},n.renderMarkButton=function(e,t){var a=n.hasMark(e);return r.a.createElement(I,{active:a,onMouseDown:function(t){return n.onClickMark(t,e)}},r.a.createElement(K,null,t))},n.renderBlockButton=function(e,t){var a=n.hasBlock(e);if(["ol_list","ul_list"].includes(e)){var o=n.state.value,l=o.document,i=o.blocks;if(i.size>0){var c=l.getParent(i.first().key);a=n.hasBlock("list-item")&&c&&c.type===e}}return r.a.createElement(I,{active:a,onMouseDown:function(t){return n.onClickBlock(t,e)}},r.a.createElement(K,null,t))},n.renderNode=function(e,t,n){var a=e.attributes,o=e.children,l=e.node,i=e.isFocused,c=T.utils.getItemsAtRange(t.value).contains(l);switch(l.type){case"image":var u=l.data.get("src");return r.a.createElement(_,Object.assign({src:u,selected:i},a));case"block-quote":return r.a.createElement("blockquote",a,o);case"ul_list":return r.a.createElement("ul",a,o);case"heading-one":return r.a.createElement("h1",a,o);case"heading-two":return r.a.createElement("h2",a,o);case"list_item":return r.a.createElement("li",Object.assign({className:c?"current-item":"",title:c?"Current Item":""},e.attributes),e.children);case"ol_list":return r.a.createElement("ol",a,o);case"link":return r.a.createElement("a",Object.assign({},a,{href:l.data.get("url")}),o);default:return n()}},n.onImageUpload=function(e){e.preventDefault();var t=e.target.files[0],a=t.name.split(".").pop().toLowerCase(),r=new FileReader;r.addEventListener("load",function(){if(-1===P.indexOf(a))return alert("Please select an image file");n.editor.insertBlock({type:"image",isVoid:!0,data:{src:r.result}}).insertBlock(U).moveToStartOfNextText().focus()},!1),t&&r.readAsDataURL(t)},n.renderMark=function(e,t,n){var a=e.children,o=e.mark,l=e.attributes;switch(o.type){case"bold":return r.a.createElement("strong",l,a);case"code":return r.a.createElement("code",l,a);case"italic":return r.a.createElement("em",l,a);case"underlined":return r.a.createElement("u",l,a);default:return n()}},n.onChange=function(e){var t=e.value;n.setState({value:t})},n.onKeyDown=function(e,t,a){var r;if(F(e)){var o=T.changes.decreaseItemDepth,l=T.utils,i=l.isSelectionInList,c=l.getItemDepth,u=n.state.value,s=i(u);return 3===c(u)&&s?(n.execute(o),a()):a()}if(W(e))return n.checkTopLevelNodeLength(a);if($(e))r="bold";else if(G(e))r="italic";else if(Q(e))r="underlined";else{if(!X(e))return a();r="code"}e.preventDefault(),t.toggleMark(r)},n.onClickMark=function(e,t){e.preventDefault(),n.editor.toggleMark(t)},n.onClickBlock=function(e,t){e.preventDefault();var a=Object(m.a)(Object(m.a)(n)).editor,r=a.value;if("ul_list"!==t&&"ol_list"!==t){var o=n.hasBlock(t);n.hasBlock("list-item")?a.setBlocks(o?U:t).unwrapBlock("ul_list").unwrapBlock("ol_list"):a.setBlocks(o?U:t)}else{var l=T.utils.isSelectionInList,i=T.changes.unwrapList;l(r)?n.execute(i):a.unwrapBlock("ul_list"===t?"ol_list":"ul_list").wrapBlock(t)}},n.saveEditorContent=function(e){e.preventDefault();var t=n.state.value,a=JSON.stringify(t.toJSON());if(h()(a)>5e6)return alert("Localstorage capasity exceeded!!");window.confirm("Are you sure to save editor content?")&&(localStorage.setItem("content",a),n.setState({value:V,counter:0}))},n.handleContentRestore=function(e){e.preventDefault();var t=localStorage.getItem("content"),a=t&&JSON.parse(t)||V;n.setState({value:b.Value.fromJSON(a),counter:0})},n.checkTopLevelNodeLength=function(e){var t=n.state,a=t.value,r=t.counter,o=a.document.nodes.toArray().length;return(0===r||o<r)&&e()},n.handleNodeCounter=function(e){n.setState({counter:e.target.value})},n.state={value:V,counter:0},n.fileUpload=r.a.createRef(),n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"text-editor"},r.a.createElement("input",{type:"file",name:"file",onChange:this.onImageUpload,style:{display:"none"},ref:this.fileUpload}),r.a.createElement(L,null,this.renderMarkButton("bold","format_bold"),this.renderMarkButton("italic","format_italic"),this.renderMarkButton("underlined","format_underlined"),this.renderMarkButton("code","code"),this.renderBlockButton("heading-one","looks_one"),this.renderBlockButton("heading-two","looks_two"),this.renderBlockButton("block-quote","format_quote"),this.renderBlockButton("ol_list","format_list_numbered"),this.renderBlockButton("ul_list","format_list_bulleted"),r.a.createElement(I,{onMouseDown:function(t){return e.fileUpload.current.click()}},r.a.createElement(K,null,"image"))),r.a.createElement(k.a,{plugins:q,schema:z,autoFocus:!0,commands:this.commands,placeholder:"Enter some rich text...",ref:this.ref,value:this.state.value,onChange:this.onChange,onKeyDown:this.onKeyDown,renderNode:this.renderNode,renderMark:this.renderMark,shouldNodeComponentUpdate:function(e){return"list_item"===e.node.type}})),r.a.createElement("div",null,r.a.createElement(S,{onClick:this.saveEditorContent,primary:!0},"Save"," "),r.a.createElement(S,{onClick:this.handleContentRestore},"Restore "),"Node Count: ",r.a.createElement(J,{type:"number",min:"0",value:this.state.counter,onChange:this.handleNodeCounter}),r.a.createElement("sup",null,"*"),r.a.createElement("div",{className:"notes"},r.a.createElement("ul",null,r.a.createElement("li",null,"* ",r.a.createElement("em",null,"0")," for unlimited entry."),r.a.createElement("li",null,"Built on latest Slate"),r.a.createElement("li",null,"Supported image: jpg, jpeg, png, gif, svg"),r.a.createElement("li",null,"Done in hurry, did not follow best practices. apologies"," ",r.a.createElement("span",{role:"img","aria-label":"wink"},"\ud83d\ude09")),r.a.createElement("li",null,"Adds single command github page deployment task as well")))))}}]),t}(a.Component),Z=function(e){function t(){return Object(i.a)(this,t),Object(u.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(Y,null))}}]),t}(a.Component);n(230),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(Z,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},99:function(e,t,n){e.exports=n(232)}},[[99,2,1]]]);
//# sourceMappingURL=main.f7d5ab2a.chunk.js.map