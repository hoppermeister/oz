//Description:
//	Puzzlebot Decoder/Encoder for various ciphers
//Commands:
//	oz shift "[input]" by [#/"all"]
//	oz vignere encrypt "[input]" "[key]"
//  oz vignere decrypt "[input]" "[key]"
//	oz index ["string" index]+
//	oz morse encrypt "[input]"
//	oz morse decrypt "[input (valid morse, separated by spaces)]"

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
	
	//Key indexing
	robot.respond(/index (.*)/i, function(msg){	
		output = "";
		//This is gross.  Regex is gross.  I am gross.

		var str = msg.match[1];
		for(var i = 0; i < msg.match[1].length; i++){
			if(str.charAt(i) != '"')
			{
				msg.send("NEEDS TO START WITH \"");
				break;
			}
			i++;
			var input = "";
			while(i < str.length && str.charAt(i) != '"'){
				input += str.charAt(i++);
			}
			i++;
			if(str.charAt(i) != ' ')
			{
				msg.send("NEEDS TO SEPARATE WITH SPACE");
				break;
			}
			i++;
			var number = "";
			while(i < str.length && str.charAt(i) >= '0' && str.charAt(i) <= '9'){
				number+=str.charAt(i++);
			}
			
			if(isNaN(parseInt(number)) || parseInt(number) > input.length){
				msg.send("INDEX TOO LARGE OR NOT A NUMBER")
				break;
			}
			
			output += input.charAt(parseInt(number));
				
			
		}
		
		msg.send(output);
		
	
	});
	
	morse =  {
		"a":".-",
		"b":"-...",
		"c":"-.-.",
		"d":"-..",
		"e":".",
		"f":"..-.",
		"g":"--.",
		"h":"....",
		"i":"..",
		"j":".---",
		"k":"-.-",
		"l":".-..",
		"m":"--",
		"n":"-.",
		"o":"---",
		"p":".--.",
		"q":"--.-",
		"r":".-.",
		"s":"...",
		"t":"-",
		"u":"..-",
		"v":"...-",
		"w":".--",
		"x":"-..-",
		"y":"-.--",
		"z":"--..",
		"1":".----",
		"2":"..---",
		"3":"...--",
		"4":"....-",
		"5":".....",
		"6":"-....",
		"7":"--...",
		"8":"---..",
		"9":"----.",
		"0":"-----",
		" ":" ",
		"":" "
	};
	
	//Morse Encryption
	robot.respond(/morse encrypt "(.*)"/i, function(msg){
		
		input = msg.match[1].toLowerCase();
		output = "";
		
		for(var i = 0; i < input.length; i++){
			if(input[i].match(/[a-z0-9]/i)){
				output += morse[input[i]]+" ";
			}
			else{
				output += input[i];
			}
		}
		
		msg.send(output);
		
	
	});
	
	//Morse Decryption
	robot.respond(/morse decrypt "(.*)"/i, function(msg){
		for (var key in morse) {
			if (!morse.hasOwnProperty(key)) continue;
			morse[morse[key]] = key;
		}
		
		var output = "";
		var arr = msg.match[1].split(" ");
		for(var i = 0; i < arr.length; i++){
			if(morse[arr[i]]!= undefined)
				output+= morse[arr[i]];
			else
				output+= arr[i];
		}
		
		msg.send(output);
		
	
	});
	
	semaphore = {
		"A":":semaphore-alpha:",
		"B":":semaphore-bravo:",
		"C":":semaphore-charlie:",
		"D":":semaphore-delta:",
		"E":":semaphore-echo:",
		"F":":semaphore-foxtrot:",
		"G":":semaphore-golf:",
		"H":":semaphore-hotel:",
		"I":":semaphore-india:",
		"J":":semaphore-juliet:",
		"K":":semaphore-kilo:",
		"L":":semaphore-lima:",
		"M":":semaphore-mike:",
		"N":":semaphore-november:",
		"O":":semaphore-oscar:",
		"P":":semaphore-papa:",
		"Q":":semaphore-quebec:",
		"R":":semaphore-romeo:",
		"S":":semaphore-sierra:",
		"T":":semaphore-tango:",
		"U":":semaphore-uniform:",
		"V":":semaphore-victor:",
		"W":":semaphore-whiskey:",
		"X":":semaphore-x_ray:",
		"Y":":semaphore-yankee:",
		"Z":":semaphore-zulu:",
		"*ERR*":":semaphore-_error:",
		"#":":semaphore-_numeric:",
		" ":":semaphore-_ready:",
		"1":":semaphore-alpha:",
		"2":":semaphore-bravo:",
		"3":":semaphore-charlie:",
		"4":":semaphore-delta:",
		"5":":semaphore-echo:",
		"6":":semaphore-foxtrot:",
		"7":":semaphore-golf:",
		"8":":semaphore-hotel:",
		"9":":semaphore-india:",
		"0":":semaphore-kilo:"
	}

	//Semaphore Encryption
	robot.respond(/semaphore encrypt "(.*)"/i, function(msg){
		
		input = msg.match[1].toUpperCase();
		output = "";
		
		for(var i = 0; i < input.length; i++){
			if(input[i].match(/[a-z0-9#]/i)){
				output += semaphore[input[i]]+" ";
			}
			else{
				output += input[i];
			}
		}
		
		msg.send(output);
		
	
	});
	
	//Semaphore Decryption
	robot.respond(/semaphore decrypt "(.*)"/i, function(msg){
		for (var key in semaphore) {
			if (!semaphore.hasOwnProperty(key)) continue;
			semaphore[semaphore[key]] = key;
		}
		
		var output = "";
		var arr = msg.match[1].split(" ");
		for(var i = 0; i < arr.length; i++){
			if(semaphore[arr[i]]!= undefined)
				output+= semaphore[arr[i]];
			else
				output+= arr[i];
		}
		
		msg.send(output);
		
	
	});
}
