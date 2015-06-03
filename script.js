var app = angular.module('fileUpload', ['ngFileUpload']);
app.controller('Exercise', ['$scope', 'Upload',
    function($scope, Upload) {
        $scope.$watch('files', function() {
            $scope.upload($scope.files);
        });

        $scope.log = '';

        $scope.slides = [];

        $scope.add = function() {
            $scope.slides.push($scope.slide);
            $scope.slide = "";
            console.log($scope.slides);
        };

        $scope.remove = function(index) {
            $scope.slides.splice(index, 1);
        };

        $scope.upload = function(files) {
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    Upload.upload({
                        url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                        fields: {
                            'username': $scope.username
                        },
                        file: file
                    }).progress(function(evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        $scope.log = 'progress: ' + progressPercentage + '% ' + evt.config.file.name + '\n' + $scope.log;
                    }).success(function(data, status, headers, config) {
                        $scope.log = 'file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data) + '\n' + $scope.log;
                        // $scope.$apply();
                    });
                }
            }
        };
    }
]);