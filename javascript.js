// global variables
var searchTerm;
var numberRecords ;
var startYear;
var endYear;


$("#search").click(function (event) {
    event.preventDefault();
    // update the variables with inputted text
    searchTerm = $("#searchterm").val().trim();
    numberRecords = $("#numberrecords").val().trim();
    startYear = $("#startyear").val().trim();
    endYear = $("#endyear").val().trim();

    displayArticles();
});

$("#clear").click(function() {
    $("#searchterm").val(" ");
    $("#numberrecords").val(" ");
    $("#startyear").val(" ");
    $("#endyear").val(" ");
});

function displayArticles() {
    "?key=value&key2=value2"
    
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + "&begin_date=" + startYear + "0101&end=" + endYear + "1231&api-key=wH8QuP3PdEiiydapXVqaY4ABJnGpKIMr"
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);

        var newDiv = $("<div>");


        for (i=0;i<numberRecords;i++) {
            var newDiv = $("<div id='newdiv'>");

            var articleTitle = $("<h3>");
            articleTitle.text(response.response.docs[i].headline.main);
            newDiv.append(articleTitle);

            var author = $("<p>");
            author.text(response.response.docs[i].byline.original);
            newDiv.append(author);

            var sectionName = $("<p>");
            sectionName.text("Section Type: " + response.response.docs[i].section_name);
            newDiv.append(sectionName);

            var pubDate = $("<p>");
            pubDate.text(response.response.docs[i].pub_date);
            newDiv.append(pubDate);

            var webURL = $("<a>Full Article Here</a>");
            webURL.attr("href", response.response.docs[i].web_url);
            newDiv.append(webURL);

            $("#dumpArticles").append(newDiv);
        };
      });


};

