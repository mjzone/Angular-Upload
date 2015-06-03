var app = angular.module('fileUpload', ['ngFileUpload']);
app.controller('Exercise', ['$scope', 'Upload',
    function($scope, Upload) {
        $scope.$watch('files', function() {
            $scope.upload($scope.files);
        });

        $scope.log = '';
        $scope.slides = [];
        $scope.isUploaded = true;
        $scope.buttonText = "+";
        $scope.isEditing = false;


        $scope.edit = function() {
            $scope.isEditing = !$scope.isEditing;
        };

        $scope.add = function() {
            $scope.slides.push({
                "name": $scope.slideName,
                "description": $scope.slideDescription,
                "url": $scope.slideImageUrl
            });
           // $scope.slideName = "";
           // $scope.slideDescription = "";
           // $scope.slideImageUrl = "";
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
                        $scope.isUploaded = false;
                        $scope.buttonText = "Uploading...";
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        $scope.log = 'progress: ' + progressPercentage + '% ' + evt.config.file.name + '\n' + $scope.log;
                    }).success(function(data, status, headers, config) {
                        $scope.isUploaded = true;
                        $scope.buttonText = "+";
                        // $scope.slideImageUrl = config.file.name;
                        $scope.slideImageUrl = "http://www.hdwallpapersimages.com/wp-content/uploads/2014/01/Winter-Tiger-Wild-Cat-Images-540x303.jpg";
                        // $scope.log = 'file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data) + '\n' + $scope.log;
                        //$scope.$apply();
                    });
                }
            }
        };
    }
]);
