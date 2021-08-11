import { animate, state, style, transition, trigger } from '@angular/animations';
import { compileDeclareDirectiveFromMetadata, NONE_TYPE } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { Card, CardService } from '../services/card-service.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('cardFlip', [
      state('default', style({
        transform: 'none'
      })),
      state('flipped', style({
        transform: 'translateX(125%) rotateY(180deg)',
      })),
      transition('default => flipped', [
        animate('400ms')
      ]),
      transition('flipped => default', [
        animate('400ms')
      ])
    ])
  ]
})
export class CardComponent implements OnInit {
  front: string = "../assets/images/2D.png";
  back: string = "../assets/images/revature_back.png";

  @Input() card: Card | null = null;

  constructor(private cardService: CardService) {}

  ngOnInit(): void {}

  getZIndex(): number {
    return this.card!.zIndex;
  }
}
