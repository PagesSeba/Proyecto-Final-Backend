function randomNumbers(cant) {
  const numeros = [];
  const min = 1;
  const max = 1000;
  for (let i = 0; i < cant; i++) {
    const numero = { nº: Math.floor(Math.random() * (max - min) + min) };
    numeros.push(numero);
  }
  return numeros;
}

process.on("message", (passCant) => {
  if (passCant.length > 0) {
    process.send(randomNumbers(passCant));
  }
});

export default randomNumbers;