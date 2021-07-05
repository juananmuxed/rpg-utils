# ⚔️ RPG Utils
__Utilities to RPG Masters/Users__

[![npm (scoped)](https://img.shields.io/npm/v/@muxed/rpg-utils.svg?label=NPM)](https://www.npmjs.com/package/@muxed/rpg-utils) [![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@muxed/rpg-utils?label=Size)](https://www.npmjs.com/package/@muxed/rpg-utils) [![License](https://img.shields.io/github/license/juananmuxed/rpg-utils?label=License)](LICENSE) 

[![Discord](https://img.shields.io/discord/324463341819133953?color=purple&label=Discord&logo=discord)](https://discord.gg/88rzwfU) 

## 🥪 Install
```shell
$ npm install @muxed/rpg-utils
```

## 🎉 Usage

Import the instaled Package
```ts
import { Dice, Rolling, RollUtils } from '@muxed/rpg-utils'
```

Three classes is charged for create rolls. The `Dice` is just for 1 dice. The `Rolling` is for a Pool of dice rolls and `RollUtils` is for common functions.

### Dice
This class is constructed with a `new Dice()`. We can pass a parameter to create this dice `new Dice(10,6)`. First parameter is the Faces of the dice (6 by default), and the second is and optional roll start (for example a 3 for restart other launch previously).

This class have methods:
```ts
let dice = new Dice(10);

dice.lauch() // Return a random number between 1 and 10 (the Faces)
dice.asyncLaunch() // Return a Promise
dice.asyncLaunch()
.then(res => {
  console.log(res);
})
.catch(err => {
  console.log(err);
});
dice.modificateRoll(3); // Add modificators to the roll, we can pass a Min or Max to the modified roll
dice.checkSuccess(8); // Check if the roll is Success up to or down to (the second param accept a true for check down) the number passed

// We can pass a modification before
dice.launch(-3,1) // This launch a 1d10 with a -3 to the result and a minimun of 1
// Async work in the same way

// We can access to the Roll and Faces and set it
dice.faces = 20;
dice.roll = 9;
console.log(dice.faces); // 20
console.log(dice.roll); // 9
```

### Rolling
This class is constructed with a `new Rolling()`. We can pass a parameter to create this pool `new Rolling(20,10)`. First parameter is the Faces of the dice (6 by default), and the second is the number of dices (1 by default).

This class have methods:
```ts
let pool = new Rolling(10,4);

pool.rollDices() // Return an Array(4) of random number between 1 and 10 (the Faces)
pool.rollDicesAsync() // Return a Promise
pool.addNewRolls(3); // Add 3 new rolls to the pool
pool.addNewRollsAsync(4); // Async add 3 new rolls to the pool
pool.modifyRoll(3,1); // Add modificators to the roll by index, we can pass a Min or Max to the modified roll
pool.modifyAllRolls(-4) // Add modificators to all rolls, we can pass a Min or Max to the modified roll
pool.sumRolls() // Return the sum of all pool
pool.checkAllSuccess(8); // Check if the rolls is Success up to or down to (the second param accept a true for check down) the number passed

// We can pass a modification before
pool.rollDices(-3,1) // This launch a 4d10 with a -3 to the result and a minimun of 1
// Async work in the same way

// We can access to the Rolls, Faces and number of Dices and set it
pool.faces = 6;
pool.rolls = [4, 4];
pool.dices = 20;
console.log(pool.faces); // 6
console.log(pool.rolls); // [4, 4]
console.log(pool.dices); // 20
```

### RollUtils
This class is constructed with a `new RollUtils()`.

This class have methods:
```ts
let utils = new RollUtils(10,4);

utils.headOrTails() // Return 'HEAD' or 'TAILS'
```

## 🟢 Testing
Install the Jest dependencies if not in global
```shell
$ npm install
```
Run the tests
```shell
$ npm test
```

## 🍰 Contributing

Please read [CONTRIBUTING](CONTRIBUTING.md) for details on our [CODE OF CONDUCT](CODE_OF_CONDUCT.md), and the process for submitting pull requests.

## ☕️ Buy Me a Coffee
[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/U7U21M2BE)

## 📑 License

MIT © [MuXeD](LICENSE)

<div align="center">
  <p>
    <sub>⌨️ with ❤︎ by
      <a href="https://github.com/juananmuxed">MuXeD</a>
    </sub>
  </p>
</div>