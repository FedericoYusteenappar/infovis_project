let innerWidth = window.innerWidth;
let innerHeight = window.innerHeight;
let defaultSpiderWidth = 50;
let defaultSpiderHeight = 50;

let svgContainer = d3.select('body')
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%');

let spiders = d3.range(20).map(function() {

    let maxXPosition = (innerWidth - defaultSpiderWidth);
    let maxYPosition = (innerHeight - defaultSpiderHeight);
    return {

        x : Math.round(Math.random() * maxXPosition),
        y : Math.round(Math.random() * maxYPosition),
        w : defaultSpiderWidth,
        h : defaultSpiderHeight,
        r : Math.round(Math.random() * 360),
    };
});



 svgContainer.selectAll('image')
    .data(spiders)
    .enter()
    .append("svg:image")
    .attr('xlink:href', "img/spider.svg")
    .attr('width', function (spider) {
        return spider.w;
    })
    .attr('height', function (spider) {
        return spider.h;
    })
    .attr('posX', function (spider) {
        return spider.x;
    })
    .attr('posY', function (spider) {
        return spider.y;
    })
    .attr('rotation', function (spider) {
        return spider.r;
    })
    .attr('transform', function (spider) {
        return 'translate(' + spider.x + ',' + spider.y + ') rotate(' + spider.r + ',' + (spider.w / 2) + ',' + (spider.h / 2) + ')'
    })
     .on("dblclick", doubleclicked)
     .call(d3.drag()
     .on("start", dragstarted)
     .on("drag", dragged)
     .on("end", dragended));


function dragstarted(d) {

}

function dragged(d) {
    if (d3.event.defaultPrevented) return; // dragged

    d3.select(this).attr("posX", d.x = d3.event.x).attr("posY", d.y = d3.event.y).attr('transform', function (spider) {
        return 'translate(' + spider.x + ',' + spider.y + ') rotate(' + spider.r + ',' + (spider.w / 2) + ',' + (spider.h / 2) + ')'
    });
}

function dragended() {
        d3.select(this).classed("draggable", false);
}
function doubleclicked(d) {
    d3.select(this).attr("width", d.w = defaultSpiderWidth/1.5).attr("height", d.h = defaultSpiderHeight/1.5).attr('transform', function (spider) {
        return 'translate(' + spider.x + ',' + spider.y + ') rotate(' + spider.r + ',' + (spider.w / 2) + ',' + (spider.h / 2) + ')'
    });
}


