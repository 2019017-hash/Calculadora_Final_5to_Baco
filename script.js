const display = document.getElementById('calc-display');

function appendValue(value) {
  const current = display.value;

  // Evitar operadores dobles al inicio o consecutivos
  const operators = ['+', '-', '*', '/'];
  const lastChar = current.slice(-1);

  if (operators.includes(value) && operators.includes(lastChar)) {
    // Reemplazar el último operador por el nuevo
    display.value = current.slice(0, -1) + value;
    return;
  }

  if (operators.includes(value) && current === '') {
    // No permitir empezar con operador (excepto el menos para negativos)
    if (value !== '-') return;
  }

  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function calculate() {
  try {
    const expression = display.value;

    if (expression === '') return;

    // Reemplazar × y ÷ por * y / por si el usuario los ve en pantalla
    const sanitized = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/');

    // Evaluar la expresión de forma segura
    const result = Function('"use strict"; return (' + sanitized + ')')();

    if (!isFinite(result)) {
      display.value = 'Error';
      return;
    }

    // Mostrar resultado, limitar decimales largos
    display.value = parseFloat(result.toFixed(10)).toString();
  } catch (e) {
    display.value = 'Error';
  }
}

// Soporte de teclado
document.addEventListener('keydown', (e) => {
  const allowed = ['0','1','2','3','4','5','6','7','8','9','+','-','*','/'];

  if (allowed.includes(e.key)) {
    appendValue(e.key);
  } else if (e.key === 'Enter' || e.key === '=') {
    calculate();
  } else if (e.key === 'Backspace') {
    display.value = display.value.slice(0, -1);
  } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
    clearDisplay();
  }
});
