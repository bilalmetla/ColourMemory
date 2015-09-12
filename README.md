# ColourMemory
## Introduction
This Game have been written in JavaScript programming language. Its client server application. Client side written in HTML, ANGULARJS, BOOTSTRAP, JQUERY. Server side written in NODEJS, EXPRESSJS<Frame work> and Database used Mongo db. 

## Installation
The installation of colour memory game is very simple. 
1. Clone this project using svn . `https://github.com/bilalmetla/ColourMemory`
2. Install dependencies under server directory. `npm install`
3.	After successful installation set systemIP and systemPort for server listen in the config/serverConfig.json file.
4.	Install mongo dB from this link and start it. (https://www.mongodb.org/ )
5.	Set databaseIP, databasePort and databaseName in config/serverConfig.js file.
6.	Then come in the directory server where server.js file located and hit this command on console / terminal,  node server.js 
7.	On console you will see two messages, 1) server listening on port xxxxx 2) connected to db.
8.	Now your game is started you can hit in the browser using systemIp and systemPort defined in the config/serverConfig.json file. Default port is 8080

## Usage
	Game played in Google Chrome.
	Game is controlled by arrow keys. (UP, DOWN, LEFT, RIGHT).
	Press enter to highlighted box the card will rotate and display a colour.
	Then move to another box and press enter to rotate card.
	If the selected cards matched then you will get 1 point otherwise you will lose 1 point.
	When two colour matched it will move to score board otherwise selected cards will reset.
	Until you matched all colours, on last matched pair it will show you game over message and get your info to save and system will calculate your Rank and Highest score and display on card.
	You can reset button use to reset game at any point it will lose you current played session points.


## License

See LICENSE