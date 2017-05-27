var questions = [
	{
		question: "What is the most common training command taught to dogs?",
		choice:  ["Stay", "Sit", "Beg", "Dance"],
		correctAns: "Sit"
	}, {
		question: "Puppies are delivered how many weeks after conception?",
		choice: ["36", "22", "9", "16"],
		correctAns: "9"
	}, {
		question: "What is the most popular dog breed, according to the American Kennel Club’s registrations?",
		choice: ["Golden Retriever", "Beagle", "German Shepherd", "Labrador"],
		correctAns:  "Labrador"
	}, {
		question: "Which TV series had a dog named K9 who was also a robot?",
		choice: ["Full House", "Star Trek", "Doctor Who", "Law & Order"],
		correctAns: "Doctor Who"
	}, {
		question: "What is the smallest dog breed used in hunting?",
		choice: ["Chihuahua", "Miniature dachshund", "Toy poodle", "Smooth fox terrier" ],
		correctAns: "Miniature dachshund"
	}, {
		question: "Normal adult dogs have how many teeth?",
		choice: ["42", "38", "24", "32" ],
		correctAns: "42"
	}, {
		question: "Which dog yodels instead of barks?",
		choice: ["Komondor", "Otterhound", "Basenji", "Basset hound"],
		correctAns: "Basenji"
	}
]

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
	queAndCho = "<p>" + questions[qcount].question + "</p>" +
				"<p class ='choice'>" + questions[qcount].choice[0] +"</p>" +
				"<p class ='choice'>" + questions[qcount].choice[1] +"</p>" + 
				"<p class ='choice'>" + questions[qcount].choice[2] +"</p>" +
				"<p class ='choice'>" + questions[qcount].choice[3] +"</p>"  
	$("#clock").html("15");			
	$("#display").html(queAndCho);
	$(".choice").on("click", function(){
 	choicePicked = $(this).text();
  	checkAnswer(choicePicked);
});
}	

function checkAnswer(ans){
	if (ans == questions[qcount].correctAns){
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
	if(qcount < questions.length){
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
		$("#display").html("<img src = 'assets/images/wrong.jpg'>" + "</br><p>" + "The correct answer is: " + questions[qcount].correctAns + "</p>");
		//settimeout to the next question
		setTimeout(nextQuestion, 2000);
}

//show the result in the last page
function finalResult(){
	$("#display").html("<p>" + "Correct Answers: " + win + "</p>" +
					   "<p>" + "Incorrect Answers: " + lose + "</p>" +
						"<p>" + "Unanswered: " + unAns + "</p>" +
						"<button id = 'tryAgain' class = 'btn btn-lg btn-danger'>" + "Try Again" + "</button>");

$("#tryAgain").on("click", function(){
	reset();
	loadQuestion();
	run();
});
}
//reset game to play again
function reset(){
	//change question order
	questions.sort(function(){
            return 0.5 - Math.random();
          });
	counter = 15;
	qcount = 0;
	choicePicked ="";
	win = 0;
	lose = 0;
	unAns = 0;
}