==================
Leaflet UserMarker
==================

UserMarker is a leaflet plugin for plotting a marker representing a user, 
or multiple users, on a map.

.. image:: https://images.weserv.nl/?url=static.longitude.me/img/opengraph-image.jpg
    :alt: longitude.me


Features
========

Leaflet UserMarker is an iOS style marker for representing users on a map. It 
extends Leaflet's `Marker <http://leafletjs.com/reference.html#marker>`_ class, 
so everything you can do with a normal marker - like setting lat/lng and binding 
popups - can be done with UserMarker's as well. In addition to this, UserMarker 
has the following features:

* Ability to set accuracy which will be displayed as a blue, transparent circle 
  around the marker.
* Turn on/off a "pulsing" effect that can be used to represent high accuracy, or 
  if a user is online.


See it in action
================

Leaflet UserMarker can be seen in action on `Longitude.me <http://longitude.me>`_.

You can also see the `bundled examples <http://heyman.github.com/leaflet-usermarker/example/>`_.


Example Code
============

**Create a user marker and add it to a map:**

.. code-block:: javascript

    var marker = L.userMarker([5.45, 70.56]);
    marker.addTo(map);
  
**Set accuracy on an existing marker:**

.. code-block:: javascript

    marker.setAccuracy(400); // 400 meters accuracy

**Create a "pulsing" marker with small icon and accuracy 100:**

.. code-block:: javascript

    var marker = L.userMarker(latlng, {pulsing:true, accuracy:100, smallIcon:true});
    marker.addTo(map);

**Locate the map viewers position and display a UserMarker:**

.. code-block:: javascript

    map.on("locationfound", function(location) {
        if (!marker)
            marker = L.userMarker(location.latlng).addTo(map);
        
        marker.setLatLng(location.latlng);
        marker.setAccuracy(location.accuracy);
    });
    map.locate({
        watch: false,
        locate: true,
        setView: true,
        enableHighAccuracy: true
    });


Author
======

Usermarker is developed by `Jonatan Heyman <http://heyman.info>`_. 

Another website of mine is `boutiquehotel.me <http://boutiquehotel.me>`_, which is a site for 
finding great `boutique hotels <http://boutiquehotel.me>`_ all around the world. For example, 
check out boutique hotels in `Stockholm <http://boutiquehotel.me/stockholm/>`_, 
`London <http://boutiquehotel.me/london/>`_, `New York <http://boutiquehotel.me/new-york/>`_, 
or `Berlin <http://boutiquehotel.me/berlin/>`_.


License
=======

MIT License
