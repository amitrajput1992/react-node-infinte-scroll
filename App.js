var React = require('react'),
DOM = React.DOM, div = DOM.div, button = DOM.button, ul = DOM.ul, li = DOM.li

	module.exports = React.createClass({
		getInitialState : function () {
			return {
				pagedata : "",
				page : 1,
				loading : false
			}
		},
		componentDidMount : function () {
			var component = this;
			console.log(window);
			console.log(document);
			window.addEventListener('scroll', function (event) {
				component.handleScroll(event, component);
			});
			this.getData();
		},
		getData : function () {
			var component = this;
			if (this.state.page <= 10) {
				var url = "http://localhost:3000/page" + this.state.page;
				$.ajax({
					url : url,
					type : "GET",
					dataType : 'text',
					cache : false,
					contentType : 'application/text',
					success : function (data) {
						content = component.state.pagedata + data;
						if (component.state.page === 1) {
							var pageNum = 6;
						} else {
							pageNum = component.state.page + 1;
						}
						component.setState({
							pagedata : content,
							loading : false,
							page : pageNum
						});
					},
					error : function (xhr, status, err) {
						console.log(xhr);
						console.log(status + err);
					}
				});
			}
		},
		handleScroll : function (event, component) {
			var scrollTop = $(document).scrollTop();
			var windowHeight = window.innerHeight;
			var Height = $(window).height();
			var totalScrolled = scrollTop + windowHeight;
			var pageNum = component.state.page + 1;

			if (totalScrolled + 100 > Height && component.state.loading === false) {
				component.setState({
					loading : true
				});
				component.getData();
			}

		},
		render : function () {
			return div(null,
				div({
					style : {
						color : '#FFF',
						fontSize : 25 + 'px',
						width : 300 + 'px',
						marginLeft : 'auto',
						marginRight : 'auto',
						paddingTop : 20 + 'px',
						paddingBottom : 20 + 'px',
						paddingRight : 20 + 'px',
						paddingLeft : 20 + 'px',
						backgroundColor : 'grey'
					}
				}, this.state.pagedata))
		}
	})