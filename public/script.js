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
		this.selected = false;
	}
}

const lst = [{}]

Vue.component('tst', {
	data() {
		return {
			txtt : ""
		}
	},
	template : '<div id="test"> {{ jsn }} <button id="tst-button" @click="updateTst">Really do</button> </div>',
	methods: {
		async updateTst ()  {
			const rawResponse = await fetch('/recommend', {
				headers : {
					'Accept' : 'application/json',
					'Content-Type' : 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({title : 'This'})
			}).then((response) => {
				return response.json();
			}).then((txt) => {
				console.log(txt)
				console.log(txt["title"])
				this.txtt = txt;
			});
		},
	},
	computed: {
		jsn : function() {
			return this.txtt["title"]
		}
	},
	watch: {
	}
})

Vue.component('books-grid', {
	data() {
		return {
			bookList : [],
		}
	},
	methods: {
	},
	template: '<div id="books-grid"><div class="book-item" v-for="book in filteredBooks" :key="book.bookID" v-if="bookList.length > 0"> {{ book.title }} : {{ book.authors }} </div></div>',
	// beforeMount() {
	// },
	created() {
		fetch('/books').then((response) => {
			return response.json();
		}).then((book) => {
			console.log(JSON.stringify(book));
			return new Book(book['bookID'], book['title'], book['authors'],
				book['average_rating'], book['isbn'], book['isbn13'], book['language_code'], book['num_pages'], book['ratings_count'], book['text_reviews_count']);
		}).then((book) => {
			this.bookList.push(book)
		});
	},
	computed: {
		filteredBooks() {
			return this.bookList.filter(book => {
				return book.title.toLowerCase().includes(app.search.toLowerCase())
			})
		}
	}
})

const app = new Vue({
	el: '#app',
	data: {
		lst: [{bookID: "12asf", title:"Hello"}],
		search : '',
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
