

$(function(){

	 $(".header").load("header2.html");
    $(".footer").load("footer.html");
		$("#view").on("click",function(){
			$(".vm_waterfull").load("list.html");
			$(".center").css("display","none")
		})
    var url=window.location.href;
var url_index=url.indexOf("=");
// 获取页面要显示板块
var url_type=url.substring(url_index+1);
//console.log(url_type);
// 获取类别编号
//var url_type_orderNumber=url_type.substring(url_type.length-1);
//console.log(url_type_orderNumber);
    //给图片默认添加要加载的板块图片
    if(!isNaN(url_type)){
        var new_li=`<li><a href="./product_details.html?pid=4"><img src="img/photos/${url_type}/1.jpg"></a></li>`;
        for (var i=2;i<=15;i++){
            new_li+=`<li><a href="./product_details.html?pid=4"><img src="img/photos/${url_type}/${i}.jpg"></a></li>`;
        }
        $(".vm_waterfull").append(new_li);
    }else{
        var new_li=`<li><a href="./product_details.html?pid=4"><img src="img/photos/1/1.jpg"></a></li>`;
        for (var i=2;i<=15;i++){
            new_li+=`<li><a href="./product_details.html?pid=4"><img src="img/photos/1/${i}.jpg"></a></li>`;
        }
        $(".vm_waterfull").append(new_li);
    }
    
    //加载更多图片
    $(".photo_getmore").click(function(){
        var new_li=`<li><a href="./product_details.html?pid=4"><img src="img/photos/${url_type}/16.jpg"></a></li>`;
        for (var i=17;i<=30;i++){
            new_li+=`<li><a href="./product_details.html?pid=4"><img src="img/photos/${url_type}/${i}.jpg"></a></li>`;
        }
        $(".vm_waterfull").append(new_li);
    });

    //页面加载时绑定按钮点击事件(下拉框照片类型)
    $(".dropdown-content a").click(function(){
        // 获取页面类别 a标签id
        var now_id=$(this).attr("id");
        // 切割now_id是type型 获取后面的id编号
        if (now_id.indexOf("type")!=-1){
            var now_id=now_id.substring(now_id.length-1);
            console.log(now_id);
        }
        $.ajax({
            url:`http://127.0.0.1:3000/main`,
            type:"get",
            data:{now_id},
            dataType:"json",
        }).then(function(res){
        
        }
    
        )
    });

    //加载更多图片
    $(".photo_getmore").click(function(){
        var new_li=`<li><a href="./product_details.html"><img src="img/photos/${url_type_orderNumber}/16.jpg"></a></li>`;
        for (var i=17;i<=30;i++){
            new_li+=`<li><a href="./product_details.html"><img src="img/photos/${url_type_orderNumber}/${i}.jpg"></a></li>`;
        }
        $(".vm_waterfull").append(new_li);
    });

    //返回顶部
    $(".to_top").click(function(){
        $('body,html').animate({scrollTop:0},500);
        return false;
    })
})





