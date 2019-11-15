const container = document.querySelector('.container');

for (let i = 0; i < 3; i++) {
  const row = document.createElement('h1');

  for (let j = 0; j < 2; j++) {
    const text = document.createElement('span');
    text.innerText = 'Coucou ';

    row.appendChild(text);
  }

  container.appendChild(row);
}
