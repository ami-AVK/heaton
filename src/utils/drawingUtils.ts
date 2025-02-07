interface Point {
    x: number;
    y: number;
}

interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface Line {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

export function createRect({ x, y, width, height }: Rect): string {
    return `<rect x='${x}' y='${y}' width='${width}' height='${height}' stroke='currentColor' stroke-width='0.5%' fill="none"/>`;
}

export function createLine({ x1, y1, x2, y2 }: Line, strokeWidth = "0.5%",strokeOpacity=1.0): string {
    return `<line x1='${x1}' y1='${y1}' x2='${x2}' y2='${y2}' stroke='currentColor' stroke-opacity="${strokeOpacity}" stroke-width="${strokeWidth}" />`;
}

export function createCircle(x: number, y: number, radius: number): string {
    return `<circle cx='${x}' cy='${y}' r='${radius}' stroke='currentColor' stroke-width='0.5%' fill="none"/>`;
}

export function createPath(points: Point[]): string {
    const d = points.reduce((acc, point, index) => {
        return acc + `${index === 0 ? 'M' : 'L'} ${point.x},${point.y} `;
    }, '');
    return `<path d="${d}" stroke='currentColor' stroke-width='0.5%' fill="none"/>`;
}

export function createDimension(x1: number, y1: number, x2: number, y2: number, offset: number, text: string, fontSize = 3): string {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const perpendicular = angle + Math.PI / 2;
    const offsetX = Math.cos(perpendicular) * offset;
    const offsetY = Math.sin(perpendicular) * offset;
    
    const line1X = x1 + offsetX;
    const line1Y = y1 + offsetY;
    const line2X = x2 + offsetX;
    const line2Y = y2 + offsetY;
    
    return `
        ${createLine({ x1, y1, x2: x1 + offsetX, y2: y1 + offsetY },"1px",0.2)}
        ${createLine({ x1: line1X, y1: line1Y, x2: line2X, y2: line2Y },"1px",0.2)}
        ${createLine({ x1: x2, y1: y2, x2: line2X, y2: line2Y },"1px",0.2)}
        <text x='${(line1X + line2X) / 2}' y='${(line1Y + line2Y) / 2 - 2}' 
              text-anchor="middle" font-size="${fontSize}" fill="currentColor">${text}</text>
    `;
}

export function blend(shape1: string, shape2: string, operation: 'union' | 'intersect' | 'subtract' = 'union'): string {
    return `
        <g>
            <mask id="mask">
                <rect x="0" y="0" width="100%" height="100%" fill="white"/>
                ${shape1}
            </mask>
            <g mask="url(#mask)">
                ${shape2}
            </g>
        </g>
    `;
}

export function createRadiator(width: number, height: number, depth: number): string {
    const mainBody = createRect({ x: 10, y: 10, width: width - 20, height: height - 20 });
    const depthBody = createRect({ x: -10, y: 30, width: width - 20, height: height - 20 });
    // const centerLine = createLine({ x1: width/2, y1: 0, x2: width/2, y2: height });
    const dimensionWidth = createDimension(10, 10, width - 10, 10, -5, `${width} мм`, 10);
    const dimensionHeight = createDimension(width+30, 10, width+30, height - 10, -5, `${height} мм`, 10);
    
    return `
        ${mainBody}
        ${depthBody}
        ${dimensionWidth}
        ${dimensionHeight}
    `;
}