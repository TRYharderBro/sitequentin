// var url = 'http://geekpress.fr/wp-json/wp/v2/';
// 	var getJSON2 = function(url) {
// 		return new Promise(function (data,err){
// 			var xhr = new XMLHttpRequest();
// 			xhr.open('GET', url, true);
// 			xhr.responseType = 'json';
// 			// console.log(xhr);
// 			xhr.onload = function() {
// 				var status = xhr.status;
// 				if (status === 200) {
// 					data(xhr.response);
// 				} else {
// 					err(status, xhr.response);
// 				}
// 			}
// 			xhr.send();
// 		});
// 	};

// 	const auteurId = function(data) {
// 		console.log(data);

// 		for (var i = 0; i < data.length; i++) {
// 			console.log(data[i].name)
// 			document.getElementById("auteur"+i).innerHTML += data[i].name;
// 			document.getElementById("avatar"+i).src = data[i].avatar_urls[96];
// 			document.getElementById("description"+i).innerHTML += data[i].description;
// 		}
// 		return data;
// 	}

// 	var nbUser = 'users?per_page=25';
// 	var nbPosts = 'posts?per_page=100';
// 	var rep2 = getJSON2(url+nbUser).then(auteurId);
// 	var rep3 = getJSON2(url+nbPosts).then(function(data) {
// 		console.log(data);
// 		for (var j in data) {
// 			if (data[j].author){
// 				//document.getElementById("nb"+j).innerHTML = data[j].length;
// 			}
// 		}
// 		return data;
// 	});

var url = 'http://geekpress.fr/wp-json/wp/v2/';
var getJSON2 = function(url) {
     return new Promise(function (data,err){
         var xhr = new XMLHttpRequest();
         xhr.open('GET', url, true);
         xhr.responseType = 'json';
         // console.log(xhr);
         xhr.onload = function() {
             var status = xhr.status;
             if (status === 200) {
                 data(xhr.response);
             } else {
                 err(status, xhr.response);
             }
         }
         xhr.send();
     });
};

const displayUsers = function(data) {
    
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].name)
            document.getElementById("auteur"+i).innerHTML = data[i].name;
            document.getElementById("avatar"+i).src = data[i].avatar_urls[96];
            document.getElementById("description"+i).innerHTML += data[i].description;
        }        
}

const displayArticlesCount = function(users, articles) {

        for (var j = 0; j < users.length; j++) {
            
            document.getElementById("nb"+j).innerHTML = "Nombre d'article : " + articles
                .filter(item => item.author == users[j].id)
                .length;
        }

}

var nbUser = 'users?per_page=25';
var nbPosts = 'posts?per_page=100';

// Auteurs
var rep2 = getJSON2(url+nbUser);

// Nombre de posts
var rep3 = getJSON2(url+nbPosts);

// Promesse qui se réalisera quand les deux précédentes seront réalisées 
Promise.all([rep2, rep3]).then(([users, articles]) => {
    console.log(users, articles);
    displayUsers(users);
    displayArticlesCount(users, articles);
});