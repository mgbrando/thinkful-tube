var searchResultsTemplate='<section class="js-search-results search-results">'+
						  	'<header class="js-search-result-header search-results-header">--Search Results--</header>'+
						  	'<div class="js-search-table search-table">'+
						  		'<div class="js-current-row js-row row"></div>'+
						  	'</div>'+
						  '</section>';
var rowTemplate='<div class="js-current-row js-row row"></div>';
var colTemplate='<div class="col-6"><header class="js-vid-header vid-header"></header><a href="" target="_blank"><img src="" alt=""></a></div>';
var YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';
var videoUrl="https://www.youtube.com/watch?v=";

function getDataFromAPI(searchTerm, callback){
	var query={part: 'snippet', key: 'AIzaSyDv9mu-erfFOL3mAQB3A2SGNBCR60dd7b8', q: searchTerm,
				maxResults: 10}; //r: 'json'
	$.getJSON(YOUTUBE_API_URL, query, callback);
}

function createThumbnail(column, dataElement){
	column.children('.js-vid-header').text(dataElement.snippet.title);
	column.children('a').attr('href', videoUrl+dataElement.id.videoId);
	column.find('img').attr('src', dataElement.snippet.thumbnails.high.url).attr('alt', 
			dataElement.snippet.title);
}

function displayVideos(data){
	var count=0;
	var searchResults=$(searchResultsTemplate);
	//var row=$(rowTemplate);
	var thumbnail;
	//$(searchResults).append(row);
	(data.items).forEach(function(dataElement){
		console.log(dataElement);
		var column=$(colTemplate);
		createThumbnail(column, dataElement);
		console.log(column);
		searchResults.find('.js-current-row').append(column);
		if((++count % 2) === 0){
			searchResults.find('.js-row').removeClass('js-current-row');
			var row=$(rowTemplate);
			searchResults.find('.js-search-table').append(row);
		}
	});
	$('.js-search-video-page').append(searchResults);
}

function handleSearch(searchForm, searchField, searchResults){
	console.log('What!?!?!?');
	$(searchForm).on('submit', function(event){
		event.preventDefault();
		$(searchResults).remove();
		var searchTerm=$(searchField).val().trim();
		getDataFromAPI(searchTerm, displayVideos);
	});
}

$(document).ready(function(){
	var searchForm='#js-search-form';
	var searchField='.js-search-field';
	var searchResults='.js-search-results';
	handleSearch(searchForm, searchField, searchResults);
});