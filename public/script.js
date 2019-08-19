Vue.component('hello',
	{
		template: "<div id='hello'>Hello World</div>"
	})

Vue.component('books-grid', {
	template: '<div id="books-grid"></div>'
})

const app = new Vue({
	el: '#app',
	data: {
		lst: [],
	},
	methods: {
		getData: function () {
			this.lst = fetch('/books').then(function (response) {
				return response.json();
			}).then(function(json) {
				console.log(JSON.stringify(json));
			})
		},
	},
	computed: {
		filteredList() {
			return this.postList.filter(post => {
				return post.title.toLowerCase().includes(this.search.toLowerCase())
			})
		},
	},
	beforeMount() {
		this.getData()
	}
});