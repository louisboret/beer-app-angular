import { Component, ElementRef, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
import { FruitCollection } from 'src/app/models/fruitBonanza';

@Component({
  selector: 'app-fruit-bonanza',
  templateUrl: './fruit-bonanza.component.html',
  styleUrls: ['./fruit-bonanza.component.css'],
  animations: [
    trigger('winningSymbols', [
      state('won', style({ height: 0, width: 0 })),
      transition('* => won', [
        animate('2s', keyframes([
          style({ height: 100, width: 100, offset: 0 }),
          style({ height: 110, width: 110, offset: 0.2 }),
          style({ transform: 'rotate(15deg)', offset: 0.35 }),
          style({ transform: 'rotate(-15deg)', offset: 0.5 }),
          style({ transform: 'rotate(0)', offset: 0.65 }),
          style({ height: 0, width: 0, offset: 1.0 })
        ]))
      ]),
    ]),
    trigger('bonusMessage', [
      state('show', style({})),
      transition('* => show', [
        animate('2s', keyframes([
          style({ transform: 'scale(1, 1)', offset: 0.0 }),
          style({ transform: 'scale(1.25, 1.25)', offset: 0.25 }),
          style({ transform: 'scale(1.1, 1.1)', offset: 0.5 }),
          style({ transform: 'scale(1.25, 1.25)', offset: 0.75 }),
          style({ transform: 'scale(1, 1)', offset: 1.0 })
        ]))
      ]),
    ]),
    trigger('bonusSymbols', [
      state('bonus', style({ height: 100, width: 100 })),
      transition('* => bonus', [
        animate('1s', keyframes([
          style({ height: 100, width: 100, offset: 0 }),
          style({ height: 115, width: 115, offset: 0.4 }),
          style({ transform: 'rotate(15deg)', offset: 0.6 }),
          style({ transform: 'rotate(-15deg)', offset: 0.8 }),
          style({ transform: 'rotate(0)', offset: 1 })
        ]))
      ]),
    ]),
    trigger('newSymbols', [
      state('new', style({})),
      transition('* => new', [
        animate('1s', keyframes([
          style({ height: 0, width: 0 }),
          style({ height: 100, width: 100 }),
        ]))
      ]),
    ]),
  ],
})


export class FruitBonanzaComponent implements OnInit {
  collection: FruitCollection[] = [];
  images = '/assets/images/';
  winningClass = '';
  bonusClass = '';
  winImage = '';
  imageValue = 0;
  imageCount = 0;
  imagetotal = 0;
  credit = 15000;
  bet = 100;
  totalWin = 0;
  disableSpin = false;
  takebet = false;
  pageTitle = 'Fruit bonanza';
  freeSpins = 0;
  multiplier = 1;
  isBonus = false;
  showBonusMessage = false;
  totalBonusWin = 0;
  totalBonusSpins = 0;
  bonusEnded = false;
  bonusbuy = 0;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.spin();
    this.checkBet();
    this.bonusbuy = this.bet * 100;
  }

  async spin(): Promise<any> {
    this.totalWin = 0;
    this.disableSpin = false;
    this.winningClass = '';
    this.winImage = '';
    this.bonusClass = '';

    this.fillCollection();

    if (this.takebet) {
      await this.checkWin();
    }

    this.takebet = true;
    await this.checkBet();

    await this.checkBonus();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  checkBet(): void {
    if (!this.showBonusMessage) {
      if (!this.isBonus) {
        this.bet <= this.credit ? this.disableSpin = false : this.disableSpin = true;

      }
    }
  }

  calculateWin(i: number, newcol: FruitCollection[]) {
    let subTotal = 0;


    if (i === 7) {
      subTotal = newcol.length * (i * 1.5) * (this.bet / 50)
    }
    else if (i === 10) {
      return;
    }
    else {
      subTotal = newcol.length * (i * 1.5) * (this.bet / 100)
    }

    this.imagetotal = subTotal;
    this.totalWin += this.imagetotal;
    this.imageValue = subTotal / newcol.length;
  }

  fillCollection() {
    this.collection = [];
    let rnd = 0;
    for (let i = 0; i < 30; i++) {
      rnd = this.generateRandom();

      let img = `${this.images}gamba${rnd}.png`;
      this.collection.push({ source: img, class: `g${rnd}`, isNew: false });
    }
  }

  generateRandom(): number {
    let amount = 0;
    let bonusChance = 0;

    this.isBonus ? amount = 6 : amount = 5;
    this.isBonus ? bonusChance = 15 : bonusChance = 8;

    let rnd = (Math.floor(Math.random() * 9)) + amount;
    if (rnd === 10) {
      let rnd2 = (Math.floor(Math.random() * bonusChance));
      if (rnd2 !== 1) {
        rnd = (Math.floor(Math.random() * 9)) + 5;
      }
    }
    if (rnd === 14) {
      let rnd2 = (Math.floor(Math.random() * 11));
      if (rnd2 === 1) {
        rnd = (Math.floor(Math.random() * 3)) + 1;
      }
      else {
        rnd = (Math.floor(Math.random() * 9)) + 5;
      }
    }

    return rnd;
  }

  spliceCollection(indexes: number[]) {
    this.winningClass = '';
    indexes.forEach((el) => {
      let r = this.generateRandom();
      this.collection.splice(el, 1, { source: `${this.images}gamba${r}.png`, class: `g${r}`, isNew: true });
    });
  }

  async checkBonus() {
    if (this.isBonus) {

      if (this.freeSpins === 0) {

        this.bonusEnded = true;
        this.disableSpin = true;
        await this.delay(2050);
      }
      else {
        this.bonusEnded = false;

      }
    }
    this.freeSpins === 0 ? this.isBonus = false : this.isBonus = true;

    if (!this.isBonus) {
      this.pageTitle = 'Fruit Bonanza';
      this.multiplier = 1;
    }
  }

  async setupBonusGame() {
    this.bonusClass = 'g10';
    this.pageTitle = 'Bonus';
    this.delay(1050);
  }

  async bonusBonusBonus() {
    let bonusArray = this.collection.filter(img => img.source === `${this.images}gamba10.png`);

    if (this.isBonus) {
      if (bonusArray.length >= 3) {
        this.disableSpin = true;
        await this.setupBonusGame();
        let extraspins = 0;
        if (bonusArray.length === 3) {
          extraspins = 3;
        }
        else {
          bonusArray.length > 4 ? extraspins = 8 : extraspins = 5;
        }
        this.totalBonusSpins += extraspins;
        this.freeSpins += extraspins;
        setTimeout(() => {
          this.disableSpin = false;

        }, 1050);
      }
    }
    else {
      this.totalBonusWin = 0;
      if (bonusArray.length >= 4) {

        this.disableSpin = true;
        await this.setupBonusGame();
        await this.delay(1000);
        this.showBonusMessage = true;
        if (bonusArray.length === 4) {
          this.freeSpins = 10;
        }
        else {
          bonusArray.length > 5 ? this.freeSpins = 20 : this.freeSpins = 15;
        }
        this.totalBonusSpins = this.freeSpins;
      }
    }
  }

  async buyBonus() {
    this.totalBonusWin = 0;
    if (this.credit >= this.bonusbuy) {
      this.credit -= this.bonusbuy;
      this.disableSpin = true;
      await this.setupBonusGame();
      await this.delay(1000);
      this.showBonusMessage = true;
      this.freeSpins = 10;
      this.totalBonusSpins = this.freeSpins;
      this.checkBonus();
    }
  }

  hideBonusMessage() {
    this.showBonusMessage = false;
    this.disableSpin = false;
  }

  hideBonusEndedMessage() {
    this.bonusEnded = false;
    this.disableSpin = false;
  }

  async checkMultiplier() {

    if (this.totalWin > 0) {
      for (let i = 1; i < 4; i++) {
        let multiplierArray = this.collection.filter(img => img.source === `${this.images}gamba${i}.png`);
        if (multiplierArray.length > 0) {
          this.disableSpin = true;
          this.bonusClass = `g${i}`;
          await this.delay(1050);

          if (i === 1) {
            this.multiplier += (2 * multiplierArray.length);
          }
          else {
            i === 2 ? this.multiplier += (3 * multiplierArray.length) : this.multiplier += (5 * multiplierArray.length);
          }
          setTimeout(() => {

            this.disableSpin = false;
          }, 1050);
        }
      }
    }
  }

  async checkWin(): Promise<any> {

    !this.isBonus ? this.credit -= this.bet : this.freeSpins--;

    for (let i = 5; i < 14; i++) {
      let currentImg = `${this.images}gamba${i}.png`;
      let newcol = this.collection.filter(img => img.source === currentImg);
      if (newcol.length >= 8) {
        this.disableSpin = true;
        this.imageCount = newcol.length;
        this.winningClass = `g${i}`;
        this.winImage = `${this.images}gamba${i}.png`;
        let lastIndex = -1;
        let indexes: number[] = [];

        newcol.forEach((el) => {
          let index = this.collection.findIndex((el, index) => el.source === currentImg && index > lastIndex);
          indexes.push(index);
          lastIndex = index;
        });

        this.calculateWin(i, newcol);

        await this.delay(2050);

        this.spliceCollection(indexes);

        await this.delay(1050);

        i = 4;
        this.disableSpin = false;

      }
    }
    if (this.isBonus) {
      await this.checkMultiplier();
      this.totalWin *= this.multiplier;
      this.totalBonusWin += this.totalWin;
    }
    this.credit += this.totalWin;

    await this.bonusBonusBonus();


  }
}
