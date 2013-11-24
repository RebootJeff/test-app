/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// via equirectangular approximation found here: http://www.movable-type.co.uk/scripts/latlong.html

var calcDistance = function(lat1, lon1, lat2, lon2){
    var R = 6371 * 10^3; // Earth's avg radius in meters

    var delta_x = (lon2-lon1) * Math.cos((lat1+lat2)/2);
    var delta_y = (lat2-lat1);
    var distance = Math.sqrt(delta_x*delta_x + delta_y*delta_y) * R;
    return distance;
};

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        document.getElementsByClassName('geo1')[0].innerHTML = '<p>test0</p>';
        $('.geo1').prepend('<p>test1</p>');
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        // my code
        $('.geo1').prepend('<p>test2</p>');

        var lat1 = 37.7836625;
        var lon1 = -122.40912039999999;

        var test = 0;
        var watchId = navigator.geolocation.watchPosition(function(position){
            $('.geo1').html('Latitude:<br/>'         + position.coords.latitude          + '<br/>' +
                          'Longitude:<br/>'         + position.coords.longitude         + '<br/>' +
                          'Altitude:<br/>'          + position.coords.altitude          + '<br/>' +
                          'Accuracy:<br/>'          + position.coords.accuracy          + '<br/>' +
                          'Altitude Accuracy:<br/>' + position.coords.altitudeAccuracy  + '<br/>' +
                          'Heading:<br/>'           + position.coords.heading           + '<br/>' +
                          'Speed:<br/>'             + position.coords.speed             + '<br/>' +
                          'Timestamp:<br/>'         + position.timestamp                + '<br/>' +
                           'test:<br/>' + test++);
            var lat2 = position.coords.latitude;
            var lon2 = position.coords.longitude;
            // $('.geo2').html('Distance in meters:<br/>' + calcDistance(lat1, lon1, lat2, lon2));
        },
        function(error){
            $('.geo1').html('<p>error:' + error.message + '</p>');
        },
        { timeout: 5000, enableHighAccuracy: true });
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

