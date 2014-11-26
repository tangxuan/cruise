angular.module('cruise', [])
    .controller('mainCtrl', ['$scope',
        function($scope) {
            $scope.navs = [{
                name: 'DASHBOARD',
                href: 'dashboard'
            }, {
                name: 'MY CRUISE',
                href: 'my-cruise'
            }, {
                name: 'AGENTS',
                href: 'agents'
            }, {
                name: 'HELP',
                href: 'help'
            }].reverse();

            $scope.navTo = function(nav) {
                $scope.currentNav = nav;
            };

            $scope.currentNav = 'agents';
        }
    ]);