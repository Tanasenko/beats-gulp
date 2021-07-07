(function () {
    let myMap;

const init = () =>{
    myMap = new ymaps.Map('map', {
        center: [59.918072, 30.304908],
        zoom: 11,
        controls: []
    });

    const coords = [
        [60.007297, 30.260194],
        [60.021528, 30.406265],
        [59.924412, 30.298556],
        [59.934008, 30.434944],
        [59.888880, 30.380771]
    ];

    const myCollection = new ymaps.GeoObjectCollection({}, {
        draggable: false,
        iconLayout: 'default#image',
        iconImageHref: './img/map/marker.png',
        iconImageSize: [30, 42],
        iconImageOffset: [-3, -42]
    });

    coords.forEach(coord =>{
        myCollection.add(new ymaps.Placemark(coord));
    });

    myMap.geoObjects.add(myCollection);

    myMap.behaviors.disable('scrollZoom');
} 

ymaps.ready(init);
})
