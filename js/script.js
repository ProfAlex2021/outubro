//Função para validar as caixas de texto
function validar(){
    let txt_nome = document.querySelector("#txt_nome");
    let txt_email = document.querySelector("#txt_email");
    let txt_email_confirma = document.querySelector("#txt_email_confirma");
    let txt_celular = document.querySelector("#txt_celular");
    let txt_celular_confirma = document.querySelector("#txt_celular_confirma");
    //Receber a variável da caixa de senha da página HTML
    let txt_senha = document.getElementById("txt_senha");
    //Receber a variável da caixa de repetir e confirmar senha da página HTML
    let txt_confirma = document.querySelector("#txt_confirma");
    //Receber a variável da mensagem página HTML
    let mensagem = document.querySelector("#p_mensagem");
    //Cria uma nova tag <ul>
    let lista_tag = document.createElement("ul");
    let item;

    //Verificar se o nome está vazio
    item = document.createElement("li");

    if(txt_nome.value.trim() == ""){
        item.textContent = "Nome está vazio";
        item.classList.add("erro");
    }else{
        item.textContent = "Nome preenchido";
        item.classList.add("correto");
    }

    lista_tag.appendChild(item);

    //Verificar o e-mail
    item = document.createElement("li");

    if(txt_email.value.trim() == ""){
        item.textContent = "E-mail está vazio";
        item.classList.add("erro");
    }else if(txt_email.value != txt_email_confirma.value){
        item.textContent = "E-mails são diferentes";
        item.classList.add("erro");
        txt_email_confirma.focus();
    }else{
        item.textContent = "E-mails estão iguais";
        item.classList.add("correto");
    }

    lista_tag.appendChild(item);

    //Verificar o celular
    item = document.createElement("li");

    if(txt_celular.value.trim() == ""){
        item.textContent = "Celular está vazio";
        item.classList.add("erro");
    }else if(txt_celular.value != txt_celular_confirma.value){
        item.textContent = "Celulares são diferentes";
        item.classList.add("erro");
        txt_celular_confirma.focus();
    }else{
        item.textContent = "Celulares estão iguais";
        item.classList.add("correto");
    }

    lista_tag.appendChild(item);

    //Verificar a senha
    item = document.createElement("li");

    if(txt_senha.value == ""){
        item.textContent = "Senha está vazia";
        item.classList.add("erro");
    }else if(txt_senha.value != txt_confirma.value){
        item.textContent = "Senhas são diferentes";
        item.classList.add("erro");
        txt_confirma.focus();
    }else{
        item.textContent = "Senhas estão iguais";
        item.classList.add("correto");
    }

    lista_tag.appendChild(item);

    //Apagando mensagens anteriores
    mensagem.innerHTML = "";
    mensagem.classList.remove("correto", "erro");

    //Adicionando a lista na mensagem
    mensagem.appendChild(lista_tag);

    //Interromper o envio do formulário
    return false;
}

function limpar(){
    let mensagem = document.querySelector("#p_mensagem");
    mensagem.innerHTML = "";
    mensagem.classList.remove("correto", "erro");
}

function adicionar_apelido(){
    let txt_apelido = document.querySelector("#txt_apelido");
    let lst_apelido = document.querySelector("#lst_apelido");

    let novo_apelido = document.createElement("option");
    novo_apelido.textContent = txt_apelido.value;
    novo_apelido.value = txt_apelido.value;

    lst_apelido.appendChild(novo_apelido);

    let p_lista_apelido = document.querySelector("#p_lista_apelido");
    //Alterna entre display = "none" (invisível) para display = "block" (visível)
    p_lista_apelido.style.display = "block";

    //no final, limpar a caixa de texto de apelido
    txt_apelido.value = "";
}

async function gravar_apelido(){
    let opcao = document.querySelector('#lst_apelido option:checked');

    if(opcao == null){
        alert("Selecione um apelido!");
        return;
    }

    let apelido = opcao.innerText;

    await cookieStore.set("apelido_favorito", apelido);

    //Gravar todos campos do formulário no cookie
    await cookieStore.set("txt_nome", document.querySelector("#txt_nome").value);
    await cookieStore.set("txt_email", document.querySelector("#txt_email").value);
    await cookieStore.set("txt_email_confirma", document.querySelector("#txt_email_confirma").value);
    await cookieStore.set("txt_celular", document.querySelector("#txt_celular").value);
    await cookieStore.set("txt_celular_confirma", document.querySelector("#txt_celular_confirma").value);

    //Gravar lista de apelidos no cookie
    let lst_apelido = document.querySelector("#lst_apelido");

    let lista_apelidos = [];

    for(let i = 0; i < lst_apelido.options.length; i++){
        lista_apelidos.push(lst_apelido.options[i].value);
    }

    await cookieStore.set("lista_apelidos", JSON.stringify(lista_apelidos));

}

async function carregar_apelido(){
    let apelido = await cookieStore.get("apelido_favorito");

    let p_lista_apelido = document.querySelector("#p_lista_apelido");
    p_lista_apelido.style.display = "block";

    let lst_apelido = document.querySelector("#lst_apelido");

    //Limpar a lista antes de carregar
    lst_apelido.innerHTML = "";

    //Carregar os campos do formulário
    let txt_nome = await cookieStore.get("txt_nome");
    let txt_email = await cookieStore.get("txt_email");
    let txt_email_confirma = await cookieStore.get("txt_email_confirma");
    let txt_celular = await cookieStore.get("txt_celular");
    let txt_celular_confirma = await cookieStore.get("txt_celular_confirma");

    if(txt_nome) document.querySelector("#txt_nome").value = txt_nome.value;
    if(txt_email) document.querySelector("#txt_email").value = txt_email.value;
    if(txt_email_confirma) document.querySelector("#txt_email_confirma").value = txt_email_confirma.value;
    if(txt_celular) document.querySelector("#txt_celular").value = txt_celular.value;
    if(txt_celular_confirma) document.querySelector("#txt_celular_confirma").value = txt_celular_confirma.value;

    //Carregar lista de apelido
    let lista_salva = await cookieStore.get("lista_apelidos");

    if(lista_salva){
        let lista_apelidos = JSON.parse(lista_salva.value);

        for(let i = 0; i < lista_apelidos.length; i++){
            let novo_apelido = document.createElement("option");
            novo_apelido.textContent = lista_apelidos[i];
            novo_apelido.value = lista_apelidos[i];

            lst_apelido.appendChild(novo_apelido);
        }
    }

    //Carregar apelido favorito
    if(apelido){
        lst_apelido.value = apelido.value;
    }

}
