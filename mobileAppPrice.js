var myApp = angular.module("myApp", []);

function Main($scope, $http) {
  $scope.total = 0;
  $scope.double = false;

  $scope.display = [{}];

  $scope.features = [
    {
      name: "Email Login",
      price: 1000,
      double: 2000
    },
    {
      name: "Social Media Login",
      price: 1300,
      double: 2400
    },
    {
      name: "Navigation",
      price: 2600,
      double: 4800
    },
    {
      name: "Dashboard",
      price: 1600,
      double: 2800
    },
    {
      name: "Analytics (min)",
      price: 1000,
      double: 2000
    },
    {
      name: "Analytics (adv)",
      price: 4000,
      double: 5333
    },
    {
      name: "Activity Feed",
      price: 3300,
      double: 4400
    },
    {
      name: "Rating System",
      price: 3300,
      double: 4400
    },
    {
      name: "Photos",
      price: 500,
      double: 1000
    },
    {
      name: "Video",
      price: 500,
      double: 1000
    },
    {
      name: "Audio/Music",
      price: 750,
      double: 1400
    },
    {
      name: "Gallery",
      price: 500,
      double: 1000
    },
    {
      name: "Maps",
      price: 1500,
      double: 2000
    },
    {
      name: "Geolocation",
      price: 3000,
      double: 4000
    },
    {
      name: "Compass",
      price: 3840,
      double: 5120
    },
    {
      name: "Custom UI",
      price: 1500,
      double: 3000
    },
    {
      name: "Accept Payments",
      price: 2760,
      double: 3680
    },
    {
      name: "Sync Devices",
      price: 7680,
      double: 10240
    },
    {
      name: "User Profiles",
      price: 7680,
      double: 10240
    },
    {
      name: "Messaging",
      price: 4950,
      double: 6600
    },
    {
      name: "SMS Integration",
      price: 3300,
      double: 4400
    },
    {
      name: "Notifications",
      price: 3000,
      double: 4000
    },
    {
      name: "Shopping Cart",
      price: 6600,
      double: 8800
    },
    {
      name: "Task List",
      price: 3300,
      double: 4400
    },
    {
      name: "Search",
      price: 4950,
      double: 6600
    },
    {
      name: "Barcodes",
      price: 2475,
      double: 3300
    },
    {
      name: "QR Codes",
      price: 2475,
      double: 3300
    },
    {
      name: "Calendar",
      price: 750,
      double: 1500
    },
    {
      name: "Social Sharing",
      price: 1650,
      double: 2200
    },
    {
      name: "API Integration",
      price: 6600,
      double: 8800
    },
    {
      name: "Privacy Settings",
      price: 2475,
      double: 3300
    },
    {
      name: "Encrypted Data",
      price: 11000,
      double: 14667
    },
    {
      name: "Reliability/Scale",
      price: 35000,
      double: 46667
    },
    {
      name: "1-3 Screens",
      price: 7000,
      double: 9333
    },
    {
      name: "3-8 Screens",
      price: 22500,
      double: 30000
    },
    {
      name: "9+ Screens",
      price: 44000,
      double: 58667
    },
    {
      name: "Second Language",
      price: 21000,
      double: 28000
    },
    {
      name: "Admin Approval",
      price: 4950,
      double: 6600
    },
    {
      name: "Reporting",
      price: 6600,
      double: 8800
    },
    {
      name: "Web Portal",
      price: 16500,
      double: 22000
    },
    {
      name: "Payment System",
      price: 6600,
      double: 8800
    },
    {
      name: "Admin Users",
      price: 9900,
      double: 13200
    },
    {
      name: "Ticketing System",
      price: 13200,
      double: 17600
    },
    {
      name: "Feedback System",
      price: 9900,
      double: 13200
    }
  ];

  $scope.moreDevices = function () {
    if (!$scope.double) {
      $scope.total *= 2;
      $scope.double = true;
    } else {
      $scope.total *= 0.5;
      $scope.double = false;
    }
  };

  $scope.addFeat = function (index) {
    for (i = 0; i < $scope.display.length; i++) {
      if ($scope.features[index].name == $scope.display[i].name) {
        $scope.display.splice(i, 1);
        $scope.total -= $scope.features[index].price;
        return;
      }
    }

    $scope.display.push({
      name: $scope.features[index].name,
      cost: $scope.features[index].price
    });
    $scope.total += $scope.features[index].price;
  };
}
