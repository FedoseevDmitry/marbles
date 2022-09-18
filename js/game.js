/* eslint-disable require-jsdoc */
'use strict';

(() => {
  function getBotGuess() {
    return Math.floor(Math.random() * 2 + 1);
  }

  function checkOdd(bid) {
    if (bid % 2 === 0) {
      return 2;
    } return 1;
  }

  function showWin(winRound) {
    if (winRound === 'player') {
      return alert(`Вы выиграли и забираете шарики.`);
    } else return alert(`Бот выиграл и забирает шарики.`);
  }

  function win(winGame, playerBalls, botBalls) {
    if (winGame === 'player') {
      return alert(`Вы выиграли! У бота закончились шарики.`);
    } else {
      return alert(`Бот выиграл! У вас закончились шарики.`);
    }
  }

  // Получение ввода пользователя
  const getPlayerBid = ballsCount => {
    const playerBid = parseInt(prompt(`У тебя ${ballsCount} шариков. ` +
    `Сколько ставка?`));

    // Проверки ввода
    if (playerBid < 1 || playerBid > ballsCount) {
      alert(`Укажите корректную ставку!`);
      return getPlayerBid(ballsCount);
    } if (Number.isNaN(playerBid)) {
      alert(`Укажите значение числом!`);
    } if (playerBid === null) {
      return -1;
    } else return playerBid;
  };

  const getPlayerStep = () => {
    const playerStep = prompt('Цифра четная?').toLowerCase();
    if (playerStep === 'да' || playerStep === 'нет') {
      return playerStep === 'да' ? 2 : 1;
    } else {
      alert('Введите "да" или "нет".');
      return getPlayerStep();
    }
  };

  // Запуск игры
  const runGame = () => {
    // Стартовое значения
    let bid = null;
    let odd = null;
    let guess = null;

    const balls = {
      playerBalls: 5,
      botBalls: 5,
    };
    // Основной функционал
    return function startGame(firstStep) {
      bid = firstStep === 'игрок' ? getPlayerBid(balls.playerBalls) :
        Math.floor(Math.random() * (balls.botBalls)) + 1;
      console.log(`Ставка: ${bid}`);
      odd = checkOdd(bid);
      console.log(`Значение четности: ${odd} 2 - ч, 1 - н`);
      guess = firstStep === 'игрок' ? getBotGuess() : getPlayerStep();
      console.log(`Четное или нет: ${guess} 2 - ч, 1 - н`);
      console.log(`Ставка: ${bid}\n Четная ставка? ${odd}\n
      Отгадывание: ${guess}`);
      // Проверка победы бота или игрока
      if ((odd !== guess && firstStep === 'игрок') || (odd === guess &&
        firstStep === 'бот')) {
        // Победа игрока
        const winRound = 'player';
        showWin(winRound);
        balls.playerBalls += bid;
        balls.botBalls -= bid;
      } else {
        // Победа бота
        const winRound = 'bot';
        showWin(winRound);
        balls.playerBalls -= bid;
        balls.botBalls += bid;
      }

      // Передача хода
      if (firstStep === 'игрок') {
        firstStep = 'бот';
      } else {
        firstStep = 'игрок';
      }

      if (balls.playerBalls > 0 && balls.botBalls > 0) {
        // Запускаем цикл вновь
        alert(`У вас: ${balls.playerBalls} шариков, ` +
        `у бота: ${balls.botBalls} шариков.`);
        return startGame(firstStep);
      } else {
        // Игра закончилась
        if (balls.playerBalls <= 0) {
          const winGame = 'bot';
          win(winGame, balls.playerBalls, balls.botBalls);
        } else {
          const winGame = 'player';
          win(winGame, balls.playerBalls, balls.botBalls);
        }
      }
    };
  };
  window.marblesGame = runGame;
})();
