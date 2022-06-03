$(document).ready(function () {
    loja.configPefil();
});

var loja = function () {

    var configPefil = function () {
        $('#lblRank').text(usuario.acesso);
        $('#lblMoedas').text("💰 " + usuario.moeda);
        $('#lblBaus').text("📦 " + usuario.qtdeBaus);
        $('#lblSloteFichas').text(usuario.qtdeFichas);
    };

    var adquirir = function (objeto) {
        switch (objeto) {
            case 'ouro':               
                $("#divModalTamanho").addClass("modal-lg");
                $("#divModalAdquirir").html(
                    `<h2> Passe Ouro R$ 14,99</h2>` +
                    `<br>` +
                    `<p>` +
                    `<h5>Compre o Passe de Ouro para ter benefícios como:<br><br>` +
                    `-Sem nenhum anúncio! <br>` +
                    `-Loja especial com 50% off!</h5><br>` +
                    `*Ao final da temporada os jogares votam ao passe Bronze.` +
                    `</p>`
                );
                break;
            case 'prata':                
                $("#divModalTamanho").addClass("modal-lg");
                $("#divModalAdquirir").html(
                    `<h2> Passe Prata R$ 9,99</h2>` +
                    `<br>` +
                    `<p>` +
                    `<h5>Compre o Passe de Prata para ter benefícios como:<br><br>` +
                    `-Sempre que ganhar ou comprar um Bau receberá em dobro! <br>` +
                    `-Sempre que ganhar ou comprar um Slot de Ficha receberá em dobro!</h5><br>` +
                    `*Ao final da temporada os jogares votam ao passe Bronze.` +
                    `</p>`
                );
                break;
            case 'moeda':
                $("#divModalTamanho").removeClass("modal-lg");                
                $("#divModalAdquirir").html(
                    `<h1> 50 moedas</h1>` +
                    `<h1> R$ 1,99</h1>`
                );
                break;
            case 'sacoMoeda':
                $("#divModalTamanho").removeClass("modal-lg");                
                $("#divModalAdquirir").html(
                    `<h1> 200 moedas</h1>` +
                    `<h1> R$ 4,99</h1>`
                );
                break;
            default:
                $("#divModalTamanho").removeClass("modal-lg");    
                $("#divModalAdquirir").html(
                    `<h1> Saco de ouro</h1>` +
                    `<h1> R$ 4,99</h1>`
                );
        };

        var modal = new bootstrap.Modal($('#mdlaquirirPasseOuro'), {
            keyboard: false
        });
        modal.show('slow');
    };

    var comprar = function (objeto) {
        var modal = new bootstrap.Modal($('#mdlcomprarSloteFicha'), {
            keyboard: false
        });
        modal.show('slow');
    };
    return {
        adquirir: adquirir,
        comprar: comprar,
        configPefil: configPefil,
    };
}();