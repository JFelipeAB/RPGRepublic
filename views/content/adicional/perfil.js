$(document).ready(function () {
    perfil.configFIcha();
});

var perfil = function () {

    var configFIcha = function () {
        $('#imgIconeSelecionado').attr("src", usuario.icone);
        $('#lblFonteSelecionada').text("Fonte Selecionada: " + usuario.textoFonte);
        $('#lblFonteSelecionada').css("font-family", usuario.textoFonte);
        $('#lblFonteCorSelecionada').text("Cor da Fonte: " + usuario.textoCor);
        $('#iptCorSelecionada').val(usuario.textoCorN);
        $('#lblLogin').text(usuario.login);
        $('#lblNivel').text("Nível " + usuario.nivel + " XP: ");
        $('#lblEmail').text(usuario.eMail);
        $('#lblRank').text(usuario.acesso);
        $('#lblMoedas').text(usuario.moeda);
        let contador = 0;
        usuario.listaIten.forEach(iten => {
            //debugger;
            switch (iten.tipo) {
                case 'icone':
                    $('#divIcones').append(`<img id="Icone${contador}" src="${iten.descricao}` +
                        `" width="200px" onclick="perfil.selecionarItem('${iten.tipo}', ${contador})">`);
                    break;
                case 'FontFamily':
                    $('#divFontes').append(`<div onclick="perfil.selecionarItem('${iten.tipo}',${contador})">` +
                        `<div id="Icone${contador}" "width="200px"> Fonte: ${iten.descricao} </div></div>`);
                    $('#Icone' + contador).css("font-family", iten.descricao);
                    break;
                case 'FontColor':
                    $('#divCorTexto').append(`<div onclick="perfil.selecionarItem('${iten.tipo}',${contador})">` +
                        `Cor de texto:${iten.descricao}<input disabled id="Icone${contador}" type="color" ` +
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
                usuario.icone = usuario.listaIten[index].descricao;
                $('#imgIconeSelecionado').attr("src", usuario.icone);
                $('#imgIconMenu').attr("src", usuario.icone);                
                break;
            case 'FontFamily':
                usuario.textoFonte = usuario.listaIten[index].descricao
                $('#lblFonteSelecionada').text("Fonte Selecionada: " + usuario.textoFonte);
                $('#lblFonteSelecionada').css("font-family", usuario.textoFonte);                
                break;
            case 'FontColor':
                usuario.textoCor = usuario.listaIten[index].descricao;
                usuario.textoCorN = usuario.listaIten[index].cor;
                $('#lblFonteCorSelecionada').text("Cor da Fonte: " + usuario.textoCor);
                $('#iptCorSelecionada').val(usuario.textoCorN);
                break;
            case 'moeda':
                break;
            default:
                alert(`Erro, contate o administrador! tipo de item não cadastrado: ${iten.tipo}.`);
        };
        salvarUsuarioCompleto();
    };

    return {
        configFIcha: configFIcha,
        selecionarItem: selecionarItem,
        salvarUsuarioCompleto: salvarUsuarioCompleto
    };

}();
