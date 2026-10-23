function validar(){
    let txt_senha = document.getElementById("txt_senha");
    let txt_confirma = document.querySelector("#txt_confirma");

    if(txt_senha.value == txt_confirma.value){
        document.querySelector("#p_mensagem").innerHTML = "As senhas estão iguais";
        document.querySelector("#p_mensagem").style.color = "blue";
    }else{
        document.querySelector("#p_mensagem").innerHTML = "As senhas não estão iguais";
        document.querySelector("#p_mensagem").style.color = "red";
        txt_confirma.focus();
    }

    return false;
}