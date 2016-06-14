/**
 * Created by Administrator on 2016/6/14.
 */
angular.module("filters.city",[])
    .filter("cityFilter",function(){
        return function(input,filter){
            if(filter){
                filter = filter.toLowerCase();
                var cities = [];
                for(var i=0 ; i<input.length;i++){
                    var city = input[i];
                    var cityArrays = city.arrays;
                    if(city.name.toLowerCase() == filter){
                        cities.push(city);
                        continue;
                    }
                    else{
                        for(var j = 0 ;j<cityArrays.length;j++){
                            if(cityArrays[j].name.indexOf(filter)>=0){
                                cities.push(city);
                                break;
                            }
                            else{
                                continue;
                            }
                        }
                    }
                }
                return cities;
            }
            return input;
        }
    })
    .filter("cityFilterN",function(){
        return function(input,filter){
            if(filter){
                filter = filter.toLowerCase();
                var cities = [];
                for(var i=0 ; i<input.length;i++){
                    var city = input[i];
                    if(city.name.toLowerCase().indexOf(filter)>=0){
                        cities.push(city);
                        continue;
                    }
                }
                return cities;
            }
            return input;
        }
    })
