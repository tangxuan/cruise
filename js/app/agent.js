angular.module('cruise').controller('AgentCtrl', ['$scope',
        function AgentCtrl($scope) {
            $scope.agents = [{
                id: 0,
                domain: 'xcvxljlsjdflsdjflsf02.thoughtworks.com',
                status: 'idle',
                ip: '192.168.0.1',
                path: '/var/lib/cruise-agent',
                resources: ['firefox3', 'ie10', 'core-duo']
            },{
                id: 1,
                domain: 'xcvxljlsjdflsdjflsf03.thoughtworks.com',
                status: 'building',
                ip: '192.168.0.2',
                path: '/var/lib/cruise-agent',
                resources: ['firefox3', 'ie10', 'core-duo', 'chrome33']
            },{
                id: 2,
                domain: 'xcvxljlsjdflsdjflsf04.thoughtworks.com',
                status: 'idle',
                ip: '192.168.0.3',
                path: '/var/lib/cruise-agent',
                resources: ['firefox3', 'core-duo']
            },{
                id: 3,
                domain: 'xcvxljlsjdflsdjflsf05.thoughtworks.com',
                status: 'building',
                ip: '192.168.0.4',
                path: '/var/lib/cruise-agent',
                resources: ['ie10', 'core-duo']
            },];

            $scope.historys = ['bjljflskflksdfljls02/Acceptance_test', 
                    'bjljflskflksdfljls03/Acceptance_test', 
                    'bjljflskflksdfljls04/Acceptance_test', 
                    'bjljflskflksdfljls05/Acceptance_test', 
                    'bjljflskflksdfljls06/Acceptance_test', 
                    'bjljflskflksdfljls07/Acceptance_test'
            ];

        }
    ])
    .directive('cAgent', [function() {
        return {
            restrict: 'E',
            scope: {
                model: '='
            },
            replace: true,
            template: '<div class="agent" ng-class="{ building: model.status == \'building\'}">\
                <div class="agent-icon"></div>\
                <div class="info">\
                    <div class="basic-info">\
                        <span class="domain">{{model.domain}}</span>\
                        <span class="status">{{model.status}}</span>\
                        <span class="ip">{{model.ip}}</span>\
                        <span class="path">{{model.path}}</span>\
                    </div>\
                    <div class="resource-info">\
                        <a href="" class="specify" ng-click="showSpecifyPop(model.id, $event)">\
                            <span class="add-icon"></span>\
                            <span>Specify Resources</span>\
                        </a>\
                        <span>Resources: </span>\
                        <ul>\
                            <li class="resource" ng-repeat="res in model.resources">\
                                <span>{{res}}</span>\
                                <span class="del-icon" ng-click="deleteRes($index)"></span>\
                            </li>\
                        </ul>\
                    </div>\
                </div>\
                <a class="deny" href="" ng-click="">\
                    <span class="deny-icon"></span>\
                    <span>Deny</span>\
                </a>\
            </div>',
            link: function ($scope, jqEle, $attr) {
                $scope.deleteRes = function (index) {
                    $scope.model.resources.splice(index, 1);
                };

                $scope.showSpecifyPop = function (agentId, event) {
                    var $this = $(event.target),
                        popLeft,
                        popTop;
                    popLeft = $this.offset().left + $this.width() / 2 - 20;
                    popTop = $this.offset().top + $this.height() + 20;
                      $('.specify-pop').css({
                        left: popLeft,
                        top: popTop,
                      }).data('agentId', agentId).find('input').focus();
                };
            }
        };
    }])
    .directive('cSpecifyPop', [function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="specify-pop">\
                <div class="specify-pop-content">\
                    <span class="tip">(Separate multiple resources name with commas)</span>\
                    <input type="text" />\
                    <div class="buttons">\
                        <div class="button" ng-click="onAdd()">Add Resource</div>\
                        <div class="button" ng-click="onClose()">Close</div>\
                    </div>\
                </div>\
            </div>',
            link: function ($scope, jqEle, $attr) {
                $scope.onClose = function () {
                    jqEle.css('left', '-10000px');
                    jqEle.find('input').val('');
                };

                $scope.onAdd = function () {
                    var agentId = jqEle.data('agentId');
                    for (var i = $scope.agents.length - 1; i >= 0; i--) {
                        if ($scope.agents[i].id === agentId) {
                            $scope.agents[i].resources = _.uniq($scope.agents[i].resources.concat(jqEle.find('input').val().split(',')));
                            break;
                        }
                    };
                    $scope.onClose();
                };
            }
        };
    }]);