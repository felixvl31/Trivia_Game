var trivia = {
	right : 0,
	wrong : 0,
	unanswered : 0,
	time : 15,
	current : 1,
	gameRestarted: false,
	timing : setInterval(timer, 1000),

	//Number of questions
	questionsNumber:[1,2,3,4,5,6,7,8],
	// Declare questions in an array
	questionsArray : [
  "Where did Ross and Rachel get married on a whim?",
  "What was Monica's apartment number?",
  "Which season was the only one without a Thanksgiving episode?",
  "Which pairing never kissed on the show?",
  "What is the name of Joey's stuffed penguin?",
  "What is Chandler's middle name?",
  "Who was Rachel supposed to marry in the pilot episode?",
  "Who pees on Monica's leg when she gets stung by a jellyfish?"
	],
	// Declare options for each question in an array of arrays
	optionsArray : [
  ["Atlantic City", "Las Vegas", "New York", "London"],
  ["25","21","20","16"],
  ["Season 1", "Season 2", "Season 5", "Season 6"],
  ["Monica & Phoebe", "Chandler & Rachel", "Chandler & Ross", "Phoebe & Ross"],
  ["Marcel", "Mr. Penguin", "Hugsy", "Kissy"],
  ["Marcel", "Martin", "Mary", "Muriel"],
  ["Barry","Paolo","Tag","Ross"],
  ["Rachel","Phoebe","Joey","Chandler"]
	],
	// Declare the right answers 
	Answers : {
  1: "2",
  2: "3",
  3: "2",
  4: "1",
  5: "3",
  6: "4",
  7: "1",
  8: "4"
	},
//Pick Random Question
	randomQuestion: function(){
		index = Math.floor(Math.random()*this.questionsNumber.length);
   	this.current = this.questionsNumber[index];
    this.questionsNumber.splice(index,1);
	}
}


//Change question & options
function fillContent(number) {
  $(".question").text(trivia.questionsArray[number - 1]);
	$(".options").css("display", "inherit");
	for (i=1;i<=4;i++){
		$("#"+i).text(trivia.optionsArray[number - 1][i-1]);
	}
}

//Check if the answer is the correct one
function checkAnswer(event) {
	//Save answer
  var solution = event.currentTarget.id;
	var correctGif = "wrong";
	//Update Display	
  $(".content").css("display", "none");
  $(".results").css("display", "inherit");
  $(".gif").css("display", "inherit");


	var rightAnswer = trivia.optionsArray[trivia.current - 1][trivia.Answers[trivia.current] - 1];
	if (trivia.questionsNumber.length>=0) {
		if (solution == trivia.Answers[trivia.current]) {
			trivia.right++;
			correctGif = "";
			$(".message").html(rightAnswer +", right!");
			$(".rightAnswer").empty();
		} 
		else {
			trivia.wrong++;
			$(".message").html(trivia.optionsArray[trivia.current - 1][event.target.attributes.value.nodeValue] +", wrong!");
			correctGif = "wrong";
			if (trivia.gameRestarted){
				$(".rightAnswer").html("The right answer was: " + rightAnswer);
			}
		}
		$(".gif").attr("src", "assets/images/" + trivia.current + correctGif+".gif");
		setTimeout(play,3000);
  }
}

// Question is not answered
function timeOut() {
	$(".option").off("click");
	var rightAnswer = trivia.optionsArray[trivia.current - 1][trivia.Answers[trivia.current] - 1];
	if (trivia.questionsNumber.length>=0) {
		trivia.time = 15;
		clearInterval(trivia.timing);

		//Update Display	
		$(".content").css("display", "none");
		$(".results").css("display", "inherit");
		$(".gif").css("display", "inherit");

		$(".message").html("Time Out!");
		$(".gif").attr("src", "assets/images/" + trivia.current + "wrong.gif");
		if (trivia.gameRestarted){
			$(".rightAnswer").html( "The right answer was: " + rightAnswer );
		}
		trivia.randomQuestion();
		trivia.unanswered++;
		setTimeout(play,3000);
	}
}

//Timer function, decrease 1 from time & update display
function timer() {
  trivia.time--;
  $(".remainingTime").text(trivia.time);
  if (trivia.time === 0) {
    timeOut();
		clearInterval(trivia.timing);
  }
}

//Restart function
function restart() {
  clearInterval(trivia.timing);
  $(".option").off("click");
  trivia.right = 0;
	trivia.wrong=0;
	trivia.unanswered=0;
  trivia.time = 15;
	trivia.questionsNumber =[1,2,3,4,5,6,7,8];
  trivia.randomQuestion();

	//Update Display	
  $(".initial").css("display", "block");
  $(".content").css("display", "none");
  $(".time").css("display", "none");
  $(".results").css("display", "none");
  $(".start").on("click", function() {
    $(".start").off("click");
    play();
  });
}

//Update and decrease timer, Fill questions & options in case still needed (If not go to gameCompleted function)
function play() {
  $(".remainingTime").text(trivia.time);
  trivia.timing = setInterval(timer, 1000);
  if (trivia.questionsNumber.length>=0 && trivia.current!==undefined) {
		//Update Display	
		$(".initial").css("display", "none");
		$(".content").css("display", "block");
		$(".time").css("display", "block");
		$(".results").css("display", "none");
		//Update questions & options
    fillContent(trivia.current);

	//Check click on options
    $(".option").on("click", function(event) {
      clearInterval(trivia.timing);
      trivia.time = 15;
      checkAnswer(event);
      trivia.randomQuestion();
			$(".option").off("click");
    });
  } 
	else {
    gameCompleted();
  }
}

//Display results of the game and Restart Button
function gameCompleted() {
  clearInterval(trivia.timing);
	$(".time").css("display", "none");
  $(".message").html("THANKS FOR PLAYING!");
  $(".gif").css("display", "none");
  $(".rightAnswer").html(
    "<br>Total Questions: " + trivia.questionsArray.length +
		"<br>Right Answers: " + trivia.right +
		"<br>Wrong Answers: " + trivia.wrong +
		"<br>Timed Out: " + trivia.unanswered +
		'<br>Try Again:<br><button class="restart">Restart Game</button>' );
  $(".restart").on("click", function() {
		trivia.gameRestarted = true;
    restart();
  });
}

// Start Game
	restart();