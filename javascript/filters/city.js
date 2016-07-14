/**
 * Created by Administrator on 2016/6/14.
 */
angular.module("filters.city",[])
    .filter("cityFilter",[
        function(){
            return function(input,filter){
                if(filter){
                    filter = filter.toLowerCase();
                    var cities = [];
                    for(var i=0 ; i<input.length;i++){
                        var city = input[i];
                        if(city.name.toLowerCase().indexOf(filter) >=0){
                            cities.push(city);
                        }
                        else{
                            for(var j = 0 ;j<city.arrays.length;j++){
                                if(city.arrays[j].name.indexOf(filter)>=0){
                                    cities.push(city);
                                    break;
                                }
                            }
                        }
                    }
                    return cities;
                }
                return input;
            }
        }
    ])

