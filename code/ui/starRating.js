class StarRating extends Sprite {
    constructor(x, y, maxStars = 5, size = 30) {
        super();
        this.x = x;
        this.y = y;
        this.maxStars = maxStars;
        this.size = size;
        this.percent = 0
        this.starSpacing = this.size * 1.2;
        this.width = this.starSpacing * this.maxStars;
        this.height = this.size;

        this.numberOfRating = 0;
        this.sumRatings= 0

        this.score = 0
    }

    update(sprites, keys, mouse) {
        return false;
    }

    updateScore(newRating, score) {
        console.log("newRating", newRating)
        this.sumRatings += newRating;
        this.numberOfRating++;
        this.score += score
        this.percent = (this.sumRatings / this.numberOfRating ) *100;
    }

    draw(ctx) {
        ctx.save();

        for (let i = 0; i < this.maxStars; i++) {
            this.drawStar(ctx, this.x + i * this.starSpacing, this.y, "#cccccc");
        }

        const starsToFill = (this.percent / 100) * this.maxStars;
        const fullStars = Math.floor(starsToFill);
        const partialStar = starsToFill - fullStars;

        for (let i = 0; i < fullStars; i++) {
            this.drawStar(ctx, this.x + i * this.starSpacing, this.y, "#FFD700");
        }

        if (partialStar > 0 && fullStars < this.maxStars) {
            this.drawPartialStar(ctx, this.x + fullStars * this.starSpacing, this.y, "#FFD700", partialStar);
        }

        ctx.fillStyle = "#000000";
        ctx.font = "20px Arial";
        ctx.textAlign = "left";
        ctx.fillText(`Score: ${this.score}`, this.x, this.y - this.size/2);

        ctx.restore();
    }

    drawStar(ctx, x, y, color) {
        const spikes = 5;
        const outerRadius = this.size / 2;
        const innerRadius = outerRadius * 0.4;

        ctx.beginPath();
        ctx.fillStyle = color;

        let rot = Math.PI / 2 * 3;
        let cx = x;
        let cy = y;
        let step = Math.PI / spikes;

        for (let i = 0; i < spikes; i++) {
            let x1 = cx + Math.cos(rot) * outerRadius;
            let y1 = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x1, y1);
            rot += step;

            let x2 = cx + Math.cos(rot) * innerRadius;
            let y2 = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x2, y2);
            rot += step;
        }

        ctx.closePath();
        ctx.fill();
    }

    drawPartialStar(ctx, x, y, color, percentage) {
        this.drawStar(ctx, x, y, "#cccccc");

        ctx.save();

        const clipWidth = this.size * percentage;
        ctx.beginPath();
        ctx.rect(x - this.size/2, y - this.size/2, clipWidth, this.size);
        ctx.clip();

        this.drawStar(ctx, x, y, color);

        ctx.restore();
    }
}