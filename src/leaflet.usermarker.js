/**
 * Leaflet.UserMarker v1.0
 * 
 * Author: Jonatan Heyman <http://heyman.info>
 */

(function(window) {
    var icon = L.divIcon({
        className: "leaflet-usermarker",
        iconSize: [34, 34],
        iconAnchor: [17, 17],
        popupAnchor: [0, -20],
        labelAnchor: [11, -3],
        html: ''
    });
    var iconPulsing = L.divIcon({
        className: "leaflet-usermarker",
        iconSize: [34, 34],
        iconAnchor: [17, 17],
        popupAnchor: [0, -20],
        labelAnchor: [11, -3],
        html: '<i class="pulse"></i>'
    });
    
    var iconSmall = L.divIcon({
        className: "leaflet-usermarker",
        iconSize: [18, 18],
        iconAnchor: [9, 9],
        popupAnchor: [0, -10],
        labelAnchor: [11, -3],
        html: ''
    });
    var iconPulsingSmall = L.divIcon({
        className: "leaflet-usermarker-small",
        iconSize: [18, 18],
        iconAnchor: [9, 9],
        popupAnchor: [0, -10],
        labelAnchor: [11, -3],
        html: '<i class="pulse"></i>'
    });

    L.UserMarker = L.Marker.extend({
        options: {
            pulsing: false
        },

        initialize: function(latlng, options) {
            options = options || {};
            if (options.smallIcon) {
                options.icon = (options.pulsing ? iconPulsingSmall : iconSmall);
            } else {
                options.icon = (options.pulsing ? iconPulsing : icon);
            }
            
            var radius = (!!options ? options.accuracy || 0 : 0);
            this._accMarker = L.circle(latlng, radius);
        
            // call super
            L.Marker.prototype.initialize.call(this, latlng, options);
        
            this.on("move", function() {
                this._accMarker.setLatLng(this.getLatLng());
            }).on("remove", function() {
                this._map.removeLayer(this._accMarker);
            });
        },
    
        setPulsing: function(pulsing) {
            this._pulsing = pulsing;
            this.setIcon(!!this._pulsing ? iconPulsing : icon);
        },
    
        setAccuracy: function(accuracy)	{
            this._accuracy = accuracy;
            if (!this._accMarker) {
                this._accMarker = L.circle(this._latlng, accuracy).addTo(this._map);
            } else {
                this._accMarker.setRadius(accuracy);
            }
        },
    
        onAdd: function(map) {
            // super
            L.Marker.prototype.onAdd.call(this, map);
            this._accMarker.addTo(map);
        }
    });

    L.userMarker = function (latlng, options) {
        return new L.UserMarker(latlng, options);
    };
    
    L.liveUserMarker = function(map, options) {
        options = options || {};
        if (typeof options.pulsing === "undefined")
            options.pulsing = true;
        
        var marker = L.userMarker([0,0], options);
        var added = false;
        
        var watchId = window.navigator.geolocation.watchPosition(function(pos) {
            var coords = [pos.coords.latitude, pos.coords.longitude];
            marker.setLatLng(coords);
            marker.setAccuracy(pos.coords.accuracy);
            if (!added) {
                marker.addTo(map);
                added = true;
            }
        }, function() {
            if (options.geolocationError)
                options.geolocationError.apply(marker, arguments);
        }, {enableHighAccuracy:true});
        
        // remove handler
        marker.on("remove", function() {
            if (watchId)
                window.navigator.geolocation.clearWatch(watchId);
        });
        
        return marker;
    };
})(window);
