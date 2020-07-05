const points = [];

points.push(
    [[-4606.943359375,-53.942600250244],[-4606.943359375,-53.942600250244],[-4645.4985351563,-55.002620697021],[-5004.9638671875,-55.982479095459]]
    ,
    [[2761.5153808594,-699.63586425781],[2761.5153808594,-699.63586425781]]
)

for (let i = 0; i < points.length; i++) {
    drawPlaces(points[i]);
}

function drawPlaces(arr){
    let lastpos = arr[0];

    arr.forEach((element,i) => {
        if(i>arr.length)return;
        new L.Polyline([[lastpos[1],lastpos[0]],[element[1],element[0]]], {
            color: 'red',
            weight: 3,
            opacity: 0.5,
            smoothFactor: 1
        }).addTo(map);
        lastpos = element;
    });
    
}