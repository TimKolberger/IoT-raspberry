IoT.controller('IoTIndexCtrl', function ($scope, $rootScope, $timeout, $compile, $routeParams, $location, constant)
{
    //-----------------------------------------------------

    $scope.templateLoadCount = 0;

    $rootScope.$on('$includeContentLoaded', function()
    {
        if (++$scope.templateLoadCount >= 4)
        {
            Styles.init();
        }
    });

    $scope.errorMessageQuery = function()
    {
        if ($routeParams.error_message)
        {
            var err = $routeParams.error_message;
            var errMessage = "Unknown Error";

            if (err === "disconnect-server")
            {
                errMessage = "Disconnected from server";
            }
            else if (err === "disconnect-client")
            {
                errMessage = "Disconnected from IoT client";
            }

            $scope.errMessage = errMessage;

            jQuery('#modal-error').modal('toggle');
        }
    };

    $scope.dismissModal = function()
    {
        jQuery('#modal-error').modal('toggle');

        $timeout(function()
        {
            var loc = $location.path('/index');
        }, 500);
    };

    //-----------------------------------------------------

    $scope.clients = [];

    $scope.sidebar =
    {
        "Device Overview":
        [{
            title: "Connected Devices",
            href: "#index",
            active: true
        }]
    };

    $scope.getClients = function(cb)
    {
        $.get("/clients/get", function(clients)
        {
            cb(JSON.parse(clients));
        });
    };

    $scope.init = function()
    {
        $scope.clients = [];

        $scope.getClients(function(clients)
        {
            for (var i = 0; i < clients.length; i++)
            {
                $scope.clients.push({
                    id: clients[i].id,
                    client_name: clients[i].client_name,
                    address: clients[i].address,
                    connected_at: moment(new Date(clients[i].connected_at)).format("DD.MM. HH:mm:ss").toString()
                });

                $scope.$apply();
            }
        });
    };

    $scope.init();
});