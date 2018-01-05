angular.module("SingleChoiceQuiz", []).directive("singleChoiceQuiz", function () {
    return {
        template: '<div id="quizSelector"> <div class="answers multipleChoiceQuiz"> <div class="answer materialRadio" ng-class="{selected:answer.selected}" ng-repeat="answer in answers" ng-click="selectAnswer(answer)"> <div class="icon"> <div class="outline"></div> <div class="fill"></div> </div> <span>{{answer.text}}</span> </div> </div> </div>',
        scope: {
            eventCorrect: "&",
            answers: "="
        },
        link: function (scope) {
            scope.selectAnswer = function (answer) {
                for (var i = 0; i < scope.answers.length; i++) {
                    if (answer.id === scope.answers[i].id) {
                        scope.answers[i].selected = true;
                    } else {
                        scope.answers[i].selected = false;
                    }
                }
            };
            scope.$watch("answers|json", function (newVal) {
                var correctAnswers = scope.answers.filter(function (value) {
                    return value.selected && value.isCorrect;
                });
                var selectedAnswers = scope.answers.filter(function (value) {
                    return value.selected;
                });
                if(correctAnswers.length === selectedAnswers.length) {
                    scope.eventCorrect();
                }
            })
        }
    };
});
