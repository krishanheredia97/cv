// Color manipulation functions
function adjustBrightness(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Mathematical calculations for positioning bubbles
function calculateAngle(index, totalBubbles) {
    return (index / totalBubbles) * 2 * Math.PI;
}

function calculateDistance(baseDistance, time, index) {
    return baseDistance + Math.sin(time * 0.0002 + index) * 30;
}

function calculatePosition(angle, distance, centerX, centerY, bubbleWidth, bubbleHeight) {
    const x = centerX + distance * Math.cos(angle) - bubbleWidth / 2;
    const y = centerY + distance * Math.sin(angle) - bubbleHeight / 2;
    return { x, y };
}

