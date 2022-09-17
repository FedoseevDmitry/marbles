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

  function showPlayerWin() {
    alert(`Вы выиграли и забираете шарики.`);
  }

  function showBotWin() {
    alert(`Бот выиграл и забирает шарики.`);
  }

  function playerWin() {
    alert(`Вы выиграли!`);
  }

  function botWin() {
    alert(`Бот выиграл!`);
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
  const runGame = (firstStep) => {
    // Стартовое количество
    const balls = {
      playerBalls: 5,
      botBalls: 5,
    };
    const bid = {
      2: 'четное',
      1: 'нечетное',
    };
    // Ссновной функционал
    return function startGame(firstStep) {
      if (firstStep === 'игрок') {
        const playerBid = getPlayerBid(balls.playerBalls);
        console.log(playerBid);
        const odd = checkOdd(playerBid);
        console.log(`Ставка ${playerBid}, ${odd}`);
        const botGuess = getBotGuess();
        console.log('Бот говорит: ', bid[botGuess]);
        // Проверка победы бота или игрока
        if (botGuess === checkOdd) {
          // Победа бота
          showBotWin();
          balls.playerBalls -= playerBid;
          balls.botBalls += playerBid;
        } else {
          // Победа игрока
          showPlayerWin();
          balls.playerBalls += playerBid;
          balls.botBalls -= playerBid;
        }
        // ход бота
        firstStep = 'бот';
      } else if (firstStep === 'бот') {
        const botBid = Math.floor(Math.random() * (balls.botBalls)) + 1;
        const odd = checkOdd(botBid);
        console.log(`Ставка ${botBid}, ${odd}`);
        const playerStep = getPlayerStep();
        console.log('Игрок говорит: ', bid[playerStep]);
        if (playerStep === odd) {
          // Победа игрока
          showPlayerWin();
          balls.playerBalls += botBid;
          balls.botBalls -= botBid;
        } else {
          // Победа бота
          showBotWin();
          balls.playerBalls -= botBid;
          balls.botBalls += botBid;
        }
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
          botWin();
        } else {
          playerWin();
          alert(`У вас: ${balls.playerBalls} шариков, ` +
          `у бота ${balls.botBalls} шариков.`);
        }
      }
    };
  };
  window.marblesGame = runGame;
})();
