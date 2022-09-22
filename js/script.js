'use strict';

alert(`Игра заканчивается когда у одного из вас закончатся шарики.`);
const firstStep = prompt(`Первый ход сделает игрок или бот? ` +
`Введите "игрок" или "бот".`).toLowerCase();
const marblesGame = window.marblesGame();

marblesGame(firstStep);
