angular.module("SingleChoiceQuiz", []).directive("singleChoiceQuiz", function () {
    return {
        templateUrl: "quiz-single-choice.html",
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
