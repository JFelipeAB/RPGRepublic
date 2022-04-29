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
                    $("#divIcones").on("click", perfil.confirmarSelecionarItem(iten.tipo, "Icone" + contador));
                    break;
                case 'FontFamily':
                    $('#divFontes').append('<div id="Icone'+contador+'">Fonte: '+ iten.descricao+'</div>');
                    $('#Icone'+contador).css("font-family", iten.descricao );
                    $("#divFontes").on("click", perfil.confirmarSelecionarItem(iten.tipo, "Icone" + contador));
                    break;
                case 'FontColor':
                    $('#divCorTexto').append('Cor de texto: '+iten.descricao+' <input disabled id="Icone'+contador+'" type="color" value="'+iten.cor+'">');
                    $("#divCorTexto").on("click", perfil.confirmarSelecionarItem(iten.tipo, "Icone" + contador));
                    break;
                    case 'moeda':
                        break;
                default:
                    alert(`Erro, contate o administrador! tipo de item não cadastrado: ${iten.tipo}.`);
            };
            contador++;
        });
    };

    var confirmarSelecionarItem = function(tipo, index){
        if(!tipo || !index)
        {
            alert(`Erro, contate o administrador! tipo de item não encontrado!`);
            return;
        }
        var modal = new bootstrap.Modal($('#mdlConfirmarItem'), {
            keyboard: false
        });
        $("#btnModalConfirmar").on("click",perfil.selecionarItem(tipo, index));
        modal.show('slow'); 
    };

    var selecionarItem = function(tipo, index){
        switch (tipo) {
            case 'icone':
               console.log('mudar icone');
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
        confirmarSelecionarItem: confirmarSelecionarItem,
        selecionarItem: selecionarItem
    };

}();
