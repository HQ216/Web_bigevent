$(function(){
    getUserInfo();
    $("#btnLogout").on("click",function(){
        var layer= layui.layer;
        layer.confirm('确定退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem("token");
            location.href='/login.html'
            
            layer.close(index);
          });
    })
});
function getUserInfo(){
    $.ajax({
        url:"/my/userinfo",
        method:"GET",
      
        // Authorization:localStorage.getItem("token"),
 
        success:function(res){
               if(res.status!=0){
                return layui.layer.msg('获取用户信息失败！')
               } 
            //    console.log(res);
               renderAvatar(res.data);
               
        }
    })
}
// 渲染头像
function renderAvatar(User){ 
        var name=User.nickname||User.username
        $('#welcome').html("欢迎  "+name);
        if(User.user_pic!=null){
            $('.layui-nav-img').attr('src',User.user_pic).show();
            $('.text-avatar').hide();
        }
        else{
            $('.layui-nav-img').hide();
            var first=name[0].toUpperCase();
            $('.text-avatar').html(first).show();
        }
}