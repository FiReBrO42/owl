import{_ as d,o as m,c as p,a as t,f as a,A as c,j as _}from"./index-4e1062d4.js";const{VITE_APP_URL:u}={VITE_APP_URL:"https://vue3-course-api.hexschool.io",VITE_APP_PATH:"owl",VITE_APP_TOKEN:"eyJhbGciOiJSUzI1NiIsImtpZCI6InRCME0yQSJ9.eyJpc3MiOiJodHRwczovL3Nlc3Npb24uZmlyZWJhc2UuZ29vZ2xlLmNvbS92dWUtY291cnNlLWFwaSIsImF1ZCI6InZ1ZS1jb3Vyc2UtYXBpIiwiYXV0aF90aW1lIjoxNjkwMjc0ODI5LCJ1c2VyX2lkIjoiU2VwMmhQWTZRS2JuWjlQM2p2RHFWaHQyYjRSMiIsInN1YiI6IlNlcDJoUFk2UUtiblo5UDNqdkRxVmh0MmI0UjIiLCJpYXQiOjE2OTAyNzQ4MjksImV4cCI6MTY5MDcwNjgyOSwiZW1haWwiOiJzYW0xMjQ2NzQ3QGhvdG1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsic2FtMTI0Njc0N0Bob3RtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.X8LCS7AiUzj22H-l6baP_q5_2tsI4Hq2jRVFRtk4J7_qFNM2FjPiTUEr071YBhlQ3CyYzGXzI9ux_DCsV64DjdrRHPLqun0o8jGZFSpzT1ow-wxZl9CMtgCIytNJCsIWrTpUEfwat_YuI3U4T0LqfGDVZEYC91XSTWtkZ92PjoBcnrLEfmWh96jN9dpkLn2fDH9oLgVv6EM8vB9bkYeGigTpCVmIE0xISkB8p_rd_9kt_9vHW2AgvELNp3XrRn2SbtWdtWRKL_r6IivKij80fHQWX17trlre4iayDiRcd3MVjS_1_fi_QD6pIDtvO5Q65ohaHnT51MGTS4mROFKVHA",BASE_URL:"/owl/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},I={data(){return{user:{username:"sam1246747@hotmail.com",password:"12332112As"}}},methods:{login(){const e=`${u}/v2/admin/signin`;this.$http.post(e,this.user).then(s=>{const{token:l,expired:n}=s.data;document.cookie=`owl=${l}; expires=${n}`,this.$swal(s.data.message).then(()=>{this.$router.push("/admin/adminRestaurants")})}).catch(()=>{this.$swal("請確認帳號密碼是否正確")})}},mounted(){}},h={class:"row mt-5"},w={class:"col-10 col-md-7 col-lg-4 d-flex login_container"},f=t("h2",{class:"fs-2 mb-3 mb-lg-6 login_title"},"登入",-1),b={class:"mb-3 mb-lg-3 d-flex login_input_container"},W=t("label",{for:"login_account",class:"fs-5"},"帳號",-1),j={class:"mb-4 mb-lg-5 d-flex login_input_container"},V=t("label",{for:"login_password",class:"fs-5"},"密碼",-1);function g(e,s,l,n,o,r){return m(),p("form",h,[t("div",w,[f,t("div",b,[W,a(t("input",{type:"email",id:"login_account",class:"mt-2",placeholder:"請輸入email帳號","onUpdate:modelValue":s[0]||(s[0]=i=>o.user.username=i)},null,512),[[c,o.user.username]])]),t("div",j,[V,a(t("input",{type:"password",id:"login_password",class:"mt-2",placeholder:"請輸入密碼","onUpdate:modelValue":s[1]||(s[1]=i=>o.user.password=i)},null,512),[[c,o.user.password]])]),t("button",{type:"submit",class:"fs-7 btn form_btn form_btn_submit login_btn",onClick:s[2]||(s[2]=_(i=>r.login(),["prevent"]))}," 登入 ")])])}const R=d(I,[["render",g]]);export{R as default};
