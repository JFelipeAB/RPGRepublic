$(document).ready(function () {
    perfil.configFIcha();
});

var perfil = function () {

    var configFIcha = function () {
        $('#imgIcone').attr("src", usuario.icone);
        $('#lblLogin').text(usuario.login);
        $('#lblNivel').text("Nível " + usuario.nivel + " XP: ");
        $('#lblEmail').text("E-mail: " + usuario.eMail);
        $('#lblRank').text("Rank: " + usuario.acesso);
        let contador = 0;
        usuario.listaIten.forEach(iten => {
            debugger;
            switch (iten.tipo) {
                case 'icone':
                    $('#divIcones').append(`<img id="Icone${contador}" src="${iten.descricao}` +
                    `" width="200px" onclick="perfil.selecionarItem('${iten.tipo}', ${contador})">`);                    
                    break;
                case 'FontFamily':
                    $('#divFontes').append(`<div id="Icone ${contador} "width="200px" ` +
                    `"onclick="perfil.selecionarItem('${iten.tipo}',${contador})"> Fonte: ${iten.descricao} </div>`);
                    $('#Icone' + contador).css("font-family", iten.descricao);
                    break;
                case 'FontColor':
                    $('#divCorTexto').append(`<div onclick="perfil.selecionarItem("${iten.tipo}",${contador})">`+
                     `Cor de texto:${iten.descricao}<input disabled id="Icone${contador}" type="color" `+
                     `value="${iten.cor}"width="200px"> </div>`);                    
                    break;
                case 'moeda':
                    break;
                default:
                    alert(`Erro, contate o administrador! tipo de item não cadastrado: ${iten.tipo}.`);
            };
            contador++;
        });
    };

    var salvarUsuarioCompleto = function () {
        $.ajax({
            url: "salvarUsuario",
            contentType: 'application/json',
            data: JSON.stringify(usuario),
            method: 'POST',
            async: true
        }).done(function (retorno) {
            if (retorno.error) alert(retorno.error);
            else {
                localStorage.removeItem('usuario');
                localStorage.setItem('usuario', JSON.stringify(retorno.usuario));
            }
        }).fail(function () {
            alert("Falha na conexão com servidor, suas ações não foram salvas!!");
        });
    };

    var selecionarItem = function (tipo, index) {
        debugger;
        if (!tipo) {
            alert(`Erro, contate o administrador! tipo de item não encontrado!`);
            return;
        }
        switch (tipo) {
            case 'icone':
                usuario.icone = usuario.listaIten[index].descricao
                $('#imgIcone').attr("src", usuario.icone);
                $('#imgIconMenu').attr("src", usuario.icone);
                salvarUsuarioCompleto();
                break;
            case 'FontFamily':
                console.log('mudar icone');
                break;
            case 'FontColor':
                console.log('mudar icone');
                break;
            case 'moeda':
                break;
            default:
                alert(`Erro, contate o administrador! tipo de item não cadastrado: ${iten.tipo}.`);
        };
    };

    return {
        configFIcha: configFIcha,
        selecionarItem: selecionarItem,
        salvarUsuarioCompleto: salvarUsuarioCompleto
    };

}();
