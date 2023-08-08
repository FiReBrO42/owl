import{_ as w,o as f,c as h,a as t,j as C,d,f as m,A as c,B as y,F as x,e as M}from"./index-4e1062d4.js";const{VITE_APP_URL:v,VITE_APP_PATH:U}={VITE_APP_URL:"https://vue3-course-api.hexschool.io",VITE_APP_PATH:"owl",VITE_APP_TOKEN:"eyJhbGciOiJSUzI1NiIsImtpZCI6InRCME0yQSJ9.eyJpc3MiOiJodHRwczovL3Nlc3Npb24uZmlyZWJhc2UuZ29vZ2xlLmNvbS92dWUtY291cnNlLWFwaSIsImF1ZCI6InZ1ZS1jb3Vyc2UtYXBpIiwiYXV0aF90aW1lIjoxNjkwMjc0ODI5LCJ1c2VyX2lkIjoiU2VwMmhQWTZRS2JuWjlQM2p2RHFWaHQyYjRSMiIsInN1YiI6IlNlcDJoUFk2UUtiblo5UDNqdkRxVmh0MmI0UjIiLCJpYXQiOjE2OTAyNzQ4MjksImV4cCI6MTY5MDcwNjgyOSwiZW1haWwiOiJzYW0xMjQ2NzQ3QGhvdG1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsic2FtMTI0Njc0N0Bob3RtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.X8LCS7AiUzj22H-l6baP_q5_2tsI4Hq2jRVFRtk4J7_qFNM2FjPiTUEr071YBhlQ3CyYzGXzI9ux_DCsV64DjdrRHPLqun0o8jGZFSpzT1ow-wxZl9CMtgCIytNJCsIWrTpUEfwat_YuI3U4T0LqfGDVZEYC91XSTWtkZ92PjoBcnrLEfmWh96jN9dpkLn2fDH9oLgVv6EM8vB9bkYeGigTpCVmIE0xISkB8p_rd_9kt_9vHW2AgvELNp3XrRn2SbtWdtWRKL_r6IivKij80fHQWX17trlre4iayDiRcd3MVjS_1_fi_QD6pIDtvO5Q65ohaHnT51MGTS4mROFKVHA",BASE_URL:"/owl/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},S={data(){return{userVerifyCode:"",verifyCode:"",form:{is_enabled:1,unit:"個",origin_price:1,price:1,category:"餐廳",title:"",time:{openTimes:"",publicHoliday:""},address:"",content:"",imagesUrl:[{imageUrl:"",imageAlt:"",timeStamp:""}],googleMapUrl:"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3615.550013102598!2d121.5367189!3d25.015402!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xec78966a3d7b4efc!2z5ZyL56uL6Ie654Gj5aSn5a2455Sf5ZG956eR5a246aSo!5e0!3m2!1szh-TW!2stw!4v1534244255311"},imageArray:[],imagesRender:[],imageUpdateUrl:"https://via.placeholder.com/200"}},methods:{drawCaptcha(){const r=[],e=this.$refs.canvas,s=e.getContext("2d"),n=e.width,i=e.height,o="a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0".split(","),u=o.length;s.clearRect(0,0,n,i);for(let l=0;l<4;l++){const p=Math.floor(Math.random()*u),_=Math.random()-.5,g=o[p];r[l]=g;const I=10+l*20,b=20+Math.random()*8;s.font="bold 1.5rem 微软雅黑",s.translate(I,b),s.rotate(_),s.fillStyle=this.randomColor(),s.fillText(g,0,0),s.rotate(-_),s.translate(-I,-b)}for(let l=0;l<=5;l++)s.strokeStyle=this.randomColor(),s.beginPath(),s.moveTo(Math.random()*n,Math.random()*i),s.lineTo(Math.random()*n,Math.random()*i),s.stroke();for(let l=0;l<=30;l++){s.strokeStyle=this.randomColor(),s.beginPath();const p=Math.random()*n,_=Math.random()*i;s.moveTo(p,_),s.lineTo(p+1,_+1),s.stroke()}this.verifyCode=r.join("")},refreshCaptcha(){this.drawCaptcha()},randomColor(){const r=Math.floor(Math.random()*256),e=Math.floor(Math.random()*256),s=Math.floor(Math.random()*256);return`rgb(${r},${e},${s})`},renderImage(){},updateLocalImageAPI(r){const e=r.target.files[0],s=e.name.substring(e.name.lastIndexOf(".")+1).toLowerCase();if(s!=="jpg"&&s!=="png"){alert("上傳檔案只能是 jpg、png 格式!，請注意格式上傳呦");return}const n=new FormData;n.append("file-to-upload",e);const i=`${v}/v2/api/${U}/admin/upload`;this.$http.post(i,n).then(a=>{this.imageUpdateUrl=a.data.imageUrl,alert("圖片上傳成功")}).catch(a=>{alert(a.response.data.message)})},updateImage(){const r={imageUrl:this.imageUpdateUrl,imageAlt:this.form.title+"圖片",timeStamp:Date.now()};this.imageArray.push(r),this.sortRenderImg(),this.form.imagesUrl=[...this.imageArray]},deleImg(){this.imageArray.pop(),this.sortRenderImg()},sortRenderImg(){const r=[...this.imageArray].sort((e,s)=>s.timeStamp-e.timeStamp);this.imagesRender={...r}},formSubmit(){const r=`${v}/v2/api/${U}/admin/product`;this.form.imagesUrl=JSON.parse(JSON.stringify(this.imageArray));const e={data:this.form};this.userVerifyCode.toLowerCase()!==this.verifyCode.toLowerCase()?this.$swal("錯誤","驗證碼錯誤","error"):this.userVerifyCode.toLowerCase()===""?this.swal("錯誤","請輸入驗證碼","error"):this.$swal({title:"確定新增嗎?",text:"請確保資訊是否都有填寫完整正確，再送出!",icon:"question",showCancelButton:!0,confirmButtonColor:"#BB8D74",cancelButtonColor:"#919191",confirmButtonText:"確定新增"}).then(s=>{s.isConfirmed&&this.$http.post(r,e).then(n=>{this.$swal("成功",n.data.message,"success")}).catch(n=>{this.$swal(n.data.message)})})},wrongAlert(){},googleMapApi(){const r="AIzaSyB9JF9zPks-ExJceYoROUo5Ef04KlLJNOU";this.form.googleMapUrl=`https://www.google.com/maps/embed/v1/place?key=${r}&q=`+this.form.address+"&language=zh-TW"}},mounted(){this.drawCaptcha();let r=document.cookie.replace(/(?:(?:^|.*;\s*)owl\s*\=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=r}},T=t("div",{class:"row mb-3 mt-6 mt-lg-0"},[t("h2",{class:"fs-2 fw-bold"},"推薦回饋表")],-1),V={class:"row"},k={class:"row d-flex form_container_layout"},A={class:"col-12 col-lg-6 d-flex form_txtInput_container"},R={class:"d-flex form_txtInput_label_container"},j={for:"input_name",class:"form_txtInput_label form_txtInput_label_name fs-5"},W={class:"form_txtInput_label form_txtInput_label_type_container fs-5"},L=t("h5",{class:"fs-5"},"類別",-1),N={class:"mt-3 d-flex input_type_container"},q={for:"input_type_restaurant",class:"d-flex"},P=["checked"],Z=t("span",{class:"material-icons material-icons_radio"}," radio_button_unchecked ",-1),E={for:"input_type_viewpoint",class:"d-flex"},B=t("span",{class:"material-icons material-icons_radio"}," radio_button_unchecked ",-1),J={class:"d-flex form_txtInput_label_container"},H={for:"input_openTimes",class:"form_txtInput_label form_txtInput_label_time fs-5"},O={for:"input_publicHoliday",class:"input_publicHoliday form_txtInput_label form_txtInput_label_time fs-5"},D={class:"mt-3 mt-lg-0 d-flex input_address_label_container"},F={for:"input_address",class:"form_txtInput_label fs-5"},Y={class:"address_content_googleMap_container"},z=["src"],Q={for:"input_sub",class:"mt-3 mt-lg-0 form_txtInput_label fs-5"},X=t("div",{class:"col-12 col-lg-1 my-3 my-lg-0 d-flex form_divide_container"},[t("span",{class:"form_divide"})],-1),G={class:"col-12 col-lg-5 d-flex form_imageInput_container"},K=t("h5",{class:"fs-5 mb-2 form_imageInput_container_title"},"圖片上傳",-1),$={class:"imageInput_img_container"},tt=["src"],et={class:"imageInput_list_container mt-3"},ot=["src","alt"],it={for:"input_imgUrl",class:"mt-3 imageInput_imgUrl_label"},st={class:"mt-2 d-flex imageInput_imgUrl_btn_container"},rt=t("label",{for:"fileInput",class:"btn imageInput_imgUrl_btn_file_label"},"本地檔案上傳",-1),at=t("h5",{class:"fs-5 mt-3 form_imageInput_container_title"},"驗證碼",-1),nt={class:"mt-2 d-flex imageInput_verification_container"},lt={class:"imageInput_verification_canvas_container"},mt=t("button",{type:"submit",class:"mt-3 btn form_btn form_btn_submit"},[d(" 確認送出 "),t("span",{class:"material-icons"},"done")],-1);function dt(r,e,s,n,i,a){return f(),h(x,null,[T,t("div",V,[t("form",{class:"container form_container",onSubmit:e[14]||(e[14]=C(o=>a.formSubmit(),["prevent"]))},[t("div",k,[t("div",A,[t("div",R,[t("label",j,[d(" 名稱 "),m(t("input",{type:"text",id:"input_name",class:"mt-2 form_txtInput form_txtInput_txt",placeholder:"例如:忘憂谷","onUpdate:modelValue":e[0]||(e[0]=o=>i.form.title=o),required:"required"},null,512),[[c,i.form.title]])]),t("div",W,[L,t("div",N,[t("label",q,[m(t("input",{name:"input_type",type:"radio",id:"input_type_restaurant",class:"mt-2 form_radio",placeholder:"餐廳",value:"餐廳","onUpdate:modelValue":e[1]||(e[1]=o=>i.form.category=o),checked:i.form.category==="餐廳",required:"required"},null,8,P),[[y,i.form.category]]),Z,d(" 餐廳 ")]),t("label",E,[m(t("input",{name:"input_type",type:"radio",id:"input_type_viewpoint",class:"mt-2 form_radio",placeholder:"景點",value:"景點","onUpdate:modelValue":e[2]||(e[2]=o=>i.form.category=o),required:"required"},null,512),[[y,i.form.category]]),B,d(" 景點 ")])])])]),t("div",J,[t("label",H,[d(" 營業時間 "),m(t("input",{type:"text",id:"input_openTimes",class:"mt-2 form_txtInput form_txtInput_txt",placeholder:"格式為24小時制:07:00-21:00","onUpdate:modelValue":e[3]||(e[3]=o=>i.form.time.openTimes=o),required:"required"},null,512),[[c,i.form.time.openTimes]])]),t("label",O,[d(" 公休時間 "),m(t("input",{type:"text",id:"input_publicHoliday",class:"mt-2 form_txtInput form_txtInput_txt",placeholder:"例如:公休一/無公休日","onUpdate:modelValue":e[4]||(e[4]=o=>i.form.time.publicHoliday=o),required:"required"},null,512),[[c,i.form.time.publicHoliday]])])]),t("div",D,[t("label",F,[d(" 地點 "),m(t("input",{type:"text",id:"input_address",class:"mt-2 form_txtInput form_txtInput_txt",placeholder:"例如:438台中市外埔區溪底路26號 ","onUpdate:modelValue":e[5]||(e[5]=o=>i.form.address=o),onChange:e[6]||(e[6]=o=>a.googleMapApi()),required:"required"},null,544),[[c,i.form.address]])]),t("div",Y,[t("iframe",{id:"address_content_googleMap",src:i.form.googleMapUrl,width:"100%",height:"100%",style:{border:"0"},allowfullscreen:"",loading:"lazy",referrerpolicy:"no-referrer-when-downgrade"},null,8,z)])]),t("label",Q,[d(" 簡介 "),m(t("textarea",{name:"",id:"input_sub",class:"mt-2 form_txtInput form_txtInput_textarea",cols:"100%",rows:"30vh",placeholder:"說明文字....","onUpdate:modelValue":e[7]||(e[7]=o=>i.form.content=o),required:"required"},null,512),[[c,i.form.content]])])]),X,t("div",G,[K,t("figure",$,[t("img",{src:i.imageUpdateUrl,alt:"圖片"},null,8,tt)]),t("ul",et,[(f(!0),h(x,null,M(i.imagesRender,(o,u)=>(f(),h("li",{key:u,class:"imageInput_list_img_container"},[t("img",{src:o.imageUrl,alt:o.imageAlt},null,8,ot)]))),128))]),t("label",it,[m(t("input",{type:"text",id:"input_imgUrl",class:"imageInput_imgUrl",placeholder:"請輸入圖片連結","onUpdate:modelValue":e[8]||(e[8]=o=>i.imageUpdateUrl=o)},null,512),[[c,i.imageUpdateUrl]])]),t("div",st,[rt,t("input",{id:"fileInput",type:"file",accept:"image/*",class:"form_btn imageInput_imgUrl_btn_file",onChange:e[9]||(e[9]=(...o)=>a.updateLocalImageAPI&&a.updateLocalImageAPI(...o))},null,32),t("button",{type:"button",class:"btn form_btn imageInput_imgUrl_btn_sure",onClick:e[10]||(e[10]=o=>a.updateImage())}," 確定新增"),t("button",{type:"button",class:"btn form_btn imageInput_imgUrl_btn_del",onClick:e[11]||(e[11]=o=>a.deleImg())}," 刪除圖片 ")]),at,t("div",nt,[m(t("input",{type:"text",class:"imageInput_verification",placeholder:"請輸入驗證碼","onUpdate:modelValue":e[12]||(e[12]=o=>i.userVerifyCode=o),required:"required"},null,512),[[c,i.userVerifyCode]]),t("div",lt,[t("canvas",{class:"verification_canvas",ref:"canvas",width:"110",height:"40",onClick:e[13]||(e[13]=(...o)=>a.refreshCaptcha&&a.refreshCaptcha(...o))},null,512)])]),mt])])],32)])],64)}const _t=w(S,[["render",dt]]);export{_t as default};
