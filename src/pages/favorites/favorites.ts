import { Component } from '@angular/core';
import { Quote } from '../../data/quote.interface';
import { QuotesService } from '../../services/quotes';
import { QuotePage } from '../quote/quote';

import { ModalController, MenuController } from 'ionic-angular';

import { SettingsService } from '../../services/settings';

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
	quotes: Quote[];

	constructor (private quotesService: QuotesService,
				private modalCtrl: ModalController,
				private menuCtrl: MenuController,
				private settingsService: SettingsService) {

	}

	ionViewWillEnter() {
		this.quotes = this.quotesService.getFavoriteQuotes();
	}

	onViewQuote(quote: Quote) {
		const modal = this.modalCtrl.create(QuotePage, quote);
		modal.present();
		modal.onDidDismiss((remove: boolean) => {
				
			if (remove) {
				this.onRemoveFromFavorites(quote);
			}
		});
	}

	onRemoveFromFavorites(quote: Quote) {
		this.quotesService.removeQuoteFromFavorites(quote);

		//this.quotes = this.quotesService.getFavoriteQuotes();

		// reload the quote to allow the screen to update
		const position = this.quotes.findIndex((quoteEle: Quote) => {
			return quoteEle.id == quote.id;
		});

		this.quotes.splice(position, 1);
	}

	onOpenMenu() {
		this.menuCtrl.open();
	}

	getBackground() {
		return this.settingsService.isAltBackground() ? 'altQuoteBackground' : 'quoteBackground';
	}

	isAltBackground() {
		return this.settingsService.isAltBackground();
	}

}
