//1.查找触发事件的元素
/*var as=document.querySelectorAll(
  ".vm_main #tab>li>[data-toggle=tab]"
 
);
 console.log(as);
//2.绑定事件处理函数
for(var a of as){
  a.onclick=function(){
    var a=this;
//3.查找要修改的元素
    var id=a.getAttribute("data-id");
    var div=document.querySelector(id)
    var divs=document.querySelectorAll("#container>div");
    for(var d of divs){
      d.style.zIndex="";
      
    }
    div.style.zIndex=10;
  }
}*/
$(function(){
$(".tabs:has([data-toggle=tab])")
      .on("click","[data-toggle=tab]",e=>{
      var $tar=$(e.target);
      if(!$tar.is(".active")){
        $tar.parent().addClass("active")
          .siblings().removeClass("active");
        var id=$tar.attr("href");
        $(id).addClass("active")
          .siblings().removeClass("active");
      }
    })
    $("accordion").on("click",".title",e=>$(e.target).next(".content").toggleClass("in").siblings(".content").removeClass("in"));
    $(function(){
      //http://localhost:3000
      console.log("11")
      console.log($(".my-small"))
      $(document).on("click",".my-small",function(){
        var $img=$(this);
        var src=$img.attr("data-target");
        //$(".my-big").attr({src});
        $img.parents('.vm_photoer_img').children().first().find('.my-big').attr({src})
      })
    })
    //	关注
			$("#content1 .vm_photoer .vm_photoer_item .vm_attension").on("click",function(){
			$(".jump").css({"opacity":1,
        "z-index":999
        })
        setTimeout(function(){
                 $(".jump").css({"opacity":0,
                "z-index":-1
                }) 
        },4000)
        if(sessionStorage.getItem("uname")){
                $(this).html("已关注")   
               
        }else{
                $(".jump").html("请先登陆")
        }
                })

})
