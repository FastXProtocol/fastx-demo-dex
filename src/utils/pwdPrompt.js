var promptCount = 0;
const pwdPrompt = (title, defaultValue, callback) => {
    var prompt = document.createElement("div")
    prompt.className = "pw_prompt"
    prompt.style.position = "fixed"
    prompt.style.left = "50%"
    prompt.style.top = "0%"
    prompt.style.marginLeft = "-200px"
    prompt.style.padding = "15px"
    prompt.style.width = "400px"
    prompt.style.height = "160px"
    prompt.style.border = "1px solid #ccc"
    prompt.style.backgroundColor = "white"
    prompt.style.zIndex = "999"
    prompt.style.boxShadow = "1px 0px 12px #ccc"

    var submit = function() {
        callback(input.value);
        document.body.removeChild(prompt);
    };

    var label = document.createElement("label");
    label.textContent = title;
    label.for = "pw_prompt_input" + (++promptCount);
    label.style.display = "block"
    label.style.marginBottom = "5px"
    prompt.appendChild(label);

    var input = document.createElement("input");
    input.id = "pw_prompt_input" + (promptCount);
    input.type = "password";
    input.defaultValue = defaultValue;
    input.style.width = "100%"
    input.style.marginBottom = "5px"
    input.addEventListener("keyup", function(e) {
        if (e.keyCode == 13) submit();
    }, false);
    prompt.appendChild(input);

    var button = document.createElement("button");
    button.textContent = "确定";
    button.addEventListener("click", submit, false);
    prompt.appendChild(button);

    document.body.appendChild(prompt);
}

export default pwdPrompt
