const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const api = require('../src/calculos.js');

// Simulação dos elementos e eventos da página. Não testa a renderização visual.
function abrirPagina() {
  const html = fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
  const elementos = {};
  for (const match of html.matchAll(/<([a-z]+)\b([^>]*\bid="([^"]+)"[^>]*)>/g)) {
    const atributos = match[2];
    elementos[match[3]] = {
      value: atributos.match(/\bvalue="([^"]*)"/)?.[1] || '',
      hidden: /\bhidden\b/.test(atributos),
      textContent: '',
      atributos: {},
      eventos: {},
      addEventListener(nome,acao) { this.eventos[nome] = acao; },
      setAttribute(nome,valor) { this.atributos[nome] = valor; },
      removeAttribute(nome) { delete this.atributos[nome]; },
      focus() { this.focado = true; },
      acionar(nome) { this.eventos[nome]({preventDefault(){}}); }
    };
  }
  assert.ok(html.includes('<option value="mL">mL</option>'));
  elementos['volume-unit'].value = 'mL';
  const fonte = fs.readFileSync(path.join(__dirname,'../src/interface.js'),'utf8');
  vm.runInNewContext(fonte,{window:{LabDilui:api},document:{getElementById:id=>elementos[id]}});
  return elementos;
}

test('interface apresenta o exemplo inicial ao carregar', () => {
  const pagina = abrirPagina();
  assert.equal(pagina['result-value'].textContent,'10');
  assert.equal(pagina['result-unit'].textContent,'mL');
  assert.equal(pagina.result.hidden,false);
  assert.equal(pagina['error-message'].hidden,true);
});
test('erro esconde resultado anterior e indica o campo incorreto', () => {
  const pagina = abrirPagina();
  pagina['c-final'].value = '2';
  pagina['dilution-form'].acionar('submit');
  assert.equal(pagina.result.hidden,true);
  assert.equal(pagina['invalid-result'].hidden,false);
  assert.equal(pagina['c-final'].atributos['aria-invalid'],'true');
  assert.equal(pagina['c-final'].focado,true);
  assert.ok(pagina['error-message'].textContent.includes('concentração final'));
});
test('correção e restauração atualizam os resultados e removem o erro', () => {
  const pagina = abrirPagina();
  pagina['c-final'].value = '2';
  pagina['dilution-form'].acionar('submit');
  pagina['c-final'].value = '0,1';
  pagina['v-final'].value = '0,1';
  pagina['volume-unit'].value = 'L';
  pagina['dilution-form'].acionar('submit');
  assert.equal(pagina['result-value'].textContent,'0,01');
  assert.equal(pagina['result-unit'].textContent,'L');
  assert.equal(pagina['error-message'].hidden,true);
  assert.equal(pagina['c-final'].atributos['aria-invalid'],undefined);
  pagina['reset-example'].acionar('click');
  assert.equal(pagina['result-value'].textContent,'10');
  assert.equal(pagina['result-unit'].textContent,'mL');
});
