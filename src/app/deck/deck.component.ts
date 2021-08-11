import { prepareEventListenerParameters } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { Card, CardService } from '../services/card-service.service';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {
  showNextCard: boolean = false;
  currentCardValue: number = 1;
  currentCardSuit: string = 'hearts';

  cards: Card[] = [];
  cardIdx: number = 51;

  constructor(private cardService: CardService) {
    this.cardService.getDeck().subscribe(cards => {
      for (let i in cards) {
        cards[i].state = "default";
        cards[i].zIndex = 0;
      }
      this.cards = cards
      console.log(cards);
    });
  }

  ngOnInit(): void {
    
  }

  deckClicked(event: Event): void {
    if (this.cardIdx < 52 && this.cardIdx > -1) {
      let card = this.cards[this.cardIdx];
      // console.log(`idx: ${this.cardIdx}`);
      // console.log(card);
      if (card.state === "default") {
        card.state = "flipped";
        card.zIndex = 100;
        if (this.cardIdx < 51) {
          let prevCard = this.cards[this.cardIdx + 1];
          // console.log(`[${this.cardIdx + 1}] previous card: f: ${prevCard.face} s: ${prevCard.suit}`);
          prevCard.zIndex = -this.cardIdx * 100;
        }
        this.cardIdx--;
      }
    }
  }

  deckRightClicked(event: Event): void {
    event.preventDefault();
    if (this.cardIdx >= -1 && this.cardIdx < 51) {
      let prevCard = this.cards[this.cardIdx + 1];
      // console.log(prevCard);
      if (prevCard.state === "flipped") {
        prevCard.state = "default";
        prevCard.zIndex = 100;
        if (this.cardIdx > 0) {
          let card = this.cards[this.cardIdx];
          card.zIndex = 0;
        }
        this.cardIdx++;
      }
    }
  }

  getCurrentCard(): Card {
    return this.cards[this.cardIdx];
  }
}