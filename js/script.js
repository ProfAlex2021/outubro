
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

    //Cria uma nova tag <li>
    item = document.createElement("li");
    //adiciona o texto na tag: <li>E-mail JS</li>
    item.textContent = "E-mail JS";
    //adiciona a classe na tag: <li class="correto">E-mail JS</li>
    item.classList.add("correto");
    //adiciona o item na lista: <ul><li class="correto">E-mail JS</li></ul>
    lista_tag.appendChild(item);
    //repetindo o processo
    item = document.createElement("li");
    item.textContent = "Celular JS";
    item.classList.add("erro");
    lista_tag.appendChild(item);
    item = document.createElement("li");
    item.textContent = "Senha JS";
    lista_tag.appendChild(item);
    //fim da repetição do processo

    //Comparar se o valor das duas caixas de texto estão idênticas
    lista_tag.innerHTML = "";

    //Verificar nome
    item = document.createElement("li");
    if(txt_nome.value.trim() == ""){
        item.textContent = "Nome está vazio";
        item.classList.add("erro");
    }else{
        item.textContent = "Nome preenchido";
        item.classList.add("correto");
    }
    lista_tag.appendChild(item);

    //Verificar e-mail
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

    //Verificar celular
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

    //Verificar senha
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

    /*
    //Comparar se o valor das duas caixas de texto estão idênticas
    if(txt_senha.value == txt_confirma.value){
        //Caso VERDADEIRO
        //Exibir a mensagem "As senhas estão iguais"
        mensagem.innerHTML = "As senhas estão iguais";
        //A mensagem deve estar com classe correto
        mensagem.classList.add("correto");
        mensagem.classList.remove("erro");
    }else{
        //Caso FALSO
        //Exibir a mensagem "As senhas não estão iguais"
        mensagem.innerHTML = "As senhas não estão iguais";
        //A mensagem mensagem deve estar com a classe erro
        mensagem.classList.add("erro");
        mensagem.classList.remove("correto");

        //Selecionar a caixa de repetir e confirmar para o usuário digitar
        txt_confirma.focus();
    }
*/
    //Interromper o envio do formulário
    return false;

    //Exibir cada mensagem de validação de acordo com cada comparação:
    //Se o campo estiver sem texto, Exibir mensagem "[CAMPO] está vazio"
    //Se o campo estiver diferente da repetição, Exibir mensagem "[CAMPO]s são diferentes"
    //Se o campo estiver igual a comparação, Exibir mensagem "[CAMPO]s estão iguais"
}

function limpar(){
    let mensagem = document.querySelector("#p_mensagem");
    mensagem.innerHTML = "";
    mensagem.classList.remove("correto", "erro");
}

function adicionar_apelido(){
    let txt_apelido = document.querySelector("#txt_apelido").value;
    let lst_apelido = document.querySelector("#lst_apelido");

    let novo_apelido = document.createElement("option");
    novo_apelido.textContent = txt_apelido;
    novo_apelido.value = txt_apelido;
    lst_apelido.appendChild(novo_apelido);

    let p_lista_apelido = document.querySelector("#p_lista_apelido");
    //Alterna entre display = "none" (invisível) para display = "block" (visível)
    p_lista_apelido.style.display = "block";

    //no final, limpar a caixa de texto de apelido
    document.querySelector("#txt_apelido").value = "";
}

async function gravar_apelido(){
    let apelido = document.querySelector('#lst_apelido option:checked');

    if(apelido == null){
        alert("Selecione um apelido");
        return;
    }

    apelido = apelido.innerText;

    await cookieStore.set("apelido_favorito", apelido);
    //Gravar todos campos do formulário no cookie
    await cookieStore.set("nome", document.querySelector("#txt_nome").value);
    await cookieStore.set("email", document.querySelector("#txt_email").value);
    await cookieStore.set("celular", document.querySelector("#txt_celular").value);

    //Gravar lista de apelidos no cookie
    let lst_apelido = document.querySelector("#lst_apelido");
    let lista = [];

    for(let i = 0; i < lst_apelido.options.length; i++){
        lista.push(lst_apelido.options[i].value);
    }

    await cookieStore.set("lista_apelidos", JSON.stringify(lista));
}

async function carregar_apelido(){
    let apelido = await cookieStore.get("apelido_favorito");

    let p_lista_apelido = document.querySelector("#p_lista_apelido");
    p_lista_apelido.style.display = "block";

    let lst_apelido = document.querySelector("#lst_apelido");

    //Limpar lista anterior
    lst_apelido.innerHTML = "";

    let novo_apelido = document.createElement("option");

    //Carregar lista de apelido
    let lista_salva = await cookieStore.get("lista_apelidos");

    if(lista_salva){
        let lista = JSON.parse(lista_salva.value);

        for(let i = 0; i < lista.length; i++){
            novo_apelido = document.createElement("option");
            novo_apelido.textContent = lista[i];
            novo_apelido.value = lista[i];
            lst_apelido.appendChild(novo_apelido);
        }
    }

    //Carregar campos do formulário
    let nome = await cookieStore.get("nome");
    let email = await cookieStore.get("email");
    let celular = await cookieStore.get("celular");

    if(nome) document.querySelector("#txt_nome").value = nome.value;
    if(email) document.querySelector("#txt_email").value = email.value;
    if(celular) document.querySelector("#txt_celular").value = celular.value;

    //Selecionar apelido favorito
    if(apelido){
        lst_apelido.value = apelido.value;
    }
}
