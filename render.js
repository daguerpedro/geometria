let canvas, screen

class point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw() {
        drawpixel(this.x, this.y)
    }
}

class vec2 { constructor(x, y) { this.x = x; this.y = y; } }

points = []

function line(origin, direction) {
    let d = document.getElementById('dbg').checked

    // Distância entre dois vetores 
    let steps = Math.sqrt(Math.pow((origin.x - direction.x), 2) + Math.pow((origin.y - direction.y), 2));

    // Precisamos criar T pontos, onde T é a Distância em pixels de 'origin' e 'direction'
    for (let T = 0; T < 1; T = T + (1 / steps)) {

        /*
        *   ESSA RETA É DEFINIDA PELA EQUAÇÃO VETORIAL DA RETA, USANDO OS CONCEITOS DE GEOMETRIA ANALÍTICA.
        *   (THIS LINE IS DEFINED BY THE VECTOR EQUATION OF THE LINE, USING THE CONCEPTS OF ANALYTIC GEOMETRY)
        *   
        *   PARA FORMAR UMA RETA É NECESSÁRIO:
        * 
        *   1- Um ponto e um Vetor diretor
        *               OU
        *   2- Dois pontos
        * 
        *   Seja 'P' um ponto distinto de 'G' e 't' um escalar utilizado para segmentar a reta através do tempo.  
        *   Definivmos o vetor diretor V como P em Direção à G, Logo (G - P)
        *   Dando origem a equação:
        *   
        *   (x, y) = p + t * v
        * 
        *   Isolando as coordenadas temos:
        * 
        *   x = Px + t * Vx
        *   y = Py + t * Vy         
        */

        x = (parseFloat(origin.x) + parseFloat(T * (direction.x - origin.x)))
        y = (parseFloat(origin.y) + parseFloat(T * (direction.y - origin.y)))
        if (d)
            console.log(`${origin.x} -> ${direction.x} = ${direction.x - origin.x} | Step: ${T * (direction.x - origin.x)} |= ${x}`)

        points.push(new point(x, y))
    }
}


window.addEventListener('load', () => {
    canvas = document.getElementById('cvas');
    screen = canvas.getContext('2d')

    aspectratio(800, 16 / 9)

    let color = 'red'
    let bcolor = document.getElementById('bc').value

    setInterval(() => {
        screen.fillStyle = bcolor
        screen.fillRect(0, 0, canvas.width, canvas.height)
        screen.fillStyle = color

        points.forEach(p => { p.draw(); })
    }, 1000 / 30); //30 FPS

    document.getElementById('cl').onclick = () => { points = [] }
    document.getElementById('ne').onclick = _nline;

    document.getElementById('fc').oninput = () => {
        color = document.getElementById('fc').value
    }

    document.getElementById('bc').oninput = () => {
        bcolor = document.getElementById('bc').value
    }

    function _nline() {
        let ox = document.getElementById('ox').value
        let oy = document.getElementById('oy').value

        let dx = document.getElementById('dx').value
        let dy = document.getElementById('dy').value

        line(new vec2(ox, oy), new vec2(dx, dy))
    }

    _nline();
})

drawpixel = (x, y) => {
    screen.fillRect(x, y, 1, 1)
}

aspectratio = (width, scale) => {
    let height = width / scale;

    canvas.width = width;
    canvas.height = height;

    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
}