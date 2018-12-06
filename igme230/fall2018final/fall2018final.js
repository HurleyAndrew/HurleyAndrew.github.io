$(".top").click(function() {
	$(this).next(".list").slideToggle("slow");
});



let textFile = "article.txt";
$("article").load(textFile);

$("input").change(function() {
	file = $(this).val();
	$("article").load(file);
});

// Button counting code
let count = 0;
$("#click").click(function(){
	count+=1;
	document.getElementById("clickcount").innerHTML = count;
})
