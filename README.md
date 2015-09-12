# ColourMemory
## Introduction
This Game have been written in JavaScript programming language. Its client server application. Client side written in HTML, ANGULARJS, BOOTSTRAP, JQUERY. Server side written in NODEJS, EXPRESSJS<Frame work> and Database used Mongo db. 

## Installation
The installation of colour memory game is very simple. <br />
 1. Clone this project using svn . `https://github.com/bilalmetla/ColourMemory` <br />
 2. Install dependencies under server directory. `npm install` <br />
 3.	After successful installation set systemIP and systemPort for server listen in the config/serverConfig.json file. <br />
 4.	Install mongo dB from this link and start it. (https://www.mongodb.org/ ) <br />
 5.	Set databaseIP, databasePort and databaseName in config/serverConfig.js file. <br />
 6.	Then come in the directory server where server.js file located and hit this command on console / terminal,  node server.js <br />
 7.	On console you will see two messages, 1) server listening on port xxxxx 2) connected to db. <br />
 8.	Now your game is started you can hit in the browser using systemIp and systemPort defined in the config/serverConfig.json file. Default URL is http://127.0.0.1:8080 <br />

## Usage
Game played in Google Chrome. <br />
Game is controlled by arrow keys. (UP, DOWN, LEFT, RIGHT). <br />
Press enter to highlighted box the card will rotate and display a colour. <br />
Then move to another box and press enter to rotate card.<br />
If the selected cards matched then you will get 1 point otherwise you will lose 1 point. <br />
When two colour matched it will move to score board otherwise selected cards will reset. <br />
Until you matched all colours, on last matched pair it will show you game over message and get your info to save and system will calculate your Rank and Highest score and display on card. <br />
You can reset button use to reset game at any point it will lose you current played session points. <br />


## License

See LICENSE