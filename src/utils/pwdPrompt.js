let html = `
<div style='padding: 16px;'>
    <input id='passwordInput' type='password' placeholder='请输入密码' style='width: 100%;height: 30px; padding: 6px;' />
    <button style='width: 170px;height: 30px;margin-top: 20px;background-color: #2185d0;color: #fff;text-shadow: none;background-image: none;' onclick='confirm()'>确定</button>
    <button style='width: 170px;height: 30px;margin-top: 20px;background-color: #fff;color: #333;text-shadow: none;background-image: none;' onclick='cancel()'>取消</button>
</div>
`
let script = `
  <script>
    function confirm() {
        window.opener.ksPasswordCallback(null, window.document.getElementById('passwordInput').value)
        cancel()
    }

    function cancel() {
        window.opener.ksPasswordCallback = null
        window.opener.passwordWindow = null
        this.close()
    }
  </script>
`

let passwordWindow

function pwdPrompt() {
    if(window.opener.passwordWindow)return;
    window.opener.passwordWindow = window.open('','_blank',"toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=no,status=no,top=500,left=500,width=400,height=200")
    window.opener.passwordWindow.document.write(html)
    window.opener.passwordWindow.document.write(script)
    window.opener.passwordWindow.document.title = '输入密码'
}

export default pwdPrompt
