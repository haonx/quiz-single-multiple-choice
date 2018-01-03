angular.module("MultipleChoiceQuiz", []).directive("multipleChoicesQuiz", function () {
    return {
        templateUrl: "quiz-multiple-choices.html",
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
            scope.$watch("answers|json", function (newVal) {
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
