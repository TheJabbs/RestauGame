class TrashBin extends Station{
    constructor(x, y, width, height, color, usageTime, usageExtraTime) {
        super(x, y, width, height, color, usageTime, usageExtraTime);
        this.color = color || '#741c00';
        this.isOccupied = false;
    }

    update(sprites, keys) {
        return false;
    }

    draw(ctx) {
        // Draw bin base
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Draw bin details
        const binWidth = this.width * 0.8;
        const binHeight = this.height * 0.9;
        const binX = this.x + (this.width - binWidth) / 2;
        const binY = this.y + (this.height - binHeight) / 2;

        // Draw trash bin body
        ctx.fillStyle = '#4d1a00';
        ctx.fillRect(binX, binY, binWidth, binHeight);

        // Draw trash lid
        ctx.fillStyle = '#2d1000';
        ctx.beginPath();
        ctx.moveTo(binX - 5, binY);
        ctx.lineTo(binX + binWidth + 5, binY);
        ctx.lineTo(binX + binWidth, binY + 10);
        ctx.lineTo(binX, binY + 10);
        ctx.closePath();
        ctx.fill();

        // Draw opening
        ctx.fillStyle = '#000000';
        ctx.fillRect(
            binX + binWidth * 0.25,
            binY + 2,
            binWidth * 0.5,
            6
        );

        // Draw some trash content if it contains items
        if (this.isOccupied) {
            ctx.fillStyle = '#888888';
            ctx.beginPath();
            ctx.moveTo(binX + binWidth * 0.3, binY + binHeight * 0.3);
            ctx.lineTo(binX + binWidth * 0.7, binY + binHeight * 0.4);
            ctx.lineTo(binX + binWidth * 0.5, binY + binHeight * 0.6);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = '#555555';
            ctx.fillRect(
                binX + binWidth * 0.2,
                binY + binHeight * 0.5,
                binWidth * 0.3,
                binHeight * 0.2
            );
        }

        // Draw recycle symbol
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        const centerX = binX + binWidth / 2;
        const centerY = binY + binHeight / 2;
        const radius = Math.min(binWidth, binHeight) / 5;

        // Draw three arrows in a triangle
        for (let i = 0; i < 3; i++) {
            const angle = (i * 2 * Math.PI / 3) - Math.PI / 2;
            const nextAngle = ((i + 1) * 2 * Math.PI / 3) - Math.PI / 2;

            ctx.beginPath();
            ctx.moveTo(
                centerX + radius * Math.cos(angle),
                centerY + radius * Math.sin(angle)
            );
            ctx.lineTo(
                centerX + radius * Math.cos(angle + Math.PI / 6),
                centerY + radius * Math.sin(angle + Math.PI / 6)
            );
            ctx.lineTo(
                centerX + radius * Math.cos(nextAngle - Math.PI / 6),
                centerY + radius * Math.sin(nextAngle - Math.PI / 6)
            );
            ctx.lineTo(
                centerX + radius * Math.cos(nextAngle),
                centerY + radius * Math.sin(nextAngle)
            );
            ctx.stroke();
        }
    }

    interact(hero){
        hero.heldItem = "";
        alert("Item discarded");
    }
}