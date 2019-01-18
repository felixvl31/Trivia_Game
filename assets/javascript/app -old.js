var trivia = {
	right : 0,
	wrong : 0,
	unanswered : 0,
	time : 15,
	current : 0,
	gameRestarted: false,

	//Number of questions
	questionsNumber:[0,1,2,3,4,5,6,7,8,9,10,11],
	// Declare questions in an array
	questionsArray : [
  "Where did Ross and Rachel get married on a whim?",
  "What was Monica's apartment number?",
  "Which season was the only one without a Thanksgiving episode?",
  "Which pairing never kissed on the show?",
  "What is the name of Joey's stuffed penguin?",
  "What is Chandler's middle name?",
  "Who was Rachel supposed to marry in the pilot episode?",
  "Who pees on Monica's leg when she gets stung by a jellyfish?",
	"What did Joey name his barcalounger?",
	"What was Chandler's job in the early seasons of the show?",
	"Which one of Joey's sisters did Chandler fool around with at Joey's birthday party?",
	"What caused the fire in Phoebe and Rachel's apartment?"
	],
	
	// Declare options & answer for each question in an array of arrays
	optionsArray : [
  ["Atlantic City", "Las Vegas", "New York", "London",1],
  ["25","21","20","16",2],
  ["Season 1", "Season 2", "Season 5", "Season 6",1],
  ["Monica & Phoebe", "Chandler & Rachel", "Chandler & Ross", "Phoebe & Ross",0],
  ["Marcel", "Mr. Penguin", "Hugsy", "Kissy",2],
  ["Marcel", "Martin", "Mary", "Muriel",3],
  ["Barry","Paolo","Tag","Ross",0],
  ["Rachel","Phoebe","Joey","Chandler",3],
	["Rosa","Mary","Rosita","Therese",2],
	["Data Analyst","IT Procurements Manager","Transponster","Comedian",1],
	["Mary Rose","Mary Angela","Mary Therese","Mary Ann",1],
	["Phoebe's incense","Rachel cooking","Phoebe's candles","Rachel's Hair Straightener",3]
	],
//Pick Random Question
	randomQuestion: function(){
		index = Math.floor(Math.random()*this.questionsNumber.length);
   	this.current = this.questionsNumber[index];
    this.questionsNumber.splice(index,1);
	},
	desireQuestions : 9,
}
 window.onload = function() {
	//count function, decrease 1 from time & update display
	function count() {
		trivia.time--;
		console.log(trivia.time);
		$(".remainingTime").text(trivia.time);
		//Check if time gets to 0
		if (trivia.time === 0) {
			$(".option").off("click");
			var rightAnswer = trivia.optionsArray[trivia.current][trivia.optionsArray[trivia.current][4]];
			if (trivia.questionsNumber.length>=trivia.desireQuestions) {
				trivia.time = 15;
				clearInterval(trivia.intervalId);

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
			clearInterval(trivia.intervalId);
		}
	}

	
	//Update and decrease count, Fill questions & options in case still needed (If not go to gameCompleted function)
	function play() {
		$(".remainingTime").text(trivia.time);
		trivia.intervalId = setInterval(count, 1000);
		if (trivia.questionsNumber.length>=trivia.desireQuestions) {
			//Update Display	
			$(".initial").css("display", "none");
			$(".content").css("display", "block");
			$(".time").css("display", "block");
			$(".results").css("display", "none");
			//Update questions & options
			$(".question").text(trivia.questionsArray[trivia.current]);
			$(".options").css("display", "inherit");
			for (i=0;i<=3;i++){
				$("#"+i).html(trivia.optionsArray[trivia.current][i]);
			}

		//Check click on options
			$(".option").on("click", function(event) {
				clearInterval(trivia.intervalId);
				trivia.time = 15;
				
				//Check the answer
				var solution = event.currentTarget.id;
				var correctGif = "wrong";
				//Update Display	
				$(".content").css("display", "none");
				$(".results").css("display", "inherit");
				$(".gif").css("display", "inherit");

				var rightAnswer = trivia.optionsArray[trivia.current][trivia.optionsArray[trivia.current][4]];
				if (trivia.questionsNumber.length>=trivia.desireQuestions) {
					if (solution == trivia.optionsArray[trivia.current][4]) {
						trivia.right++;
						correctGif = "";
						$(".message").html(rightAnswer +", right!");
						$(".rightAnswer").empty();
					} 
					else {
						trivia.wrong++;
						$(".message").html(trivia.optionsArray[trivia.current][event.currentTarget.id] +", wrong!");
						correctGif = "wrong";
						if (trivia.gameRestarted){
							$(".rightAnswer").html("The right answer was: " + rightAnswer);
						}
					}
					$(".gif").attr("src", "assets/images/" + trivia.current + correctGif+".gif");
					setTimeout(play,3000);
				}
				//Get new question number
				trivia.randomQuestion();
				$(".option").off("click");
			});
		} 
		else {
			clearInterval(trivia.intervalId);
			console.log(trivia.intervalId);
			$(".time").css("display", "none");
			$(".message").html("THANKS FOR PLAYING!");
			$(".gif").css("display", "none");
			$(".finalResults").css("display", "unset");
			$(".FinalRight").text(trivia.right);
			$(".FinalWrong").text(trivia.wrong);
			$(".FinalUnaswered").text(trivia.unanswered);
			$(".Final Right").text(trivia.right);
			$(".restart").on("click", function() {
				trivia.gameRestarted = true;
				restart();
			});
		}
	}

	//Restart function
	function restart() {
		clearInterval(trivia.intervalId);
		$(".option").off("click");
		trivia.right = trivia.wrong = trivia.unanswered=0;
		trivia.time = 15;
		trivia.questionsNumber =[0,1,2,3,4,5,6,7,8,9,10,11];
		trivia.randomQuestion();

		//Update Display	
		$(".initial").css("display", "block");
		$(".content").css("display", "none");
		$(".time").css("display", "none");
		$(".results").css("display", "none");
		$(".finalResults").css("display", "none");
		$(".start").on("click", function() {
			$(".start").off("click");
			play();
		});
	}

		// Start Game
		restart();


 };