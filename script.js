// TypeText

let i = 0;
let text = "Desarrolladora Front End";
let speed = 100;

const typeWrite = () => {
    if (i < text.length) {
        document.querySelector('.hero-title').innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWrite, speed);
    } else {
        i = 0;
        document.querySelector('.hero-title').innerHTML = '';
        setTimeout(typeWrite, speed);
    }
}

typeWrite();

// Librería

new fullpage('#fullpage', {
    autoScrolling: true,
    scrollHorizontally: true,
    sectionsColor: ['#262451', '#10151d', '#10151d', '#10151d'],
    scrollOverflow: true,
    scrollOverflowOptions: {
        click: true,
        scrollbars: true,
        mouseWheel: true,
        interactiveScrollbars: true
    }
});

var granimInstance = new Granim({
    element: '#canvas-basic',
    direction: 'left-right',
    isPausedWhenNotInView: true,
    states: {
        "default-state": {
            gradients: [
                ['#ff9966', '#ff5e62'],
                ['#00F260', '#0575E6'],
                ['#e1eec3', '#f05053']
            ]
        }
    }
});