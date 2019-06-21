import axios from 'axios';

const url = 'http://localhost:8000/timeline?count=100';
const urlTrend='http://localhost:8000/trends?id=23424747';
const urlsearch='http://localhost:8000/search';
const urlfriends='http://localhost:8000/friends';
const urlfavs='http://localhost:8000/favorites?screen_name=argentina';
export function getTrending(){
    return axios.get(urlTrend)
    .then(
        function(results){
            debugger;
            if (results.data.length > 0)
                return results.data[0];
            else
                return[];    
        }
    )
}

export function getTimeline() {
    debugger;

    return axios.get(url)
    .then(
        function (results) {
            debugger;
            if (results.data.length > 0)
                return results.data;
            else
                return [];
                
        }.bind(this)
    );
}

export function getTimelineFiltered() {
    return axios.get(url)
    .then(
        function (results) {
            debugger;
            if (results.data.length > 0)
                return results.data;
            else
                return [];
                
        }.bind(this)
    );
}

export function getSearch(query){
    debugger;
    return axios.get(urlsearch,
        {
            params:{
                q: query,
                count: 100
            }
        }
        ).then(
            function(results){
                debugger;
                console.log(results)
                return results.data;
            }
        )
}

export function getFriends(){
    debugger;
    return axios.get(urlfriends).then(
            function(results){
                debugger;
                return results.data;
            }
        )
}

export function getFavs(){
    debugger;
    return axios.get(urlfavs).then(
        function (results){
            debugger;
            return results.data;
        }
    )
}