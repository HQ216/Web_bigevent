$(function(){
var form=layui.form;
    form.verify({
        nickname: function(value){
            if(value.length>6){
                return "昵称长度必须在 1 ~ 6 个字符之间！"
            }
        }
    })

    initUserInfo()
    function initUserInfo(){ 
        $.ajax({
            method:"GET",
            url:"/my/userinfo",
            success:function(res){
                if(res.status!=0){
                    return layui.layer.msg('获取失败！')
                }
                form.val("formUserInfo",res.data);
            }
        })
    }
    // 重置按钮
    $('#btnReset').on("click",function(e){
        e.preventDefault();
        initUserInfo();

    })

    $(".layui-form").on("submit",function(e){
        e.preventDefault();
        $.ajax({
            method:"POST",
            url:"/my/userinfo",
            data:$(this).serialize(),
            success:function(res){
                if(res.status!=0){
                    return layui.layer.msg('修改失败')
                }
                // initUserInfo();
                window.parent.getUserInfo();
              layui.layer.msg("修改成功！")

            }
        })
    })
})