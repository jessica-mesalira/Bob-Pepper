// Tal função executa e exibe o calculo de valor mensal do produto.
function mensal() {
    var valormq = Number(valorteste.value);
    var valor_mensal = valormq * 10;
    mostrareais.innerHTML = `O valor total é de: R$${valor_mensal.toFixed(2)}`;

}
// Tal função executa e exibe o calculo de valor semestral do produto.
function semestral() {
    var valormq = Number(valorteste.value);
    var valor_semestral = valormq * 60;
    var valor_semestraldesc = (valor_semestral) - valor_semestral*0.15;
    mostrareais.innerHTML = `O valor total é de: R$${valor_semestral.toFixed(2)}. E com 15% de desconto fica: R$${valor_semestraldesc.toFixed(2)}`;
}
// Tal função executa e exibe o calculo de valor anual do produto.
function anual() {
    var valormq = Number(valorteste.value);
    var valor_anual = valormq * 120;
    var valor_anualdesc = (valor_anual) - valor_anual*0.25;
    mostrareais.innerHTML = `O valor total é de: R$${valor_anual.toFixed(2)}. E com 25% de desconto fica: R$${valor_anualdesc.toFixed(2)}`;
}