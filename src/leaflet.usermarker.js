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
    var circleStyle = {
        stroke: true,
        color: "#03f",
        weight: 3,
        opacity: 0.5,
        fillOpacity: 0.15,
        clickable: false
    };

    L.UserMarker = L.Marker.extend({
        options: {
            pulsing: false,
            smallIcon: false,
            accuracy: 0
        },

        initialize: function(latlng, options) {
            options = L.Util.setOptions(this, options);
            
            if (this.options.smallIcon) {
                this.options.icon = (options.pulsing ? iconPulsingSmall : iconSmall);
            } else {
                this.options.icon = (options.pulsing ? iconPulsing : icon);
            }
            
            this._accMarker = L.circle(latlng, this.options.accuracy, circleStyle);
        
            // call super
            L.Marker.prototype.initialize.call(this, latlng, this.options);
        
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
                this._accMarker = L.circle(this._latlng, accuracy, circleStyle).addTo(this._map);
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
})(window);
