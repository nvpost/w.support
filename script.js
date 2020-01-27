	let app = new Vue({
		el:"#app",
		data: {
			mess: 'ho',
			form_data:[],
			from: '',
			to: '',
			now_open:-1,
			page: 1,
			pages: 1,
			noShow_arr: ['cq_id', 'ga_client_id', 'ya_client_id', 'oUser.nnn', 'Соглашение'],
		},
		created(){
			
			document.addEventListener('DOMContentLoaded', function() {
			    var elems = document.querySelectorAll('.datepicker');
			    var instances = M.Datepicker.init(elems, {format:'yyyy-mm-dd'});
			  })
			this.setDate()
			this.getData(false)


		},
		methods:{
			async getData(n){
				this.form_data=[];
				var body = JSON.stringify({from: this.from, to: this.to, page:this.page})
				var local_form_data=[]
				var local_pages = 1
				await fetch('support_form_back.php', {
			        method: 'POST',
			        mode: 'cors',
			        body: body
			    }).then(function(response) {return response.json();})
			      .then(function(myJson) {
			          console.log(myJson)

			          local_form_data = myJson.data
			          local_pages = myJson.pages_count

			      })
			    this.form_data =  local_form_data
			    this.pages =  parseInt(local_pages)
			},
			setDate(){
				var now = new Date()
				var fromDate = new Date(now - ((24 * 60 * 60 * 1000) * 7));
				this.from = this.formatDate(fromDate)
				this.to = this.formatDate(now)

				console.log(this.formatDate(now), this.formatDate(fromDate))
			},

			setNewDate(e, w){
				let v = e.target.value
				app[w]=v

				console.log(this.from, this.to)
			},
			formatDate(d){
					var y = d.getFullYear()
					var m = d.getMonth()
					var d = d.getDate()
					var nd = y+"-"+(m+1)+"-"+d
					return nd
				},
			sh(idx){
				console.log(idx)
				document.querySelectorAll("[data-idx]").forEach(i=>{i.style.display="none"})

				
				if(this.now_open!=idx){
					el=document.querySelector("[data-idx='"+idx+"']")
					el.style.display="block"
				}
				this.now_open=idx
			},
			setPage(p){
				this.page =  p
				this.getData()
			},
			noShow(v){
				return this.noShow_arr.indexOf(v)>-1?false:true
			}
		}
	})
