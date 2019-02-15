"use strict";
$(window).keyup(function(event){
    if(event.keyCode=="13") {
        if($("#signUp.active")[0])
            var $btn=$("#signUp .signUp");
        else
            var $btn=$("#login .login");
        $btn.click();
    }
});
$(window).on("load",function(){
	$(".header").load("header2.html");
	$(".footer").load("footer.html");
    var SlideVerifyPlug = window.slideVerifyPlug;//这个是登录验证滑块
    var slideVerify = new SlideVerifyPlug('#verify-wrap',{
        wrapWidth:'320',
        initText:'请按住滑块',
        sucessText:'验证通过', 	
    });
    var isVali=0;
    var valiShow=0;
    /*----------背景轮播----------*/
    (function(){
        var task=function(){
            var $img=$("#slider>img.active");
            $img.removeClass("active");
            if($img.next()[0]) $img.next().addClass("active");
            else $img.parent().children(":first-child").addClass("active");
        }
        var timer=setInterval(task,4000);
        $(document).on("visibilitychange",function(){//防止跨屏时计时器无故加速
            if(document.visibilityState=="visible") timer=setInterval(task,3000);
            else clearInterval(timer);
        });
    })();
   
    /*----------登录/注册切换----------*/
    $("#top-button").on("click","h4",function(){
        var $btn=$(this);
        if(!$btn.is(".active")){
            $btn.addClass("active")
                .siblings().removeClass("active");
        }
        if($btn.is(".tab1")){
            $("#login").addClass("active");
            $("#signUp").removeClass("active");
           
        }else{
            $("#signUp").addClass("active");
            $("#login").removeClass("active");
        }
        $("#login").css({
            "height":574,
            "margin-top":-287
        });
        $("#login>.main>div.verify-line").addClass("hidden");
        valiShow=0;
        $("#login input:not([readonly]),#signUp input:not([readonly])").val("");
        $("#signUp input.checkbox").prop("checked",false);
        $("#signUp .signUp").prop("disabled",true);
    });
    /*----------登录----------*/
    $("#login")
    .on("click",".newUser-line>.newUser",function(){//切换到注册
        $("#signUp").addClass("active");
        $("#login").removeClass("active");
    })
    .on("click",".first-line>div>span",function(){//登录方式切换
        var $btn=$(this);
        if(!$btn.is(".active")){
            $btn.parent().addClass("active")
                .siblings().removeClass("active");
        }
        if($btn.is(".tab1")){
            $("#login .phone-line>p").html("手机号");
            $("#login .phone-line>div>input:first-child").show()
                                                .next().css({
                                                    "width":"222px",
                                                    "marginLeft":"10px"
                                                })
            $("#login .phone-line>div>input:last-child").prop("placeholder","请输入手机号");
        }else{
            $("#login .phone-line>p").html("账号");
            $("#login .phone-line>div>input:first-child").hide()
                                                .next().css({
                                                    "width":"100%",
                                                    "marginLeft":"0"
                                                })
            $("#login .phone-line>div>input:last-child").prop("placeholder","请输入账号");
        }
        $("#login input.login-uname,#login input.login-upwd").val("");
        $("#login").css({
            "height":574,
            "margin-top":-287
        });
        $("#login>.main>div.verify-line").addClass("hidden");
        valiShow=0;
    })
    .on("click","input.login-uname,input.login-upwd",function(){
        $("#login").css({
            "height":574,
            "margin-top":-287
        });
        $("#login>.main>div.verify-line").addClass("hidden");
        isVali=0
        valiShow=0;
        slideVerify.resetVerify();
    })
    .on("click",".login",function(){//验证登录
        if(slideVerify.slideFinishState) isVali=1;
        var uname=$(".login-uname").val();
        var upwd=$(".login-upwd").val();
        var task=function(){
            $("#err").css("transform","translateY(-40px)");
        }
        function vali1(val,errMsg){
            if(val==""){
                $("#err").css("transform","translateY(0)")
                        .children(":first-child").html(errMsg)                       
                setTimeout(task,3000);
                return false
            }else{
                return true;
            }
        }
        function vali2(val,reg,errMsg){
            if(reg.test(val)){
                return true;
            }else{
                $("#err").css("transform","translateY(0)")
                        .children(":first-child").html(errMsg)                       
                setTimeout(task,3000);
                return false;
            }
        };
        var reg1=/^1[3-8]\d{9}$/;//手机号
        var reg2=/^\w{6,15}$/;//密码
        var errMsg1="请填写手机号！";
        var errMsg2="请填写密码！";
        var errMsg3="请输入合法的手机号！";
        var errMsg4="密码必须是6~15位的字母或数字！";
        if(!vali1(uname,errMsg1)) return;
        if(!vali2(uname,reg1,errMsg3)) return;
        if(!vali1(upwd,errMsg2)) return;
        if(!vali2(upwd,reg2,errMsg4)) return;
        if(isVali==0){
            if(valiShow==1){
                var errMsg="请将验证滑块移动到最右边！"
                $("#err").css("transform","translateY(0)")
                        .children(":first-child").html(errMsg)                       
                setTimeout(task,3000);
            }else{
                $("#login").css({
                    "height":620,
                    "margin-top":-310
                });
                $("#login>.main>div.verify-line").removeClass("hidden");
                valiShow=1;
            }
        }else{ 
            $.ajax({
                url:"http://127.0.0.1:3000/users/login",
                type:"post",
                data:{uname,upwd},
                datatype:"json",
                success:function(res){
                    if(res.ok=="0"){
                        $("#err").css("transform","translateY(0)")
                                    .children(":first-child").html(res.msg);
                        setTimeout(task,3000);
												console.log(res)
                    }else{
                        sessionStorage.setItem("uname",uname);
                        location.href="index.html";
                    };
                }
            }); 
        }
    });
    /*--------------注册--------------*/
    $("#signUp")
    .on("click",".last-line>.goLogin",function(){//切换到登录
        $("#login").addClass("active");
        $("#signUp").removeClass("active");
    })
    .on("click",".read-line>.checkbox",function(){
        var $check=$(this);
        $("#signUp .signUp").prop(//修改属性 
            "disabled", !($check.prop("checked"))
        )
    })
    .on("click",".signUp",function(){ //注册
        var uname=$(".uname").val();
        var code=$(".code").val();
        var upwd=$(".upwd").val();
        var task=function(){
            $("#err").css("transform","translateY(-40px)");
        }
        function vali1(val,errMsg){
            if(val==""){
                $("#err").css("transform","translateY(0)")
                         .children(":first-child").html(errMsg)                       
                setTimeout(task,3000);
                return false
            }else{
                return true;
            }
        }
        function vali2(val,reg,errMsg){
            if(reg.test(val)){
                return true;
            }else{
                $("#err").css("transform","translateY(0)")
                         .children(":first-child").html(errMsg)                       
                setTimeout(task,3000);
                return false;
            }
        };
        var reg1=/^1[3-8]\d{9}$/;//手机号
        var reg2=/^\d{4}$/;//验证码
        var reg3=/^\w{6,15}$/;//密码
        var errMsg1="请填写手机号！";
        var errMsg2="请填写验证码！";
        var errMsg3="请填写密码！";
        var errMsg4="请输入合法的手机号！";
        var errMsg5="请输入正确的验证码！";
        var errMsg6="密码必须是6~15位的字母或数字！";
        if(!vali1(uname,errMsg1)) return;
        if(!vali2(uname,reg1,errMsg4)) return;
        if(!vali1(code,errMsg2)) return;
        if(!vali2(code,reg2,errMsg5)) return;
        if(!vali1(upwd,errMsg3)) return;
        if(!vali2(upwd,reg3,errMsg6)) return;
        var submit=function(){//手机号若未注册，才提交
            $.ajax({
                url:"http://127.0.0.1:3000/users/signUp",
                type:"post",
                data:{uname,upwd},
                datatype:"json",
                success:function(res){
                    if(res.ok=="0"){
                        $("#err").css("transform","translateY(0)")
                                    .children(":first-child").html(res.msg);
                        setTimeout(task,3000);
                    }else{
                        
                        if(confirm("注册成功！"))
                            location.href="login.html";
                    };
                }
            })
        }; 
        var vali3=function(){//验证手机号是否已经被使用
            $.ajax({
                url:"http://127.0.0.1:3000/users/vali",
                type:"post",
                data:{uname},
                datatype:"json",
                success:function(res){
                    if(res.ok=="0"){
                        $("#err").css("transform","translateY(0)")
                                    .children(":first-child").html(res.msg);
                        setTimeout(task,3000);
                    }else{
                        submit();//支持jquery 1x
                    };
                }
            })
        };
        vali3();
    });   
});

    
