const key = 'pk.eyJ1Ijoia2V2aW5sYW5pZXIxNSIsImEiOiJja25waXMxNGgwMml5Mm9uMDR2am5qMWM3In0.yq4ri_x1AqlgpwPMZp-o8g';

const options = {
  lat: 53.272801906183766,
  lng: -1.9249845649832393,
  zoom: 4,
  style: 'mapbox://styles/kevinlanier15/cknpiyg8a3day17p1qklcbzx6',
  pitch: 0
};

const mappa = new Mappa('MapboxGL', key);
let myMap;
let canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  gcs = loadTable('top_25_golf_courses_in_the_world.csv','csv','header');
}


function draw() {
 clear();
  fill(255);
 stroke(255);
 strokeWeight(2);
  const zoom = myMap.zoom();
 const athens = myMap.latLngToPixel(39.3292,-82.1013);


  for (let i = 0; i < gcs.getRowCount(); i++) {
    const latitude = Number(gcs.getString(i,'latitude'));
    const longitude = Number(gcs.getString(i,'longitude'));
    const pos = myMap.latLngToPixel(latitude,longitude);
    
         let address = gcs.getString(i,'location');

    
         ellipse(pos.x,pos.y,1 * myMap.zoom(),1 * myMap.zoom());
    strokeWeight(2);
    stroke(255);
    
 if(dist(pos.x,pos.y,mouseX,mouseY) < 1 * myMap.zoom()){
   fill(0)
    textSize(20);
   stroke(255);
   strokeWeight(2)
     text(address,pos.x,pos.y);
  }
    
  }
  
  
  
  
  print(zoom);

}


$(window).bind('resize', function(e)
{
  if (window.RT) clearTimeout(window.RT);
  window.RT = setTimeout(function()
  {
    this.location.reload(false); /* false to get page from cache */
  }, 200);
});
