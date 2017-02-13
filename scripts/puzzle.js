//Description:
//	Puzzlebot Decoder/Encoder for various ciphers
//Commands:
//	oz shift "[input]" by [#/"all"]
//	oz vignere encrypt "[input]" "[key]"
//  oz vignere decrypt "[input]" "[key]"

module.exports = function(robot){
	
	
	//Caesar Shift
	robot.respond(/shift "(.*)" by (.*)/i, function(msg){
		input = msg.match[1].toLowerCase();
		shift = msg.match[2];
		output = "";
		
		if(shift == "all"){
			for(var i = 0; i < 26; i++){
				output += i +":\t";
				for(var j = 0; j < input.length; j++){
					var character = input[j];
					if(character.match(/[a-z]/i)){
						character = String.fromCharCode(((input.charCodeAt(j) - 97 + i ) % 26) + 97);
					}
					output+=character;
				}
				output+="\n";
			}
			msg.send(output);
		}
		else{
			output += shift +":\t";
				for(var j = 0; j < input.length; j++){
					var character = input[j];
					if(character.match(/[a-z]/i)){
						character = String.fromCharCode(((((input.charCodeAt(j) - 97 + parseInt(shift) ) % 26) +26) %26)+ 97);
					}
					output+=character;
				}
				output+="\n";
			
			msg.send(output);
		}
	
	});
	
	//Vignere Encrypt
	robot.respond(/vignere encrypt "(.*)" "(.*)"/i, function(msg){
		
		input = msg.match[1].toLowerCase();
		key = msg.match[2].toLowerCase();
		output = "";
		
		while(key.length < input.length)
			key += key;
		
		for(var i = 0; i < input.length; i++){
			if(input[i].match(/[a-z]/i)){
				output += String.fromCharCode(((((input.charCodeAt(i) - 97 + key.charCodeAt(i) - 97 ) % 26) +26) %26)+ 97);
			}
			else{
				output += input[i];
			}
		}
		
		msg.send(output);
		
	
	});
	
	//Vignere Decrypt
	robot.respond(/vignere decrypt "(.*)" "(.*)"/i, function(msg){
		
		input = msg.match[1].toLowerCase();
		key = msg.match[2].toLowerCase();
		output = "";
		
		while(key.length < input.length)
			key += key;
		
		for(var i = 0; i < input.length; i++){
			if(input[i].match(/[a-z]/i)){
				output += String.fromCharCode((((((input.charCodeAt(i) - 97) - (key.charCodeAt(i) - 97) ) % 26) +26) %26)+ 97);
			}
			else{
				output += input[i];
			}
		}
		
		msg.send(output);
		
	
	});


}
