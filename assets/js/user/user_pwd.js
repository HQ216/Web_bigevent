$(function () {

    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return "不能和原密码相同"
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return "两次密码不一致"
            }
        }
    })
    $("#reset1").on('click', function () {
        $(".layui-form")[0].reset();
    })
    $(".layui-form").on("submit", function (e) {
        console.log(123);
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layui.layer.msg('更新密码失败！')
                }
                layui.layer.msg('更新密码成功！')
                localStorage.removeItem("token");
                window.parent.location.href='/login.html'
            }
        })
    })
})