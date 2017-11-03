angular
    .module("highcharts")
    .component("highcharts", {
        templateUrl: 'js/highcharts/highcharts.template.html',
        controller: ["$scope", "$http", function($scope, $http) {
            console.log("Highcharts Controller initialized");

            var baseURL = '/api/v1/spain-births';
            $http
                .get(baseURL)
                .then(function(response) {
                    var dataFromServer = response.data;
                    var dataForWidget = [];
                    //Tranformación
                    for (var i = 0; i < dataFromServer.length; i++) {
                        var item = dataFromServer[i];
                        //console.log(item);
                        var itemForWidget = [item.region, item.totalbirth];
                        dataForWidget.push(itemForWidget);
                    }
                    Highcharts.chart('container', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'Spain births'
                        },
                        subtitle: {
                            text: 'Source: <a href="http://pestadistico.inteligenciadegestion.msssi.es/publicoSNS/comun/Cubo.aspx?IdNodo=6422#no-back-button">Portal Estadístico</a>'
                        },
                        xAxis: {
                            type: 'category',
                            labels: {
                                rotation: -45,
                                style: {
                                    fontSize: '13px',
                                    fontFamily: 'Verdana, sans-serif'
                                }
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Total births'
                            }
                        },
                        legend: {
                            enabled: false
                        },
                        tooltip: {
                            pointFormat: 'Total births: <b>{point.y:.1f}</b>'
                        },
                        series: [{
                            name: 'Total births',
                            data: dataForWidget,
                            dataLabels: {
                                enabled: true,
                                rotation: -90,
                                color: '#FFFFFF',
                                align: 'right',
                                format: '{point.y:.1f}', // one decimal
                                y: 10, // 10 pixels down from the top
                                style: {
                                    fontSize: '13px',
                                    fontFamily: 'Verdana, sans-serif'
                                }
                            }
                        }]
                    });
                });
        }]
    });
