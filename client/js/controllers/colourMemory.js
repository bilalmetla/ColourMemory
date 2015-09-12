/**
 * Created by bilal on 7/3/2015.
 */

var colourMemory = angular.module('colourMemory', ['ngRoute']);

colourMemory.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/views/cards.html',
                controller: 'cardsCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });

    }]);

colourMemory.controller('cardsCtrl',
    function($route, $routeParams, $location, $scope, $document,$http) {
        console.log('in cardsCtrl ....');
        var defaultImage = "images/cards/Aceedo.png";
        var rotateImage = "images/3.png";
        var numberOfMatchedColour = 0;
        $scope.playerPoints = 0;
        $scope.data = "gameOver"; // switch case of modal either game Over OR reset
        var matchedColours = [{colourName:defaultImage, colourImage:defaultImage},
            {colourName:defaultImage, colourImage:defaultImage},
            {colourName:defaultImage, colourImage:defaultImage},
            {colourName:defaultImage, colourImage:defaultImage},
            {colourName:defaultImage, colourImage:defaultImage},
            {colourName:defaultImage, colourImage:defaultImage},
            {colourName:defaultImage, colourImage:defaultImage},
            {colourName:defaultImage, colourImage:defaultImage}];
        //total card and related info of cards...
        var cardsInfo = [{image:defaultImage, rotateImage:"images/cards/Black.png", color:1},{image:defaultImage, rotateImage:"images/cards/Black2.png", color:1},
            {image:defaultImage, rotateImage:"images/cards/Blue.png", color:2},{image:defaultImage, rotateImage:"images/cards/Blue2.png", color:2},
            {image:defaultImage, rotateImage:"images/cards/Brown.png", color:3},{image:defaultImage, rotateImage:"images/cards/Brown2.png", color:3},
            {image:defaultImage, rotateImage:"images/cards/Gray.png", color:4},{image:defaultImage, rotateImage:"images/cards/Gray2.png", color:4},
            {image:defaultImage, rotateImage:"images/cards/Orange.png", color:5},{image:defaultImage, rotateImage:"images/cards/Orange2.png", color:5},
            {image:defaultImage, rotateImage:"images/cards/Pink.png", color:6},{image:defaultImage, rotateImage:"images/cards/Pink2.png", color:6},
            {image:defaultImage, rotateImage:"images/cards/Purple.png", color:7},{image:defaultImage, rotateImage:"images/cards/Purple2.png", color:7},
            {image:defaultImage, rotateImage:"images/cards/Red.png", color:8},{image:defaultImage, rotateImage:"images/cards/Red2.png", color:8}];

        $scope.cardsPreserved  = cardsInfo;
        $scope.cards = cardsInfo;
        $scope.matchedColours = matchedColours;
        shuffle(cardsInfo,function(arr){
            console.log('shuffled array...',arr);
            $scope.cards = arr;
        });

        // focus on first card
        var selectedCard = 0;
        var previousCard = -1;
        setTimeout( function(){
            $( '#0' ).focus();
            $('#0').css('background-color', 'orange');
        } , 500 );

        $(document).keydown(function(e) {
            switch(e.which) {
                case 37: // left
                    changeCardFocus(selectedCard,37);
                    break;

                case 38: // up
                    changeCardFocus(selectedCard,38);
                    break;

                case 39: // right
                    changeCardFocus(selectedCard,39);
                    break;

                case 40: // down
                    changeCardFocus(selectedCard,40);
                    break;

                case 13: // enter key
                    if($('#' + selectedCard ).css('opacity') != 0 && previousCard != selectedCard){
                        previousCard = selectedCard;
                        rotateCard(selectedCard);
                    }

                    break;

                default: return; // exit this handler for other keys
            }
            e.preventDefault(); // prevent the default action (scroll / move caret)
        });

        var selectedCards = 0;          // indicate any card is selected or not, to validate when colourMatched function call
        var firstCardColour = '';       // store first colour info of card to match with  colour of second card
        var firstCard = '';

        function changeCardFocus(sCard,keypressed){

            switch(keypressed) {
                case 37:
                     if (sCard > 0) {

                                sCard = sCard - 1;
                                selectedCard = sCard;
                                $('.opacityClass').css('background-color', '');
                                $( '#'+selectedCard ).focus();
                                $('#'+selectedCard).css('background-color', 'orange');

                               }

                    break;
                case 38:

                    if (sCard > 3) {

                            sCard = sCard - 4;
                            selectedCard = sCard;
                            $('.opacityClass').css('background-color', '');
                            $( '#'+selectedCard ).focus();
                            $('#'+selectedCard).css('background-color', 'orange');

                    }
                    break;
                case 39:

                    if (sCard < 15) {
                            sCard = sCard + 1;
                            selectedCard = sCard;
                            $('.opacityClass').css('background-color', '');
                            $( '#'+selectedCard ).focus();
                            $('#'+selectedCard).css('background-color', 'orange');

                    }
                    break;
                case 40:

                    if (sCard < 12) {
                            sCard = sCard + 4;
                            selectedCard = sCard;
                            $('.opacityClass').css('background-color', '');
                            $( '#'+selectedCard ).focus();
                            $('#'+selectedCard).css('background-color', 'orange');

                          }
                    break;
            }
        }

        function rotateCard(sCard){
           // console.log(sCard,$scope.cards[sCard].image);
            $scope.cards[sCard].image = $scope.cards[sCard].rotateImage;
            $scope.$apply();
            selectedCards = selectedCards+1;
            if(selectedCards == 1){
                firstCardColour  = $scope.cards[sCard].color;
                firstCard  = sCard;
            }
            (selectedCards > 1)?checkColourMatched(firstCardColour,$scope.cards[sCard].color,firstCard,sCard):0;
        }

        function checkColourMatched(firstColour,secondColour,fCard,sCard){
            previousCard = -1;
            selectedCards = 0;
            firstCardColour ='';
            if(firstColour == secondColour){
                console.log(' color matched..');
                $('#'+fCard).css('opacity', 0);
                $('#'+sCard).css('opacity', 0);
                $scope.matchedColours[numberOfMatchedColour].colourName = $scope.cards[fCard].image;
                $scope.matchedColours[numberOfMatchedColour].colourImage = $scope.cards[sCard].image;
                numberOfMatchedColour = numberOfMatchedColour+1;
                $scope.playerPoints = $scope.playerPoints+1 ; // Increase points of Player ..
                setTimeout(function(){
                    $scope.$apply();
                },2000);
                if(numberOfMatchedColour >= 8){
                    gameOver();
                }

            }else{
                $scope.playerPoints = $scope.playerPoints-1 ; // Increase points of Player ..
                $scope.cards[fCard].image = defaultImage;
                $scope.cards[sCard].image = defaultImage;
                /*
                * when cards not matched then rotate cards after some delay...
                * */
                setTimeout(function(){
                    $scope.$apply();
                },2000);

            }
        }


        function shuffle(arr,callback) {
            for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
            callback(arr);
        }

var st = false; // used to stop timer when game over..
        function startTime() {
            var today=new Date();
            var h=today.getHours();
            var m=today.getMinutes();
            var s=today.getSeconds();
            m = checkTime(m);
            s = checkTime(s);
            document.getElementById('txt').innerHTML = h+":"+m+":"+s;
            var t = setTimeout(function(){startTime()},500);
        }

        function checkTime(i) {
            if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
            return i;
        }

        //startTime();

        var h1 = document.getElementById('txt'),
            seconds = 0, minutes = 0, hours = 0,
            t;

        function add() {
            seconds++;
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
                if (minutes >= 60) {
                    minutes = 0;
                    hours++;
                }
            }
            if(!st) {
                h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
            }
            timer();
        }
        function timer() {

            setTimeout(add, 1000);
        }
        /*
        * start timer ..
        * */
        timer();

        $scope.resetColourMemory = function(){
            $('#reset-button').css('background-color', 'orange');
            $scope.modelTitle = "Reset Colour Memory";
            $scope.modelBodyMessage = "You will lost your score.";
            $scope.saveButtonText = "OK";
            $scope.data = "reset";

            $('#myModal').modal();
        }

        $('#cancel').click(function(){
            $('#reset-button').css('background-color', '');
        });


        function gameOver (){

           $scope.modelTitle = "Game Over";
           $scope.saveButtonText = "OK";
           $scope.data = "gameOver";
           st = true;

           $('#myModal').modal();
            $('#recipient-name').focusout(function(){

                if( $('#recipient-name').val() == '' || $('#recipient-name').val() == undefined ) {
                    $('#recipient-name').css('background-color', 'red');
                    return;
                }
            });
            $('#recipient-name').focus(function(){

                    $('#recipient-name').css('background-color', '');
                return;

            });

            $('#recipient-email').focusout(function(){
                var pattern = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/);
                pattern.test($('#recipient-email').val());
                if( !pattern.test($('#recipient-email').val()) ) {
                    $('#recipient-email').css('background-color', 'red');
                    return;
                }
            });
            $('#recipient-email').focus(function(){
                $('#recipient-email').css('background-color', '');
                    return;

            });

           $scope.$apply();

       }

        $scope.okButton = function(){
            if($scope.data == "reset"){
                numberOfMatchedColour = 0;
                selectedCards = 0;
                firstCardColour = '';
                firstCard = '';
               // $('#my-modal').modal('hide');
                seconds = 0; minutes = 0; hours = 0;
                st = false;
                $scope.playerPoints = 0;
                $('.opacityClass').css("opacity", 1);
                $('#reset-button').css('background-color', '');
                selectedCard = 0;
                matchedColours = [{colourName:defaultImage, colourImage:defaultImage},
                    {colourName:defaultImage, colourImage:defaultImage},
                    {colourName:defaultImage, colourImage:defaultImage},
                    {colourName:defaultImage, colourImage:defaultImage},
                    {colourName:defaultImage, colourImage:defaultImage},
                    {colourName:defaultImage, colourImage:defaultImage},
                    {colourName:defaultImage, colourImage:defaultImage},
                    {colourName:defaultImage, colourImage:defaultImage}];
                //total card and related info of cards...
                cardsInfo = [{image:defaultImage, rotateImage:"images/cards/Black.png", color:1},{image:defaultImage, rotateImage:"images/cards/Black2.png", color:1},
                    {image:defaultImage, rotateImage:"images/cards/Blue.png", color:2},{image:defaultImage, rotateImage:"images/cards/Blue2.png", color:2},
                    {image:defaultImage, rotateImage:"images/cards/Brown.png", color:3},{image:defaultImage, rotateImage:"images/cards/Brown2.png", color:3},
                    {image:defaultImage, rotateImage:"images/cards/Gray.png", color:4},{image:defaultImage, rotateImage:"images/cards/Gray2.png", color:4},
                    {image:defaultImage, rotateImage:"images/cards/Orange.png", color:5},{image:defaultImage, rotateImage:"images/cards/Orange2.png", color:5},
                    {image:defaultImage, rotateImage:"images/cards/Pink.png", color:6},{image:defaultImage, rotateImage:"images/cards/Pink2.png", color:6},
                    {image:defaultImage, rotateImage:"images/cards/Purple.png", color:7},{image:defaultImage, rotateImage:"images/cards/Purple2.png", color:7},
                    {image:defaultImage, rotateImage:"images/cards/Red.png", color:8},{image:defaultImage, rotateImage:"images/cards/Red2.png", color:8}];

                $scope.matchedColours = matchedColours;
                shuffle(cardsInfo,function(arr){
                    console.log('shuffled array...',arr);
                    $scope.cards = arr;
                    setTimeout( function(){
                        $( '#0' ).focus();
                        $('#0').css('background-color', 'orange');
                        $scope.$apply();
                    } , 500 );
                });

            }else if($scope.data == "gameOver"){
                var totalTimeOfPlay = document.getElementById('txt').textContent;


                var scores =  {
                    name : $('#subscribe-form').find('[id="recipient-name"]').val(),
                    email : $('#subscribe-form').find('[id="recipient-email"]').val(),
                    playedTime: totalTimeOfPlay,
                    points:$scope.playerPoints
                }
                if(scores.name != '' && scores.name != undefined && scores.email != '' && scores.email != undefined){
                    $http.post("/colourMemory/userScore", scores )
                        .success(function(data, status, headers, config){
                            if(data.status != 200){
                                alert(data.err);
                                return;
                            }
                            console.log('response',data);
                            $scope.heighestPoints = data.scoreCard.heighestScore;
                            $scope.rank = data.scoreCard.rank;
                            alert('Your Score saved.');
                            return;
                        })
                        .error(function(data, status, headers, config){
                            console.log(data);
                            alert(data.err);
                        });
                }else{
                    alert('You Not Entered Record.');
                    return;
                }

            }

        }




    });