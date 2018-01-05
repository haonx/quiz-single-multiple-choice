angular.module("MultipleChoiceQuiz", []).directive("multipleChoicesQuiz", function () {
    return {
        template: '<div id="quizSelector"> <div class="answers multipleChoiceQuiz"> <div class="answer materialCheckbox" ng-class="{selected:answer.selected}" ng-repeat="answer in answers" ng-click="selectAnswer(answer)"> <div class="icon"> <div class="outline"></div> <div class="fill"></div> </div> <span>{{answer.text}}</span> </div> </div> </div>',
        scope: {
        eventCorrect: "&",
            answers: "="
    },
    link: function (scope) {
        scope.selectAnswer = function (answer) {
            for (var i = 0; i < scope.answers.length; i++) {
                if (answer.id === scope.answers[i].id) {
                    scope.answers[i].selected = !scope.answers[i].selected;
                }
            }
        };
        scope.$watch("answers|json", function () {
            var correctAnswers = scope.answers.filter(function (value) {
                return value.isCorrect;
            });
            var selectedAnswers = scope.answers.filter(function (value) {
                return value.selected;
            });
            var correctedSelectAnswers = scope.answers.filter(function (value) {
                return value.selected && value.isCorrect;
            });
            if(
                correctAnswers.length === correctedSelectAnswers.length &&
                correctAnswers.length === selectedAnswers.length
            ) {
                scope.eventCorrect();
            }
        })
    }
};
});
