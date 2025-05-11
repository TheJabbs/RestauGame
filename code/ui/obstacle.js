class Obstacle extends Sprite{
    constructor(x, y, width, height, color) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color
    }

    update(sprites, keys) {
        // No specific update logic for obstacles
        return false;
    }

    draw(ctx) {
        const baseColor = this.color || '#8b4513'; // Brown if no color specified

        // Wall gradient
        const gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.height);
        gradient.addColorStop(0, this.lightenColor(baseColor, 20));
        gradient.addColorStop(0.4, baseColor);
        gradient.addColorStop(1, this.darkenColor(baseColor, 20));

        ctx.fillStyle = gradient;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Create a brick pattern
        ctx.strokeStyle = this.darkenColor(baseColor, 30);
        ctx.lineWidth = 1;

        // Horizontal lines
        const brickHeight = 15;
        for (let y = 0; y < this.height; y += brickHeight) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y + y);
            ctx.lineTo(this.x + this.width, this.y + y);
            ctx.stroke();
        }

        // Vertical lines - offset every other row for brick pattern
        const brickWidth = 30;
        for (let y = 0; y < this.height; y += brickHeight * 2) {
            for (let x = 0; x < this.width; x += brickWidth) {
                // First row
                ctx.beginPath();
                ctx.moveTo(this.x + x, this.y + y);
                ctx.lineTo(this.x + x, this.y + y + brickHeight);
                ctx.stroke();

                // Second row - offset
                if (y + brickHeight < this.height) {
                    ctx.beginPath();
                    ctx.moveTo(this.x + x + brickWidth/2, this.y + y + brickHeight);
                    ctx.lineTo(this.x + x + brickWidth/2, this.y + y + brickHeight * 2);
                    ctx.stroke();
                }
            }
        }

        // Add highlight on top
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(this.x, this.y, this.width, 3);
    }

    // Helper methods for color manipulation
    hexToRgb(hex) {
        // Remove # if present
        hex = hex.replace(/^#/, '');

        // Parse hex values
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);

        return [r, g, b];
    }

    rgbToHex(r, g, b) {
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    lightenColor(color, amount) {
        const rgb = this.hexToRgb(color);
        rgb[0] = Math.min(255, rgb[0] + amount);
        rgb[1] = Math.min(255, rgb[1] + amount);
        rgb[2] = Math.min(255, rgb[2] + amount);
        return this.rgbToHex(rgb[0], rgb[1], rgb[2]);
    }

    darkenColor(color, amount) {
        const rgb = this.hexToRgb(color);
        rgb[0] = Math.max(0, rgb[0] - amount);
        rgb[1] = Math.max(0, rgb[1] - amount);
        rgb[2] = Math.max(0, rgb[2] - amount);
        return this.rgbToHex(rgb[0], rgb[1], rgb[2]);
    }
}