$(document).ready(function () {
    perfil.configPefil();
    perfil.configFichas();
    perfil.configItens();
});

var perfil = function () {

    var configPefil = function () {
        $('#imgIconeSelecionado').attr("src", usuario.icone);
        $('#lblFonteSelecionada').text("Fonte Selecionada: " + usuario.textoFonte);
        $('#lblFonteSelecionada').css("font-family", usuario.textoFonte);
        $('#lblFonteCorSelecionada').text("Cor da Fonte: " + usuario.textoCor);
        $('#iptCorSelecionada').val(usuario.textoCorN);
        $('#lblLogin').text(usuario.login);
        $('#lblNivel').text("Nível " + usuario.nivel + " XP: ");
        $('#lblEmail').text("E-mail: " + usuario.eMail);
        $('#lblRank').text("Rank: " + usuario.acesso);
        $('#lblMoedas').text("Moedas: " + usuario.moeda);
    };

    var configItens = function () {
        let contador = 0;
        usuario.listaIten.forEach(iten => {
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

    var configFichas = function () {
        let contador = 0;
        usuario.listaFicha.forEach(ficha => {
            debugger;

            $('#divPersonagem').append(
                `<div onclick="perfil.mostrarFicha(${ contador++})" class="col-xl-6 col-lg-6 col-md-6 col-sm-12">` +
                `<div class="card" style="width: 18rem;">` +
                `<img src="${ficha.icone}" class="card-img-top" >` +
                `<div class="card-body">` +
                `<h5 class="card-title">${ficha.personagem}</h5>` +
                `<p class="card-text">Descrição: ${ficha.descricao}</p>` +
                `</div>` +
                `<ul class="list-group list-group-flush">`+
                `<li class="list-group-item">Raça: ${ficha.raca}</li>`+
                `<li class="list-group-item">Classe: ${ficha.classe}</li>`+
                `<li class="list-group-item">Ultima sala Usada: ${ficha.classe}</li>`+
                `</ul>`+
                `</div>` +
                `</div>`
            )
            contador++;
        });
    }

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

    var mostrarFicha = function(){

    };

    return {
        configItens: configItens,
        configPefil: configPefil,
        configFichas: configFichas,
        selecionarItem: selecionarItem,
        salvarUsuarioCompleto: salvarUsuarioCompleto,
        mostrarFicha: mostrarFicha
    };

}();
