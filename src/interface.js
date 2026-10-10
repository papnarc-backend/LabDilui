/* Este arquivo lê o formulário e apresenta o resultado na página. */
(() => {
  'use strict';
  const { calcularDiluicao, formatarNumero } = window.LabDilui;
  const porId = id => document.getElementById(id);
  const campos = {
    cInicial: porId('c-inicial'),
    cFinal: porId('c-final'),
    vFinal: porId('v-final'),
    unidade: porId('volume-unit')
  };

  function atualizar() {
    Object.values(campos).forEach(campo => campo.removeAttribute('aria-invalid'));
    const entradas = Object.fromEntries(Object.entries(campos).map(([nome, campo]) => [nome, campo.value]));
    const resultado = calcularDiluicao(entradas);
    const erro = porId('error-message');

    if (!resultado.ok) {
      erro.textContent = resultado.erro;
      erro.hidden = false;
      porId('result').hidden = true;
      porId('invalid-result').hidden = false;
      campos[resultado.campo].setAttribute('aria-invalid', 'true');
      campos[resultado.campo].focus();
      return;
    }

    erro.hidden = true;
    erro.textContent = '';
    porId('result').hidden = false;
    porId('invalid-result').hidden = true;
    porId('result-value').textContent = formatarNumero(resultado.vInicial);
    porId('result-unit').textContent = resultado.unidade;
    porId('result-description').textContent = `De ${formatarNumero(resultado.cInicial)} mol/L para ${formatarNumero(resultado.cFinal)} mol/L, com volume final total de ${formatarNumero(resultado.vFinal)} ${resultado.unidade}.`;
    porId('calculation-step').textContent = `V₁ = (${formatarNumero(resultado.cFinal)} × ${formatarNumero(resultado.vFinal)}) ÷ ${formatarNumero(resultado.cInicial)} = ${formatarNumero(resultado.vInicial)} ${resultado.unidade}`;
    porId('result-note').textContent = resultado.semReducao
      ? 'As concentrações são iguais: não ocorre redução de concentração neste exemplo.'
      : 'A quantidade de matéria do soluto é conservada no modelo ideal.';
  }

  porId('dilution-form').addEventListener('submit', evento => {
    evento.preventDefault();
    atualizar();
  });
  porId('reset-example').addEventListener('click', () => {
    campos.cInicial.value = '1';
    campos.cFinal.value = '0,1';
    campos.vFinal.value = '100';
    campos.unidade.value = 'mL';
    atualizar();
  });
  atualizar();
})();
