(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{471:function(e,a,t){"use strict";t.d(a,"a",function(){return r});var n=t(185),c=t.n(n),r=function(e,a){c.a.fire({icon:e,title:a,showConfirmButton:!1,timer:1500})}},526:function(e,a,t){"use strict";var n=t(43);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var c=n(t(45)),r=t(6),l=(0,c.default)((0,r.jsx)("path",{d:"M12 6.5c3.79 0 7.17 2.13 8.82 5.5-1.65 3.37-5.02 5.5-8.82 5.5S4.83 15.37 3.18 12C4.83 8.63 8.21 6.5 12 6.5m0-2C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5m0-2c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5 4.5-2.02 4.5-4.5-2.02-4.5-4.5-4.5z"}),"RemoveRedEyeOutlined");a.default=l},582:function(e,a,t){"use strict";t.r(a);var n=t(12),c=t(16),r=t(42),l=t(0),s=t.n(l),o=t(526),i=t.n(o),m=t(186),d=t(471),u=t(162),b=t.n(u),E=t(37),v=t(453),_=t(459),f=t(79),p=t(476),N=t.n(p),h=t(477),j=t(129),w=t(238),g=t(450),O=t(452),y=t(130),x=t.n(y);a.default=function(){var e,a,t=Object(E.c)(function(e){return Object(r.a)({},e)}).user,o=t.token,u=Object(l.useState)(!1),p=Object(c.a)(u,2),y=p[0],C=p[1],S=Object(l.useState)(!1),k=Object(c.a)(S,2),D=k[0],L=k[1],F=Object(l.useState)(!1),z=Object(c.a)(F,2),K=z[0],P=z[1],M=Object(l.useState)([]),Y=Object(c.a)(M,2),I=Y[0],J=Y[1],R=Object(l.useState)(!1),T=Object(c.a)(R,2),q=T[0],A=T[1],B=Object(l.useState)(""),H=Object(c.a)(B,2),G=H[0],Q=H[1],U=Object(l.useState)(1),V=Object(c.a)(U,2),W=V[0],X=V[1],Z=Object(l.useState)(5),$=Object(c.a)(Z,2),ee=$[0],ae=$[1],te=Object(l.useState)({cancel_code:"",serial_parcel:"",user_id:"",branch_start:""}),ne=Object(c.a)(te,2),ce=ne[0],re=ne[1],le=Object(l.useState)({user_id:t.id,branch_code:t.branch_code}),se=Object(c.a)(le,2),oe=se[0];se[1];Object(l.useEffect)(function(){ie(oe,o)},[]),Object(l.useEffect)(function(){null!==G&&setTimeout(function(){Q("")},1e3)},[G]);var ie=function(e,a){Object(m.a)(e,a).then(function(e){J(e.data),e.data.length>0?A(!0):A(!1)}).catch(function(e){Object(d.a)("error",e.response.data.error)})},me=Object(l.useState)({}),de=Object(c.a)(me,2),ue=de[0],be=de[1],Ee={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:500,bgcolor:"background.paper",border:"2px solid #DC3545",boxShadow:24,p:4},ve=[{title:"\u0edd\u0eb2\u0e8d\u0ec0\u0ea5\u0e81\u0e9e\u0eb1\u0e94\u0eaa\u0eb0\u0e94\u0eb8",key:"1",render:function(e){return s.a.createElement("div",{className:"text-danger"},e.serial_parcel,s.a.createElement("span",{className:""},s.a.createElement(x.a,{text:e.serial_parcel,onCopy:function(){return Q(e.serial_parcel)}},s.a.createElement("span",{className:"ms-2 text-warning btn"},s.a.createElement("i",{class:"fa-solid fa-copy"})))),s.a.createElement("span",{className:G===e.serial_parcel?"text-secondary ms-2":"text-white ms-2"},"Copied"))},filterDropdown:function(e){var a=e.setSelectedKeys,t=e.selectedKeys,n=e.confirm;return s.a.createElement(w.a,{autoFocus:!0,placeholder:"\u0e84\u0ebb\u0ec9\u0e99\u0eab\u0eb2...",value:t[0],onChange:function(e){a(e.target.value?[e.target.value]:[]),n({closeDropdown:!1})},onPressEnter:function(){n()}})},filterIcon:function(){return s.a.createElement(O.a,null)},onFilter:function(e,a){return a.serial_parcel.toLowerCase().includes(e.toLowerCase())}},(e={title:"\u0e9c\u0eb9\u0ec9\u0eaa\u0ebb\u0ec8\u0e87",key:"2",render:function(e){return s.a.createElement("div",null,e.cus_sender_name,s.a.createElement("br",null),s.a.createElement("span",{className:"text-muted"},e.cus_sender_phone))},filterDropdown:function(e){var a=e.setSelectedKeys,t=e.selectedKeys,n=e.confirm;return s.a.createElement(w.a,{autoFocus:!0,placeholder:"\u0e9b\u0ec9\u0ead\u0e99\u0e8a\u0eb7\u0ec8\u0e9c\u0eb9\u0ec9\u0eaa\u0ebb\u0ec8\u0e87.",value:t[0],onChange:function(e){a(e.target.value?[e.target.value]:[]),n({closeDropdown:!1})},onPressEnter:function(){n()}})},filterIcon:function(){return s.a.createElement(O.a,null)},onFilter:function(e,a){return a.cus_sender_name.toLowerCase().includes(e.toLowerCase())}},Object(n.a)(e,"onFilter",function(e,a){return 0===a.cus_sender_name.indexOf(e)}),Object(n.a)(e,"sorter",function(e,a){return e.cus_sender_name.length-a.cus_sender_name.length}),e),(a={title:"\u0e9c\u0eb9\u0ec9\u0eae\u0eb1\u0e9a",key:"3",render:function(e){return s.a.createElement("div",null,e.cus_receive_name,s.a.createElement("br",null),s.a.createElement("span",{className:"text-muted"},e.cus_receive_phone))},filterDropdown:function(e){var a=e.setSelectedKeys,t=e.selectedKeys,n=e.confirm;return s.a.createElement(w.a,{autoFocus:!0,placeholder:"\u0e9b\u0ec9\u0ead\u0e99\u0e8a\u0eb7\u0ec8\u0e9c\u0eb9\u0ec9\u0eae\u0eb1\u0e9a...",value:t[0],onChange:function(e){a(e.target.value?[e.target.value]:[]),n({closeDropdown:!1})},onPressEnter:function(){n()}})},filterIcon:function(){return s.a.createElement(O.a,null)},onFilter:function(e,a){return a.cus_receive_name.toLowerCase().includes(e.toLowerCase())}},Object(n.a)(a,"onFilter",function(e,a){return 0===a.cus_receive_name.indexOf(e)}),Object(n.a)(a,"sorter",function(e,a){return e.cus_receive_name.length-a.cus_receive_name.length}),a),{title:"\u0ea5\u0eb2\u0e84\u0eb2",key:"4",render:function(e){return s.a.createElement("div",null,s.a.createElement("p",null,Number(e.shipping_cost).toLocaleString()+" \u0e81\u0eb5\u0e9a"))}},{title:"\u0e9b\u0eb2\u0e8d\u0e97\u0eb2\u0e87",key:"5",render:function(e){return s.a.createElement("div",null,e.branch_end_join[0].name,s.a.createElement("br",null),s.a.createElement("span",{className:"text-muted"},e.branch_end_city_join[0].name+","+e.branch_end_province_join[0].name,","))},onFilter:function(e,a){return 0===a.branch_end_join[0].name.indexOf(e)},sorter:function(e,a){return e.branch_end_join[0].name.length-a.branch_end_join[0].name.length}},{title:"\u0ea5\u0eb0\u0eab\u0eb1\u0e94\u0e8d\u0ebb\u0e81\u0ec0\u0ea5\u0eb5\u0e81",key:"6",render:function(e){return s.a.createElement("div",{className:"text-danger"},e.cancel_code)}},{title:"\u0ec0\u0e84\u0eb7\u0ec8\u0ead\u0e87\u0ea1\u0eb7",key:"7",render:function(e){return s.a.createElement("div",{onClick:function(a){return function(e){be(Object(r.a)({},ue,{row:e})),P(!0),C(!0),re(Object(r.a)({},ce,{serial_parcel:e.serial_parcel}))}(e)},role:"button",id:"cancelparcel"},s.a.createElement(i.a,null))}}];return s.a.createElement("div",null,s.a.createElement("div",null,q?s.a.createElement("div",{className:"container card card-body"},s.a.createElement("div",{className:""},s.a.createElement("div",{className:"h3 text-danger py-3"},"\u0e9b\u0eb0\u0eab\u0ea7\u0eb1\u0e94\u0e81\u0eb2\u0e99\u0ec0\u0e9e\u0eb5\u0ec8\u0ea1\u0e9e\u0eb1\u0e94\u0eaa\u0eb0\u0e94\u0eb8")),s.a.createElement(g.a,{columns:ve,dataSource:I,bordered:!0,pagination:{total:I,showTotal:function(e){return"\u0ea5\u0eb2\u0e8d\u0e81\u0eb2\u0e99\u0e97\u0eb1\u0e87\u0edd\u0ebb\u0e94 ".concat(e," \u0ea5\u0eb2\u0e8d\u0e81\u0eb2\u0e99")},current:W,pageSize:ee,pageSizeOptions:["5","10","20","50","100"],showPageSizeOptions:!0,onChange:function(e,a){X(e),ae(a)}}})):s.a.createElement("div",{className:"container"},s.a.createElement("div",{className:"card card-body border-danger"},s.a.createElement("div",{className:"d-flex justify-content-center"},s.a.createElement("div",{className:"h3 text-danger"},"\u0e8d\u0eb1\u0e87\u0e9a\u0ecd\u0ec8\u0ea1\u0eb5 \u0e81\u0eb2\u0e99\u0ec0\u0e9e\u0eb5\u0ec8\u0ea1\u0e9e\u0eb1\u0e94\u0eaa\u0eb0\u0e94\u0eb8"))))),s.a.createElement(v.a,{open:y,onClose:function(){return C(!1)},"aria-labelledby":"modal-title","aria-describedby":"modaldescription"},s.a.createElement(_.a,{sx:Ee},K&&s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-md-4 col-12"}),s.a.createElement("div",{className:"col-md-5 col-lg-3  mb-3 col-12 d-flex justify-content-center"},s.a.createElement("div",{className:"send-box-bill px-1 "},s.a.createElement("div",{className:"title text-center"},"Cloud Express"),s.a.createElement("div",{className:"customer"},s.a.createElement("div",{className:"sender"},s.a.createElement("div",{className:"name"},"\u0e9c\u0eb9\u0ec9\u0eaa\u0ebb\u0ec8\u0e87:",ue.row.cus_sender_name),s.a.createElement("div",{className:"name"},"\u0ec0\u0e9a\u0eb5\u0ec2\u0e97: ",ue.row.cus_sender_phone),s.a.createElement("div",{className:"name"},"\u0e97\u0eb5\u0ea2\u0eb9\u0ec8:")),s.a.createElement("div",{className:"receive"},s.a.createElement("div",{className:"name"},"\u0e9c\u0eb9\u0ec9\u0eae\u0eb1\u0e9a: ",ue.row.cus_receive_name),s.a.createElement("div",{className:"name"},"\u0ec0\u0e9a\u0eb5\u0ec2\u0e97: ",ue.row.cus_receive_phone),s.a.createElement("div",{className:"name"},"\u0e97\u0eb5\u0ea2\u0eb9\u0ec8: ",ue.row.address_receive))),s.a.createElement("div",{className:"to_branch"},s.a.createElement("div",{className:"start"},s.a.createElement("div",{className:""},ue.row.branch_start_join[0].name),s.a.createElement("div",{className:""},ue.row.branch_start)),s.a.createElement("div",{className:"start"},s.a.createElement(h.a,{icon:"fa-solid fa-truck-fast"})),s.a.createElement("div",{className:"end"},s.a.createElement("div",{className:""},ue.row.branch_end_join[0].name),s.a.createElement("div",{className:""},ue.row.branch_end))),s.a.createElement("div",{className:"customer"},s.a.createElement("div",{className:"sender"},s.a.createElement("div",{className:"name"},"\u0e95\u0ebb\u0ec9\u0e99\u0e97\u0eb2\u0e87:",s.a.createElement("span",{className:"float-end me-1"}," ","pay_start"===ue.row.payment_type&&Number(ue.row.shipping_cost).toLocaleString()+" \u0e81\u0eb5\u0e9a"))),s.a.createElement("div",{className:"receive"},s.a.createElement("div",{className:"name"},"\u0e9b\u0eb2\u0e8d\u0e97\u0eb2\u0e87:",s.a.createElement("span",{className:"float-end"},"pay_start"!==ue.row.payment_type&&Number(ue.row.shipping_cost).toLocaleString()+" \u0e81\u0eb5\u0e9a")))),s.a.createElement("div",{className:"cod"},s.a.createElement("span",null,"COD :"),s.a.createElement("span",{className:"float-end"},function(e){var a="";if(e.cod_join&&e.cod_join.length>0){var t=e.cod_join[0],n=t.cod_lak,c=t.cod_thb,r=t.cod_usd;t.currency_cod,a=null!==n?n:null!==c?c:null!==r?r:null}return a}(ue.row).toLocaleString(),function(e){var a="-";if(e.cod_join&&e.cod_join.length>0){var t=e.cod_join[0].currency_cod;"lak"===t?a=" \u0e81\u0eb5\u0e9a":"thb"===t?a=" \u0e9a\u0eb2\u0e94":"usd"===t&&(a=" \u0ec2\u0e94\u0ea5\u0eb2")}return a}(ue.row))),s.a.createElement("div",{className:"sum"}),s.a.createElement("div",{className:"detail"},s.a.createElement("div",{className:"parcel"},s.a.createElement("div",{className:"text-1"},s.a.createElement("div",{className:""},"\u0e9b\u0eb0\u0ec0\u0e9e\u0e94\u0ec0\u0e84\u0eb7\u0ec8\u0ead\u0e87: "),s.a.createElement("div",{className:""},"\u0e82\u0eb0\u0edc\u0eb2\u0e94: "),s.a.createElement("div",{className:""},"\u0e99\u0ec9\u0eb3\u0edc\u0eb1\u0e81:")),s.a.createElement("div",{className:"text-2"},s.a.createElement("div",{className:""},Object(j.d)(ue.row.parcel_type)),s.a.createElement("div",{className:""},ue.row.box_size),s.a.createElement("div",{className:""},ue.row.parcel_weight))),s.a.createElement("div",{className:"qr"},s.a.createElement(N.a,{size:50,value:ue.row.serial_parcel}),s.a.createElement("div",{className:""},ue.row.serial_parcel),s.a.createElement("div",{className:""},b()(ue.row.createdAt).format("YYYY-MM-DD H:m:s")))),s.a.createElement("div",{className:"comment"},s.a.createElement("span",{className:"c_comment line-break"},"\u0edd\u0eb2\u0e8d\u0ec0\u0eab\u0e94 ",ue.row.comment)),s.a.createElement("div",{className:"info_branch"},s.a.createElement(h.a,{icon:"fa-solid fa-location-dot"}),s.a.createElement("span",{className:"ms-1"},ue.row.branch_end_join[0].village+", "+ue.row.branch_end_city_join[0].name+", "+ue.row.branch_end_province_join[0].name),s.a.createElement("div",{className:""},s.a.createElement(h.a,{icon:"fa-solid fa-mobile-retro"}),":",s.a.createElement("span",{className:"ms-1"},ue.row.user_branch_end_join[0].phone))),s.a.createElement("div",{className:"text-center "},"\u0e82\u0ecd\u0e82\u0ead\u0e9a\u0ec3\u0e88 \u0e97\u0eb5\u0ec8\u0ec3\u0e8a\u0ec9\u0e9a\u0ecd\u0ea5\u0eb4\u0e81\u0eb2\u0e99"))),s.a.createElement("div",{className:"col-md-4 mb-3"}),s.a.createElement("div",{className:"col-6"},s.a.createElement("div",{className:"bg-danger d-block btn text-white",onClick:function(){return L(!0)}},"\u0e8d\u0ebb\u0e81\u0ec0\u0ea5\u0eb4\u0e81\u0e9e\u0eb1\u0e94\u0eaa\u0eb0\u0e94\u0eb8")),s.a.createElement("div",{className:"col-6"},s.a.createElement("button",{type:"button",className:"btn btn-warning col-12",onClick:function(){return window.print()}},"\u0e9e\u0eb4\u0ea1\u0e9a\u0eb4\u0e99")),s.a.createElement(v.a,{open:D,onClose:function(){return L(!1)},"aria-labelledby":"modal-title","aria-describedby":"modaldescription"},s.a.createElement(_.a,{sx:Ee},s.a.createElement("h3",{className:"text-center text-danger"},"\u0e95\u0ec9\u0ead\u0e87\u0e81\u0eb2\u0e99\u0e8d\u0ebb\u0e81\u0ec0\u0ea5\u0eb5\u0e81 \u0eab\u0ebc\u0eb7 \u0e9a\u0ecd\u0ec8 ?"),s.a.createElement("div",{className:"text-center  mb-1"},s.a.createElement("span",{className:"text-danger"},"\u0ec1\u0e88\u0ec9\u0e87\u0ec0\u0e95\u0eb7\u0ead\u0e99! ")," ","\u0eab\u0eb2\u0e81\u0e97\u0ec8\u0eb2\u0e99\u0e8d\u0ebb\u0e81\u0ec0\u0ea5\u0eb5\u0e81"),s.a.createElement("div",{className:"text-center mb-1"},"\u0e9e\u0eb1\u0e94\u0eaa\u0eb0\u0e94\u0eb8\u0edd\u0eb2\u0e8d\u0ec0\u0ea5\u0e81 :",s.a.createElement("span",{className:"text-danger"},ue.row.serial_parcel)),s.a.createElement("div",{className:"text-center  mb-4"},"\u0e88\u0eb0\u0e96\u0eb7\u0e81\u0ea5\u0ebb\u0e9a\u0ead\u0ead\u0e81\u0e88\u0eb2\u0e81\u0ea5\u0eb0\u0e9a\u0ebb\u0e9a"),s.a.createElement("form",{className:"row",onSubmit:function(e){e.preventDefault(),Object(m.m)(ce,o).then(function(e){P(!1),C(!1),e.data.success?(ie(oe,o),Object(d.a)("success",e.data.success)):Object(d.a)("error",e.data.error)}).catch(function(e){Object(f.a)("error",e.response.data.error)})}},s.a.createElement("div",{className:"col-12 mb-3"},s.a.createElement("input",{className:"form-control me-3",type:"text",name:"cancel_code",placeholder:"\u0ea5\u0eb0\u0eab\u0eb1\u0e94\u0e8d\u0ebb\u0e81\u0ec0\u0ea5\u0eb5\u0e81",autoComplete:"off",onChange:function(e){return function(e){var a;re(Object(r.a)({},ce,(a={},Object(n.a)(a,e.target.name,e.target.value),Object(n.a)(a,"user_id",t.id),Object(n.a)(a,"branch_start",t.branch_code),a)))}(e)}})),s.a.createElement("div",{className:"col-6"},s.a.createElement("button",{type:"submit",disabled:Number(ce.cancel_code)!==ue.row.cancel_code,className:"btn btn-danger col-12"},"\u0ea2\u0eb7\u0e99\u0ea2\u0eb1\u0e99")),s.a.createElement("div",{className:"col-6"},s.a.createElement("div",{className:"btn btn-warning d-block",onClick:function(){L(!1),C(!1)}},"\u0e8d\u0ebb\u0e81\u0ec0\u0ea5\u0eb5\u0e81")))))))))}}}]);
//# sourceMappingURL=13.0ba0a69d.chunk.js.map