const test = require('node:test');
const assert = require('node:assert/strict');
const { lerDecimal, calcularDiluicao, formatarNumero } = require('../src/calculos.js');
const exemplo = { cInicial:'1', cFinal:'0,1', vFinal:'100', unidade:'mL' };

test('aceita vírgula, ponto e espaços ao redor do número', () => {
  assert.equal(lerDecimal(' 0,25 '),0.25);
  assert.equal(lerDecimal('0.25'),0.25);
  assert.equal(lerDecimal('.25'),0.25);
});
test('calcula o exemplo de 1 mol/L para 0,1 mol/L em 100 mL', () => {
  const resultado = calcularDiluicao(exemplo);
  assert.equal(resultado.ok,true);
  assert.equal(resultado.vInicial,10);
  assert.equal(resultado.unidade,'mL');
});
test('conserva a relação C1V1 = C2V2 em diferentes entradas', () => {
  for (const valores of [[2,0.5,250],[0.4,0.02,1000],[3.5,0.17,375]]) {
    const [cInicial,cFinal,vFinal] = valores;
    const resultado = calcularDiluicao({cInicial,cFinal,vFinal,unidade:'mL'});
    assert.equal(resultado.ok,true);
    assert.ok(Math.abs(cInicial * resultado.vInicial - cFinal * vFinal) < 1e-9);
    assert.ok(resultado.vInicial <= vFinal);
  }
});
test('preserva a unidade de volume e mantém coerência entre L e mL', () => {
  const litros = calcularDiluicao({...exemplo,vFinal:'0,1',unidade:'L'});
  const mililitros = calcularDiluicao(exemplo);
  assert.equal(litros.unidade,'L');
  assert.ok(Math.abs(litros.vInicial * 1000 - mililitros.vInicial) < 1e-10);
});
test('concentrações iguais são identificadas como ausência de redução', () => {
  const resultado = calcularDiluicao({...exemplo,cFinal:'1'});
  assert.equal(resultado.semReducao,true);
  assert.equal(resultado.vInicial,100);
});
test('rejeita concentração final maior que inicial', () => {
  const resultado = calcularDiluicao({...exemplo,cFinal:'2'});
  assert.equal(resultado.ok,false);
  assert.equal(resultado.campo,'cFinal');
});
test('rejeita entradas vazias, negativas, zero, texto e infinitas', () => {
  for (const valor of ['', '-2', '0', 'abc', Infinity, NaN, null, '1,2,3']) {
    for (const campo of ['cInicial','cFinal','vFinal']) {
      const resultado = calcularDiluicao({...exemplo,[campo]:valor});
      assert.equal(resultado.ok,false,`${campo}: ${valor}`);
      assert.equal(resultado.campo,campo);
    }
  }
});
test('rejeita unidade não suportada', () => {
  const resultado = calcularDiluicao({...exemplo,unidade:'kg'});
  assert.equal(resultado.ok,false);
  assert.equal(resultado.campo,'unidade');
});
test('valor muito pequeno não aparece como zero por arredondamento', () => {
  const resultado = calcularDiluicao({...exemplo,cFinal:0.00000001,vFinal:1});
  assert.equal(resultado.ok,true);
  assert.notEqual(formatarNumero(resultado.vInicial),'0');
  assert.ok(formatarNumero(resultado.vInicial).includes('e-'));
});
test('retorna erro quando os valores geram underflow', () => {
  const resultado = calcularDiluicao({cInicial:1e308,cFinal:1e-308,vFinal:1,unidade:'mL'});
  assert.equal(resultado.ok,false);
});
test('calcula entradas grandes sem overflow intermediário evitável', () => {
  const resultado = calcularDiluicao({cInicial:1e308,cFinal:1e308,vFinal:1e308,unidade:'mL'});
  assert.equal(resultado.ok,true);
  assert.equal(resultado.vInicial,1e308);
});
