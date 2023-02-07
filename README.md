# ⚔️ RPG Utils
__Utilities to RPG Masters/Users__

[![npm (scoped)](https://img.shields.io/npm/v/@muxed/rpg-utils.svg?label=NPM)](https://www.npmjs.com/package/@muxed/rpg-utils) [![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@muxed/rpg-utils?label=Size)](https://www.npmjs.com/package/@muxed/rpg-utils) [![License](https://img.shields.io/github/license/juananmuxed/rpg-utils?label=License)](LICENSE) ![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/juananmuxed/rpg-utils/publish.yml?label=Workflow)

[![Discord](https://img.shields.io/discord/324463341819133953?color=purple&label=Discord&logo=discord)](https://discord.gg/88rzwfU) 

## 🥪 Install
```shell
$ npm install @muxed/rpg-utils
```

## 🎉 Usage

Import the instaled Package
```ts
import { RpgUtils } from '@muxed/rpg-utils'
```

### 🎲 Rolling
This class is constructed with a `new RpgUtils()`. We can pass a parameter to create this pool `new RpgUtils(20)`. The parameter is the Faces of the dice (6 by default).

This class have methods:
```ts
let pool = new RpgUtils(10);

pool.cleanPoolOfDices(); // Clean a saved dices in the class

pool.rollDices(4) // Return an Array(4) of random number between 1 and 10 (the Faces)
pool.rollDicesAsync(6) // Return a Promise of Array<numbers>

pool.addNewRolls(3); // Add 3 new rolls to the pool 
pool.addNewRolls(3,20); // Add 3 new rolls of 20 faces to the pool 

pool.sumRolls() // Return the sum of all pool

pool.modifyRoll(3); // Add modifications to the rolls

pool.setCritical(10); // Set the critical hit
pool.setFailure(10); // Set the failure hit

/* ADVANCED */ 
pool.headOrTails(4); // Check a Coin flip (4 times)

pool.checkSuccess(8); // Check if the rolls is Success
pool.checkSuccess(4, 2, true) // Check if roll is success with 2 dices and down success

// We can access to the Faces and number of Dices and set it
pool.faces = 6;
console.log(pool.faces); // 6

// TS support interfaces Dice and ResponseRoll

import { Dice } from '@muxed/rpg-utils'
const dices: Array<Dice> = [];
```

__Structure of a Dice__
```ts
{
  faces: number,
  roll: number,
  rollModified: number,
  modificator?: number,
  critical?: number,
  failure?:number,
  min: number,
  max: number
}
```

__Structure of a Response for Advanced rolls__
```ts
{
  rolls: Array<number | string | undefined>,
  modifiedRolls?: Array<number | string | undefined>,
  success:string,
  countSuccess: number,
  countFail: number,
  countCritical?: number,
  countFailure?: number
}
```

## 🟢 Testing
Install the Jest dependencies if not in global
```shell
$ npm install
```
Run the tests
```shell
$ npm test
$ npm run coverage
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