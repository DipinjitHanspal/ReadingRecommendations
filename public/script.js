class Book {
	constructor(bookID, title, authors, average_rating, isbn, isbn13, language_code, num_pages, ratings_count, text_reviews_count) {
		this.bookID = bookID;
		this.title = title;
		this.authors = authors;
		this.average_rating = average_rating;
		this.isbn = isbn;
		this.isbn13 = isbn13;
		this.language_code = language_code;
		this.num_pages = num_pages;
		this.ratings_count = ratings_count;
		this.text_reviews_count = text_reviews_count;
	}
}

const lst = []

Vue.component('books-grid', {
	data() {
		return {
			lst
		}
	},
	methods: {
		getData: function () {
			fetch('/books').then(function (response) {
				return response.json();
			}).then((book) => {
				console.log(JSON.stringify(book));
				return new Book(book['bookID'], book['title'], book['authors'],
					book['average_rating'], book['isbn'], book['isbn13'], book['language_code'], book['num_pages'], book['ratings_count'], book['text_reviews_count']);
			}).then((book) => {
				this.lst.push(book)
			})
		}.bind(this)
	},
	template: '<div id="books-grid"><div v-bind:="lst" v-for:="book in lst" :key="book.bookID"> {{ book.title }}</div></div>',
	beforeMount() {
		this.getData()
	}
})

Vue.component('hello',
	{
		template: "<div id='hello'>Hello World</div>"
	});

const app = new Vue({
	el: '#app',
	data: {
		lst: [],
	},
	methods: {

	},
	computed: {
		filteredList() {
			return this.postList.filter(post => {
				return post.title.toLowerCase().includes(this.search.toLowerCase())
			})
		},
	},
});
