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
    trigger('fallOne', [
      state('fall', style({})),
      transition('* => fall', [
        animate('.1s', keyframes([
          style({ transform: 'translateY(-150px)', offset: 0 }),
          style({ transform: 'translateY(0px)', offset: 1.0 }),
        ]))
      ]),
    ]),
    trigger('bounceIn5', [
      state('bounce5', style({ height: 100, width: 100, opacity: 1 })),
      transition('* => bounce5', [
        animate('.1s', keyframes([
          style({ transform: 'translateY(-525px)', offset: 0 }),
          style({ transform: 'translateY(0px)', offset: 1.0 }),
        ]))
      ]),
    ]),
    trigger('bounceIn4', [
      state('bounce4', style({ height: 100, width: 100, opacity: 1 })),
      transition('* => bounce4', [
        animate('.1s', keyframes([
          style({ transform: 'translateY(-400px)', offset: 0 }),
          style({ transform: 'translateY(0px)', offset: 1.0 }),
        ]))
      ]),
    ]),
    trigger('bounceIn3', [
      state('bounce3', style({ height: 100, width: 100, opacity: 1 })),
      transition('* => bounce3', [
        animate('.1s', keyframes([
          style({ transform: 'translateY(-275px)', offset: 0 }),
          style({ transform: 'translateY(0px)', offset: 1.0 }),
        ]))
      ]),
    ]),
    trigger('bounceIn2', [
      state('bounce2', style({ height: 100, width: 100, opacity: 1 })),
      transition('* => bounce2', [
        animate('.1s', keyframes([
          style({ transform: 'translateY(-150px)', offset: 0 }),
          style({ transform: 'translateY(0px)', offset: 1.0 }),
        ]))
      ]),
    ]),
    trigger('bounceIn1', [
      state('bounce1', style({ height: 100, width: 100, opacity: 1 })),
      transition('* => bounce1', [
        animate('.1s', keyframes([
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
  }


  async spin(): Promise<any> {
    this.disableSpin = true;
    this.totalWin = 0;
    this.winningClass = '';
    this.winImage = '';
    this.bonusClass = '';
    await this.fillCollection();


    this.disableSpin = false;


    if (this.takebet) {
      await this.checkWin();
    }

    this.takebet = true;
    await this.checkBet();

    // this.checkBonus();
  }

  checkBet(): void {
    if (!this.showBonusMessage) {
      if (!this.isBonus) {
        this.bet <= this.credit ? this.disableSpin = false : this.disableSpin = true;

      }
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
      await this.delay(100);
    }
  }

  async fillColumn(columnIndex: number, colindex: number): Promise<Gem[]> {
    let column: Gem[] = [];
    let rnd = 0;
    for (let i = 0; i < 5; i++) {
      rnd = this.generateRandom();

      let img = `${this.images}gem${rnd}.png`;

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

  async spliceCollection(indexes: number[]) {
    
    this.winningClass = '';
    indexes.forEach(async (index) => {
      let r = this.generateRandom();
      this.collection.forEach((col: Gem[]) => {
        let colAmount = 0;
        col.forEach(async el => {
          el.collectionIndex === index ? colAmount++ : '';
        });
        let animateNext = false;
        col.forEach(async el => {
          let newRow = 4;
          let row = el.index;
          let column = el.column;
          if (animateNext) {
            el.collectionIndex;
            el.index--;
            el.fallOne = true;
            await this.delay(100);
          }
          if (el.collectionIndex === index) {
            col.splice(el.index, 1);
            newRow -= (colAmount);
            col.push({ source: `${this.images}gem${r}.png`, class: `g${r}`, isNew: true, column: column, index: 4, collectionIndex: (index + (4 - row)), animationPlayed: true, fallOne: true });
            el.fallOne = true;
            el.collectionIndex--;
            el.index--;
            animateNext = true;
            await this.delay(100);
            colAmount--;
          }

        })
      });
    });
  }

  async checkWin(): Promise < any > {

      for(let i = 5; i< 14; i++) {
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
        let lastIndex = -1;
        let indexes: number[] = [];

        newcol.forEach(() => {
          let index = checkCollection.findIndex((el, index) => el.source === currentImg && index > lastIndex);
          indexes.push(index);
          lastIndex = index;
        });

        //this.calculateWin(i, newcol);

        await this.delay(2050);

        await this.spliceCollection(indexes);

        await this.delay(1050);

        i = 4;
        this.disableSpin = false;

      }
    }
  }

}
