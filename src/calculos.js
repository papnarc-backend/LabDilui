/* A regra química fica separada da interface para facilitar testes e estudo. */
(function (global) {
  'use strict';

  // Aceita 0,1 ou 0.1. Separadores de milhar não são aceitos.
  function lerDecimal(valor) {
    if (typeof valor === 'number') return Number.isFinite(valor) ? valor : NaN;
    if (typeof valor !== 'string') return NaN;
    const texto = valor.trim();
    if (!/^(?:\d+(?:[.,]\d+)?|[.,]\d+)$/.test(texto)) return NaN;
    return Number(texto.replace(',', '.'));
  }

  function calcularDiluicao(entradas) {
    const campos = [
      ['cInicial', 'concentração inicial'],
      ['cFinal', 'concentração final'],
      ['vFinal', 'volume final']
    ];
    const valores = {};
    for (const [campo, nome] of campos) {
      const numero = lerDecimal(entradas[campo]);
      if (!Number.isFinite(numero) || numero <= 0) {
        return { ok: false, campo, erro: `Informe um número positivo para ${nome}.` };
      }
      valores[campo] = numero;
    }

    if (valores.cFinal > valores.cInicial) {
      return { ok: false, campo: 'cFinal', erro: 'Em uma diluição, a concentração final deve ser menor ou igual à inicial.' };
    }
    if (!['mL', 'L'].includes(entradas.unidade)) {
      return { ok: false, campo: 'unidade', erro: 'Escolha mL ou L para o volume.' };
    }

    // V1 = C2 * V2 / C1. Dividir primeiro reduz o risco de overflow.
    // Como C1 e C2 têm a mesma unidade, V1 terá a unidade de V2.
    const vInicial = (valores.cFinal / valores.cInicial) * valores.vFinal;
    if (!Number.isFinite(vInicial) || vInicial <= 0) {
      return { ok: false, campo: 'vFinal', erro: 'Os valores ultrapassam a precisão numérica disponível. Use valores menores ou menos extremos.' };
    }

    return {
      ok: true,
      ...valores,
      vInicial,
      unidade: entradas.unidade,
      semReducao: valores.cFinal === valores.cInicial
    };
  }

  function formatarNumero(numero) {
    // Evita apresentar um valor pequeno como zero apenas por arredondamento.
    if (numero !== 0 && (Math.abs(numero) < 0.000001 || Math.abs(numero) >= 1000000000)) {
      return numero.toExponential(5).replace('.', ',');
    }
    return numero.toLocaleString('pt-BR', { maximumSignificantDigits: 6 });
  }

  const api = { lerDecimal, calcularDiluicao, formatarNumero };
  // O mesmo arquivo pode ser usado no navegador e nos testes do Node.js.
  if (typeof module === 'object' && module.exports) module.exports = api;
  else global.LabDilui = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
