angular.module('myApp')
  .controller('MainController', ['$scope', '$http', function($scope, $http){

    var oldQuery = "";
    var searchWord = "";
    var allowNumberKey = true;
    var wordData = {};
    var subWordData = {};
    var wordChoices = {};
    var startPoint = 1;
    changeColorForLeftArrow(false);
    changeColorForRightArrow(false);

    $scope.startInput = function(query) {

      function getNewChar(newWord, oldWord) {
        if (newWord.length > oldWord.length) {
          for (var i = 0; i < newWord.length; i++) {
            if (newWord[i] != oldWord[i]) {
              return newWord[i]
            }
          }
        } else if (newWord.length < oldWord.length) {
          return "Backspace"
        }
      }
      var newChar = getNewChar(query, oldQuery);
      oldQuery = query;

      var alphaPatt = /[a-z]/i
      if (newChar == "Backspace") {
        searchWord = searchWord.slice(0, searchWord.length-1)
      } else if (alphaPatt.test(newChar)) {
        searchWord += newChar
      }

      var numPatt = /[1-9]/
      if (numPatt.test(newChar) === false) {
        if (searchWord.length == 1) {
          $http({
            url: '/getdata',
            method: 'GET',
            params: {key: searchWord}
          }).then(function(results){
            wordData = results.data
            subWordData = {}
            var indexNum = 1;
            for (item in wordData) {
              wordData[item].index = indexNum
              indexNum++
            }
            subWordData = wordData
            wordChoices = {}
            startPoint = 1;
            var wordIndex = 1
            for (word in subWordData) {
              wordChoices[word] = {key: subWordData[word].key, ranking: subWordData[word].ranking, index: wordIndex}
              wordIndex++
              if (subWordData[word].index >= 9) {
                wordIndex = 1
                break
              }
            }
            $scope.wordchoices = wordChoices;
            changeSpaceForArrowSigns(Object.keys(wordChoices).length);
            if (Object.keys(subWordData).length > 9) {
              changeColorForLeftArrow(false);
              changeColorForRightArrow(true);
            } else {
              changeColorForLeftArrow(false);
              changeColorForRightArrow(false);
            }
          })
        } else if (searchWord.length >= 2) {
          subWordData = {}
          wordChoices = {}
          startPoint = 1;
          var patt = new RegExp('^' + searchWord.toUpperCase())
          var indexNum = 1;
          for (word in wordData) {
            if (patt.test(wordData[word].key)) {
              subWordData[word] = {key: wordData[word].key, ranking: wordData[word].ranking, index: indexNum}
              indexNum++
            }
          }
          var wordIndex = 1
          for (word in subWordData) {
            wordChoices[word] = {key: subWordData[word].key, ranking: subWordData[word].ranking, index: wordIndex}
            wordIndex++
            if (subWordData[word].index >= 9) {
              wordIndex = 1
              break
            }
          }
          $scope.wordchoices = wordChoices;
          changeSpaceForArrowSigns(Object.keys(wordChoices).length);
          if (Object.keys(subWordData).length > 9) {
            changeColorForLeftArrow(false);
            changeColorForRightArrow(true);
          } else {
            changeColorForLeftArrow(false);
            changeColorForRightArrow(false);
          }
        } else if (searchWord == "") {
          $scope.wordchoices = ""
          wordData = {}
          subWordData = {}
          wordChoices = {}
          startPoint = 1;
          changeColorForLeftArrow(false);
          changeColorForRightArrow(false);
        }
      } else if (numPatt.test(newChar) === true && allowNumberKey === false) {
        originalString = originalString.replace(searchWord, document.getElementsByClassName('wordchoices')[pressedKey-1].getAttribute('data-wordchoice'))
        $scope.textfield = originalString
        oldQuery = originalString
        $scope.wordchoices = ""
        searchWord = ""
        originalString = ""
        pressedKey = 0
        allowNumberKey = true;
        wordData = {}
        subWordData = {}
        wordChoices = {}
        startPoint = 1;
        changeColorForLeftArrow(false);
        changeColorForRightArrow(false);
      }
    }

    var output = ""
    var originalString = ""
    var pressedKey = 0

    $scope.printWord = function(event, form) {
      pressedKey = parseInt(event.key)
      if (document.getElementsByClassName('wordchoices').length != 0) {
        if (pressedKey >= 1 && pressedKey <= 9) {
          originalString = form.textfield.$viewValue
          allowNumberKey = false;
        } else if (event.keyCode >= 37 && event.keyCode <= 40) {
          event.preventDefault()
          if (event.keyCode === 37) {
            if (startPoint !== 1) {
              wordChoices = {}
              startPoint = startPoint - 9;
              var wordIndex = 1
              for (word in subWordData) {
                if (subWordData[word].index >= startPoint && subWordData[word].index <= startPoint + 8) {
                  wordChoices[word] = {key: subWordData[word].key, ranking: subWordData[word].ranking, index: wordIndex}
                  wordIndex++
                }
              }
              wordIndex = 1
              $scope.wordchoices = wordChoices;
              changeSpaceForArrowSigns(Object.keys(wordChoices).length);
              changeColorForLeftArrow(true);
              changeColorForRightArrow(true);
              if (startPoint === 1) {
                changeColorForLeftArrow(false);
              }
            }
          } else if (event.keyCode === 39) {
            if (startPoint <= Object.keys(subWordData).length - 9) {
              wordChoices = {}
              startPoint = startPoint + 9;
              var wordIndex = 1
              for (word in subWordData) {
                if (subWordData[word].index >= startPoint && subWordData[word].index <= startPoint + 8) {
                  wordChoices[word] = {key: subWordData[word].key, ranking: subWordData[word].ranking, index: wordIndex}
                  wordIndex++
                }
              }
              wordIndex = 1
              $scope.wordchoices = wordChoices;
              changeSpaceForArrowSigns(Object.keys(wordChoices).length);
              changeColorForLeftArrow(true);
              changeColorForRightArrow(true);
              if (startPoint > Object.keys(subWordData).length - 9) {
                changeColorForRightArrow(false);
              }
            }
          }
        }
      }
    }

    function changeSpaceForArrowSigns(numOfWords) {
      if (numOfWords > 5) {
        $('.space-for-arrow').removeClass('empty-row').removeClass('empty-row-sm').addClass('empty-row-lg');
      } else if (numOfWords > 2 && numOfWords <= 4) {
        $('.space-for-arrow').removeClass('empty-row-lg').removeClass('empty-row-sm').addClass('empty-row');
      } else if (numOfWords <= 2) {
        $('.space-for-arrow').removeClass('empty-row').removeClass('empty-row-lg').addClass('empty-row-sm');
      }
    }

    function changeColorForLeftArrow(arrow) {
      if (arrow === true) {
        $('.left-arrow').css('color', 'brown');
      } else {
        $('.left-arrow').css('color', 'beige');
      }
    }

    function changeColorForRightArrow(arrow) {
      if (arrow === true) {
        $('.right-arrow').css('color', 'brown');
      } else {
        $('.right-arrow').css('color', 'beige');
      }
    }

  }]);
