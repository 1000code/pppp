(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{471:function(e,a,t){"use strict";t.d(a,"a",function(){return r});var c=t(185),n=t.n(c),r=function(e,a){n.a.fire({icon:e,title:a,showConfirmButton:!1,timer:1500})}},475:function(e,a,t){"use strict";var c=t(43);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=c(t(45)),r=t(6),l=(0,n.default)((0,r.jsx)("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"}),"Search");a.default=l},585:function(e,a,t){"use strict";t.r(a);var c=t(12),n=t(16),r=t(42),l=t(0),s=t.n(l),m=t(38),d=t(475),o=t.n(d),i=t(471),_=t(477),b=t(476),u=t.n(b),v=t(186),E=t(79),p=t(37),N=t(162),h=t.n(N),f=t(129);a.default=function(){var e=Object(p.c)(function(e){return Object(r.a)({},e)}).user,a=e.token,t=Object(l.useState)(!1),d=Object(n.a)(t,2),b=d[0],N=d[1],j=Object(l.useState)(!1),g=Object(n.a)(j,2),O=g[0],x=g[1],w=Object(l.useState)({cod_lak:"",currency_cod:"",cod_thb:"",cod_usd:""}),y=Object(n.a)(w,2),S=y[0],k=y[1],C=S.currency_cod,D=(S.cod_thb,Object(l.useState)("")),z=Object(n.a)(D,2),L=(z[0],z[1],Object(l.useState)({branch_now:""})),M=Object(n.a)(L,2),Y=M[0],A=M[1],J=Object(l.useState)({serial_parcel:"",serial_bag:"",cus_receive_name:"",cus_receive_phone:"",cus_sender_name:"",cus_sender_phone:"",address_receive:"",branch_start:"",location_parcel:"",branch_end:"",name_branch_end:"",parcel_type:"general",box_size:"",parcel_weight:"",shipping_cost:"",payment_type:"pay_start",id_rider:"",cancel_code:"",cancel_parcel:"",cancel_by:"",cancel_reason:"",currency_express:"",exchange_thb:"",exchange_usd:"",comment:"",status_parcel:"success",warehouse_now:"",status_tracking:"",cod:"",currency_cod:"",phone_branch_end:"",village_name:"",city_name:"",province_name:"",createdAt:"",province_join:[],city_join:[],cod_join:[],userbranch_end_join:[],branch_end_join:[],branch_start_join:[]}),q=Object(n.a)(J,2),B=q[0],F=q[1],H=B.serial_parcel,P=B.cus_receive_name,R=B.cus_receive_phone,G=B.cus_sender_name,I=B.cus_sender_phone,K=B.status_tracking,Q=(B.express_type,B.p_poste,B.c_poste,B.address_receive),T=B.branch_start,U=(B.location_parcel,B.branch_end),V=(B.name_branch_end,B.parcel_type),W=B.box_size,X=B.parcel_weight,Z=B.shipping_cost,$=B.payment_type,ee=(B.id_rider,B.cancel_code,B.cancel_parcel,B.cancel_by,B.cancel_reason,B.currency_express,B.status_parcel),ae=B.warehouse_now,te=(B.phone_branch_end,B.village_name,B.city_name,B.comment),ce=B.createdAt,ne=B.province_join,re=B.city_join,le=(B.cod_join,B.userbranch_end_join),se=B.branch_end_join,me=B.branch_start_join,de=Object(l.useState)({serial_parcel:"",branch_end:""}),oe=Object(n.a)(de,2),ie=oe[0],_e=oe[1],be=Object(l.useRef)(null);Object(l.useEffect)(function(){_e(Object(r.a)({},ie,{branch_end:e.branch_code})),A(Object(r.a)({},Y,{branch_now:e.branch_code})),be.current&&be.current.focus()},[be.current]);var ue=Object(l.useState)({serial_parcel:H,get_money_by:e.id,get_money_date:new Date,status_parcel:"success",cod_status:"process",branch_code:e.branch_code}),ve=Object(n.a)(ue,2),Ee=ve[0],pe=ve[1],Ne=function(e){e.preventDefault(),""===ie?Object(i.a)("error","\u0e81\u0eb0\u0ea5\u0eb8\u0e99\u0eb2\u0e9b\u0ec9\u0ead\u0e99\u0edd\u0eb2\u0e8d\u0ec0\u0ea5\u0e81 \u0e9e\u0eb1\u0e94\u0eaa\u0eb0\u0e94\u0eb8"):Object(v.b)(ie,a).then(function(e){e.data.parcels.length>0?(F(e.data.parcels[0]),k(e.data.COD),pe(Object(r.a)({},Ee,{serial_parcel:ie.serial_parcel})),N(!0),x(!1),_e(Object(r.a)({},ie,{serial_parcel:""}))):(N(!1),x(!0))}).catch(function(e){Object(E.a)("error",e.response.data.error),N(!1)})};return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"container"},s.a.createElement("div",{className:"card border-warning border-3 card-body mb-3"},s.a.createElement("form",{onSubmit:Ne},s.a.createElement("div",{className:"h3 mt-2 pt-2 mb-3 text-danger"},"\u0e84\u0eb3\u0e99\u0ea7\u0e99\u0ec0\u0e87\u0eb4\u0e99"),s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-md-5 col-lg-4 col-11  mb-4"},s.a.createElement("div",{className:"input-group"},s.a.createElement("input",{type:"text",name:"serial_parcel",value:ie.serial_parcel,className:"form-control ",placeholder:"\u0ea5\u0eb0\u0eab\u0eb1\u0e94\u0e9e\u0eb1\u0e94\u0eaa\u0eb0\u0e94\u0eb8",onChange:function(e){_e(Object(r.a)({},ie,Object(c.a)({},e.target.name,e.target.value)))},ref:be}),s.a.createElement("div",{className:"col-auto"},s.a.createElement("button",{type:"submit",className:"btn btn-danger"},s.a.createElement(o.a,null)))))))),b&&ae!==e.branch_code&&s.a.createElement("div",{className:"row "},s.a.createElement("div",{className:"col-12"},s.a.createElement("div",{className:"card border-danger mb-3 alert-danger "},s.a.createElement("form",{onSubmit:Ne},s.a.createElement("div",{className:"h2 mt-2 m-3 text-center text-dark pt-3"},"\u0e9e\u0eb1\u0e94\u0eaa\u0eb0\u0e94\u0eb8\u0e99\u0eb5\u0ec9 \u0e9a\u0ecd\u0ec8\u0ec4\u0e94\u0ec9\u0ea2\u0eb9\u0ec8\u0ec3\u0e99\u0eaa\u0eb2\u0e87"),s.a.createElement("div",{className:"text-center text-dark h5"},s.a.createElement(m.b,{to:"/dashboard/parcel/receive-parcel"},"\u0eae\u0eb1\u0e9a\u0e9e\u0eb1\u0e94\u0eaa\u0eb0\u0e94\u0eb8")))))),b&&ae!==e.branch_code&&U===Y.branch_now&&"truck"===K&&s.a.createElement("div",{className:"row "},s.a.createElement("div",{className:"col-12"},s.a.createElement("div",{className:"card border-danger mb-3 alert-danger "},s.a.createElement("form",{onSubmit:Ne},s.a.createElement("div",{className:"h2 mt-2 m-3 text-center text-dark pt-3"},"\u0e9e\u0eb1\u0e94\u0eaa\u0eb0\u0e94\u0eb8\u0e99\u0eb5\u0ec9 \u0e9a\u0ecd\u0ec8\u0ec4\u0e94\u0ec9\u0ea2\u0eb9\u0ec8\u0ec3\u0e99\u0eaa\u0eb2\u0e87"),s.a.createElement("div",{className:"text-center text-dark h5"},s.a.createElement(m.b,{to:"/dashboard/parcel/receive-parcel"},"\u0eae\u0eb1\u0e9a\u0e9e\u0eb1\u0e94\u0eaa\u0eb0\u0e94\u0eb8")))))),b&&U===Y.branch_now&&ae===e.branch_code&&s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-md-4 col-12"}),s.a.createElement("div",{className:"col-md-5 col-lg-3  mb-3 col-12 d-flex justify-content-center"},s.a.createElement("div",{className:"send-box-bill px-1"},s.a.createElement("div",{className:"title text-center"},"Cloud Express"),s.a.createElement("div",{className:"customer"},s.a.createElement("div",{className:"sender"},s.a.createElement("div",{className:"name"},"\u0e9c\u0eb9\u0ec9\u0eaa\u0ebb\u0ec8\u0e87:",G),s.a.createElement("div",{className:"name"},"\u0ec0\u0e9a\u0eb5\u0ec2\u0e97: ",I),s.a.createElement("div",{className:"name"},"\u0e97\u0eb5\u0ea2\u0eb9\u0ec8:")),s.a.createElement("div",{className:"receive"},s.a.createElement("div",{className:"name"},"\u0e9c\u0eb9\u0ec9\u0eae\u0eb1\u0e9a: ",P),s.a.createElement("div",{className:"name"},"\u0ec0\u0e9a\u0eb5\u0ec2\u0e97: ",R),s.a.createElement("div",{className:"name"},"\u0e97\u0eb5\u0ea2\u0eb9\u0ec8: ",Q))),s.a.createElement("div",{className:"to_branch"},s.a.createElement("div",{className:"start"},s.a.createElement("div",{className:""},me[0].name),s.a.createElement("div",{className:""},T)),s.a.createElement("div",{className:"start"},s.a.createElement(_.a,{icon:"fa-solid fa-truck-fast"})),s.a.createElement("div",{className:"end"},s.a.createElement("div",{className:""},se[0].name),s.a.createElement("div",{className:""},U))),s.a.createElement("div",{className:"customer"},s.a.createElement("div",{className:"sender"},s.a.createElement("div",{className:"name"},"\u0e95\u0ebb\u0ec9\u0e99\u0e97\u0eb2\u0e87:",s.a.createElement("span",{className:"float-end me-1"}," ","pay_start"===$&&Number(Z).toLocaleString()+" \u0e81\u0eb5\u0e9a"))),s.a.createElement("div",{className:"receive"},s.a.createElement("div",{className:"name"},"\u0e9b\u0eb2\u0e8d\u0e97\u0eb2\u0e87:",s.a.createElement("span",{className:"float-end"},"pay_start"!==$&&Number(Z).toLocaleString()+" \u0e81\u0eb5\u0e9a")))),s.a.createElement("div",{className:"cod"},s.a.createElement("span",null,"COD : "),s.a.createElement("span",{className:"float-end"},function(e,a,t){return null!==e?e:null!==a?a:null!==t?t:null}(S.cod_lak,S.cod_thb,S.cod_usd).toLocaleString(),function(e){return"lak"===e?" \u0e81\u0eb5\u0e9a":"thb"===e?" \u0e9a\u0eb2\u0e94":"usd"===e?" \u0ec2\u0e94\u0ea5\u0eb2":void 0}(C))),s.a.createElement("div",{className:"sum"}),s.a.createElement("div",{className:"detail"},s.a.createElement("div",{className:"parcel"},s.a.createElement("div",{className:"text-1"},s.a.createElement("div",{className:""},"\u0e9b\u0eb0\u0ec0\u0e9e\u0e94\u0ec0\u0e84\u0eb7\u0ec8\u0ead\u0e87 : "),s.a.createElement("div",{className:""},"\u0e82\u0eb0\u0edc\u0eb2\u0e94 : "),s.a.createElement("div",{className:""},"general"===V?"\u0e99\u0ec9\u0eb3\u0edd\u0eb1\u0e81 :":"\u0e88\u0eb3\u0e99\u0ea7\u0e99 :")),s.a.createElement("div",{className:"text-2"},s.a.createElement("div",{className:""},Object(f.d)(V)),s.a.createElement("div",{className:""},"general"!==V?"-":W),s.a.createElement("div",{className:""},"general"!==V?X:X+" kg"))),s.a.createElement("div",{className:"qr"},s.a.createElement(u.a,{size:50,value:H}),s.a.createElement("div",{className:""},H),s.a.createElement("div",{className:""},h()(ce).format("YYYY-MM-DD H:m:s")))),s.a.createElement("div",{className:"comment"},s.a.createElement("span",{className:"c_comment line-break"},"\u0edd\u0eb2\u0e8d\u0ec0\u0eab\u0e94 ",te),":"),s.a.createElement("div",{className:"info_branch"},s.a.createElement(_.a,{icon:"fa-solid fa-location-dot"}),s.a.createElement("span",{className:"ms-1"},se[0].village+", "+re[0].name+", "+ne[0].name),s.a.createElement("div",{className:""},s.a.createElement(_.a,{icon:"fa-solid fa-mobile-retro"}),":",s.a.createElement("span",{className:"ms-1"},le[0].phone))),s.a.createElement("div",{className:"text-center "},"\u0e82\u0ecd\u0e82\u0ead\u0e9a\u0ec3\u0e88 \u0e97\u0eb5\u0ec8\u0ec3\u0e8a\u0ec9\u0e9a\u0ecd\u0ea5\u0eb4\u0e81\u0eb2\u0e99"))),s.a.createElement("div",{className:"col-md-3 col-lg-2 col-12"}),s.a.createElement("div",{className:"col-md-4"}),s.a.createElement("div",{className:"col-md-5 col-lg-3"},s.a.createElement("div",{className:"card border-warning"},s.a.createElement("form",{onSubmit:function(e){e.preventDefault(),Object(v.n)(Ee,a).then(function(e){e.data.success?(Object(i.a)("success",e.data.success),_e(Object(r.a)({},ie,{serial_parcel:""})),N(!1),be.current.focus()):Object(i.a)("error",e.data.error)}).catch(function(e){Object(i.a)("error",e.response.data.error)})}},"waite"===ee&&s.a.createElement("div",{className:"row m-2"},s.a.createElement("div",{className:"col-7"},s.a.createElement("button",{className:"btn btn-success col-12"},"\u0eae\u0eb1\u0e9a\u0ec0\u0e87\u0eb4\u0e99")),s.a.createElement("div",{className:"col-5"},s.a.createElement(m.b,{to:"/dashboard/parcel/add",className:"btn btn-warning col-12"},"\u0e95\u0eb5\u0e81\u0eb1\u0e9a"))),"waite"!==ee&&s.a.createElement("div",{className:"row m-2"},s.a.createElement("p",{className:"text-danger text-center"},"\u0ec3\u0e9a\u0e9a\u0eb4\u0e99\u0e99\u0eb5\u0ec9\u0eae\u0eb1\u0e9a\u0ec0\u0e87\u0eb4\u0e99\u0ec1\u0ea5\u0ec9\u0ea7"))))),s.a.createElement("div",{className:"col-md-4"}))),b&&U!==Y.branch_now&&s.a.createElement("div",{className:"container "},s.a.createElement("div",{className:"card border-danger mb-3 alert-danger "},s.a.createElement("form",{onSubmit:Ne},s.a.createElement("div",{className:"h2 mt-2 m-3 text-center text-dark pt-3"},"\u0e9e\u0eb1\u0e94\u0eaa\u0eb0\u0e94\u0eb8\u0e99\u0eb5\u0ec9 \u0e9a\u0ecd\u0ec8\u0ec4\u0e94\u0ec9\u0ea2\u0eb9\u0ec8\u0ec3\u0e99\u0e84\u0ea7\u0eb2\u0ea1\u0eae\u0eb1\u0e9a\u0e9c\u0eb4\u0e94\u0e8a\u0ead\u0e9a\u0e82\u0ead\u0e87\u0e97\u0ec8\u0eb2\u0e99"),s.a.createElement("div",{className:"text-center text-dark h5"},"\u0e81\u0eb0\u0ea5\u0eb8\u0e99\u0eb2\u0e99\u0eb3\u0eaa\u0ebb\u0ec8\u0e87\u0eaa\u0eb2\u0e82\u0eb2",s.a.createElement("span",{className:"text-danger"}," "+se[0].name+" "),"( "+se[0].branch_code+" )")))),O&&s.a.createElement("div",null,s.a.createElement("div",{className:"d-flex justify-content-center mt-5"},s.a.createElement("h3",{className:"text-danger"},"\u0e9a\u0ecd\u0ec8\u0e9e\u0ebb\u0e9a\u0ea5\u0eb2\u0e8d\u0e81\u0eb2\u0e99"))))}}}]);
//# sourceMappingURL=15.cc7ac199.chunk.js.map