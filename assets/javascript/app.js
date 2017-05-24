var question = ["What is the most common training command taught to dogs?", 
				"Puppies are delivered how many weeks after conception?",
				"What is the most popular dog breed, according to the American Kennel Club’s registrations?",
				"Which TV series had a dog named K9 who was also a robot?",
				"What is the smallest dog breed used in hunting?"
				];
var choice = [
				["Stay", "Beg", "Sit", "Dance"],
				["36", "22", "9", "16"],
				["Golden Retriever", "Beagle", "German Shepherd", "Labrador"],
				["Full House", "Star Trek", "Doctor Who", "Law & Order"],
				["Chihuahua", "Miniature dachshund", "Toy poodle", "Smooth fox terrier" ]
			]
var correctAns = ["Sit", "9", "Labrador", "Doctor Who", "Miniature dachshund"]	
var intervalId;
var counter = 15;	
var qcount = 0;	
var choicePicked ="";
var win = 0;
var lose = 0;
var unAns = 0;


//startGame
$("#letsGo").on("click", function(){
	//letsGo button disappear
	$("#letsGo").css("display", "none");
	//question to load
	loadQuestion();
	//call clock to show
	run();
	
});


//timer
function run(){
	counter = 15;
	 intervalId = setInterval(decrement, 1000);
}
//timer
function decrement(){
	counter--;
	$("#clock").html(counter);
	if(counter === 0){
		//display timeout and show correct answer
		losefunc();
		unAns++;
	}
}
//timer
function stop(){
	clearInterval(intervalId);
	intervalId = 0;
}

function loadQuestion(){
	queAndCho = "<p>" + question[qcount] + "</p>" +
				"<p class ='choice'>" + choice[qcount][0] +"</p>" +
				"<p class ='choice'>" + choice[qcount][1] +"</p>" + 
				"<p class ='choice'>" + choice[qcount][2] +"</p>" +
				"<p class ='choice'>" + choice[qcount][3] +"</p>"  
	$("#clock").html(counter);			
	$("#display").html(queAndCho);
	$(".choice").on("click", function(){
 	choicePicked = $(this).text();
  	checkAnswer(choicePicked);
});
}	

function checkAnswer(ans){
	if (correctAns.indexOf(ans) > -1){
		//stop timer
		stop();
		//correct answer then call 
		$("#display").html("<img src='assets/images/gotit.jpg'>")
		win++
		//settimeout to the next question
		setTimeout(nextQuestion, 2000);
	} else {
		lose++
		losefunc();
	}

}

function nextQuestion(){
	qcount++
	if(qcount < question.length){
	loadQuestion();
	run();
	} else {
		//no more question then call the result
		finalResult();
	}
}

function losefunc(){
	stop();
		//you wrong and show correct answer
		$("#display").html("<img src = 'assets/images/wrong.jpg'>" + "</br><p>" + "The correct answer is: " + correctAns[qcount] + "</p>");
		//settimeout to the next question
		setTimeout(nextQuestion, 2000);
}

//show the result in the last page
function finalResult(){
	$("#display").html("<p>" + "Correct Answers: " + win + "</p>" +
					   "<p>" + "Incorrect Answers: " + lose + "</p>" +
						"<p>" + "Unanswered: " + unAns + "</p>" +
						"<button id = 'tryAgain' class = 'btn btn-lg btn-warning'>" + "Try Again" + "</button>");

$("#tryAgain").on("click", function(){
	reset();
	loadQuestion();
	run();
});
}
//reset game to play again
function reset(){
	counter = 15;
	qcount = 0;
	choicePicked ="";
	win = 0;
	lose = 0;
	unAns = 0;
}