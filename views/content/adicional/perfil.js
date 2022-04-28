$(document).ready(function () {
    perfil.configFIcha();
});

var perfil = function () {

    var configFIcha = function () {
        debugger;
        $('#imgIcone').attr("src", usuario.icon);
        $('#lblLogin').text(usuario.login);
        $('#lblNivel').text("Nível " + usuario.nivel + " XP: ");
        $('#lblEmail').text("E-mail: " + usuario.eMail);
        $('#lblRank').text("Rank: " + usuario.acesso);
        let contador = 0;
        usuario.listaIten.forEach(iten => {

            switch (iten.tipo) {
                case 'icone':
                    $('#divIcones').append(' <img id="Icone'+contador +'" src="'+ iten.descricao +'" width="200px">');
                    break;
                case 'FontFamily':
                    $('#divFontes').append('<div id="Icone'+contador+'">Fonte: '+ iten.descricao+'</div>');
                    $('#Icone'+contador).css("font-family", iten.descricao );
                    break;
                case 'FontColor':
                    $('#divCorTexto').append('Cor de texto: '+iten.descricao+' <input disabled id="Icone'+contador+'" type="color" value="'+iten.cor+'">');
                    break;
                    case 'moeda':
                        break;
                default:
                    alert(`Erro, contate o administrador! tipo de item não cadastrado: ${iten.tipo}.`);
            };
            contador++;
        });
    };

    return {
        configFIcha: configFIcha,
    }

}();
