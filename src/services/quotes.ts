import { Quote } from '../data/quote.interface';

export class QuotesService {
	private favoriteQuotes: Quote[] = [];

	addQuoteToFavorites(quote: Quote) {
		this.favoriteQuotes.push(quote);
		console.log(this.favoriteQuotes);
	}

	removeQuoteFromFavorites(quote: Quote) {
		const position = this.favoriteQuotes.findIndex((quoteEle: Quote) => {
			return quoteEle.id == quote.id;
		});

		this.favoriteQuotes.splice(position, 1);
	}

	getFavoriteQuotes() {
		return this.favoriteQuotes.slice(); // return a copy;
	}

	isQuoteFavorite(quote: Quote) {
		return this.favoriteQuotes.find((quoteEle: Quote) => {
			return quoteEle.id == quote.id;
		});
	}
}