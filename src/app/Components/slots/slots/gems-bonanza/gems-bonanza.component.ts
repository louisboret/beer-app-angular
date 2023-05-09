import { Component } from '@angular/core';
import { Gem } from 'src/app/models/gem';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
import { col } from 'sequelize';
import { log } from 'console';
import { last } from 'rxjs';

@Component({
  selector: 'app-gems-bonanza',
  templateUrl: './gems-bonanza.component.html',
  styleUrls: ['./gems-bonanza.component.css'],
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
    trigger('bounceIn5', [
      state('bounce5', style({ height: 100, width: 100, opacity: 1 })),
      transition('* => bounce5', [
        animate('.05s', keyframes([
          style({ transform: 'translateY(-525px)', offset: 0 }),
          style({ transform: 'translateY(0px)', offset: 1.0 }),
        ]))
      ]),
    ]),
    trigger('bounceIn4', [
      state('bounce4', style({ height: 100, width: 100, opacity: 1 })),
      transition('* => bounce4', [
        animate('.05s', keyframes([
          style({ transform: 'translateY(-400px)', offset: 0 }),
          style({ transform: 'translateY(0px)', offset: 1.0 }),
        ]))
      ]),
    ]),
    trigger('bounceIn3', [
      state('bounce3', style({ height: 100, width: 100, opacity: 1 })),
      transition('* => bounce3', [
        animate('.05s', keyframes([
          style({ transform: 'translateY(-275px)', offset: 0 }),
          style({ transform: 'translateY(0px)', offset: 1.0 }),
        ]))
      ]),
    ]),
    trigger('bounceIn2', [
      state('bounce2', style({ height: 100, width: 100, opacity: 1 })),
      transition('* => bounce2', [
        animate('.05s', keyframes([
          style({ transform: 'translateY(-150px)', offset: 0 }),
          style({ transform: 'translateY(0px)', offset: 1.0 }),
        ]))
      ]),
    ]),
    trigger('bounceIn1', [
      state('bounce1', style({ height: 100, width: 100, opacity: 1 })),
      transition('* => bounce1', [
        animate('.05s', keyframes([
          style({ transform: 'translateY(-25px)', offset: 0 }),
          style({ transform: 'translateY(0px)', offset: 1.0 }),
        ]))
      ]),
    ]),
  ]
})
export class GemsBonanzaComponent {
  collection: any[] = [];
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
  pageTitle = 'Gems bonanza';
  freeSpins = 0;
  multiplier = 1;
  isBonus = false;
  showBonusMessage = false;
  totalBonusWin = 0;
  totalBonusSpins = 0;
  bonusEnded = false;
  bonusbuy = 0;
  bounce = false;
  itemIndex = -1;

  constructor() { }

  ngOnInit(): void {
    this.spin();
    this.bonusbuy = this.bet * 100;
  }


  async spin(): Promise<any> {
    this.disableSpin = true;
    this.totalWin = 0;
    this.winningClass = '';
    this.winImage = '';
    this.bonusClass = '';
    if(this.takebet) {
      !this.isBonus ? this.credit -= this.bet : this.freeSpins--;
    }
    await this.fillCollection();

    this.disableSpin = false;


    if (this.takebet) {
      await this.checkWin();
    }

    this.takebet = true;
    await this.checkBet();

    this.checkBonus();
  }

  checkBet(): void {
    if (!this.showBonusMessage) {
      if (!this.isBonus) {
        this.bet <= this.credit ? this.disableSpin = false : this.disableSpin = true;

      }
    }
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
      this.pageTitle = 'Gems Bonanza';
      this.multiplier = 1;
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async fillCollection() {
    this.collection = [];
    this.itemIndex = -1;
    let colIndex = 0;
    for (let i = 0; i < 6; i++) {
      let column = await this.fillColumn(i, colIndex);

      this.collection.push(column);
      colIndex += 5;
    }

    for (let i = 0; i < 30; i++) {

      this.itemIndex = i;
      this.collection.forEach((element: Gem[]) => {
        element.forEach(el => {
          if (el.collectionIndex === this.itemIndex) {
            el.animationPlayed = true;
          }
        });
      });
      await this.delay(50);
    }
  }

  async fillColumn(columnIndex: number, colindex: number): Promise<Gem[]> {
    let column: Gem[] = [];
    let rnd = 0;
    for (let i = 0; i < 5; i++) {
      rnd = this.generateRandom();

      let img = '';

      rnd < 5 ? img = `${this.images}gamba${rnd}.png` :  img = `${this.images}gem${rnd}.png`;

      column.push({ source: img, class: `g${rnd}`, isNew: false, column: columnIndex, index: i, collectionIndex: (colindex + i), animationPlayed: false });


    }
    return column;
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

  spliceCollection(indexes: number[], column: number) {

    this.winningClass = '';
    indexes.forEach( index => {
      let rnd = this.generateRandom();
      let img = '';
      rnd < 5 ? img = `${this.images}gamba${rnd}.png` :  img = `${this.images}gem${rnd}.png`;
      this.collection[column].splice(index, 1, { source: img, class: `g${rnd}`, isNew: true, column: column, index: index, collectionIndex: (column*5 + index), animationPlayed: false });
    });

  }

  calculateWin(i: number, newcol: Gem[]) {
    let subTotal = 0;

    if (i === 10) {
      return;
    }
    else {
      subTotal = newcol.length * (i * 1.25) * (this.bet / 100)
    }

    this.imagetotal = Math.round(subTotal * 100) / 100;
    this.totalWin += this.imagetotal;
    this.imageValue = Math.round(subTotal * 100) / 100 / newcol.length;
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

  async checkMultiplier(checkCollection: Gem[]) {

    if (this.totalWin > 0) {

      

      for (let i = 1; i < 4; i++) {
        let multiplierArray = checkCollection.filter(img => img.source === `${this.images}gamba${i}.png`);
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


  
  hideBonusMessage() {
    this.showBonusMessage = false;
    this.disableSpin = false;
  }

  hideBonusEndedMessage() {
    this.bonusEnded = false;
    this.disableSpin = false;
  }
  async setupBonusGame() {
    this.bonusClass = 'g10';
    this.pageTitle = 'Bonus';
    this.delay(1050);
  }

  async bonusBonusBonus(checkCollection: Gem[]) {
    let bonusArray = checkCollection.filter(img => img.source === `${this.images}gem10.png`);

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

  async checkWin(): Promise<any> {

    for (let i = 5; i < 14; i++) {
      let checkCollection: Gem[] = [];

      this.collection.forEach((col: Gem[]) => {
        col.forEach(gem => {
          checkCollection.push(gem);
        })
      });
      let currentImg = `${this.images}gem${i}.png`;
      let newcol = checkCollection.filter(img => img.source === currentImg);
      if (newcol.length >= 8) {
        this.disableSpin = true;
        this.imageCount = newcol.length;
        this.winningClass = `g${i}`;
        this.winImage = `${this.images}gem${i}.png`;
        await this.delay(2050);
        let lastIndex = -1;
        let indexes: number[] = [];

        this.calculateWin(i, newcol);

        let columnNumber = 0;

        this.collection.forEach((col: Gem[]) => {
          newcol.forEach(() => {
            let index = col.findIndex((el, index) => el.source === currentImg && index > lastIndex);
            if (index !== -1) {

              indexes.push(index);
              lastIndex = index;
            }
          });

          this.spliceCollection(indexes, columnNumber);

          columnNumber++;
          indexes = [];

          lastIndex = -1;
        });


        await this.delay(1050);

        i = 4;
        this.disableSpin = false;

      }
    }
    let checkCollection: Gem[] = [];

      this.collection.forEach((col: Gem[]) => {
        col.forEach(gem => {
          checkCollection.push(gem);
        })
      });
    if (this.isBonus) {
      await this.checkMultiplier(checkCollection);
      this.totalWin *= this.multiplier;
      this.totalBonusWin += this.totalWin;
    }
    this.credit += this.totalWin;

    await this.bonusBonusBonus(checkCollection);
  }

}
