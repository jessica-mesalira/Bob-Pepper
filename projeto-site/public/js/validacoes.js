function teste_login() {
    event.preventDefault();
    var erros = validaContato(erros);
    mensagemErro.innerHTML = "";

    if (erros.length > 0) {
        for (var i = 0; i < erros.length; i++) {
            var erro = erros[i];
            var li = document.createElement("li");
            li.innerHTML = erro;
            mensagemErro.appendChild(li);
        }
    } else {
        return entrar();
    }


function validaContato() {
    var erros = [];

        if (!email_usu.value ||
            (email_usu.value.search("@") == -1) ||
            (email_usu.value.search(".") == -1) ||
            (email_usu.value.search(" ") >= '')) {
            erros.push("O formato do email é: usuario@dominio.com");
        }

        if (!senha_usu.value) {
            erros.push("Preencher senha!");
        }

        return erros;

    }
}