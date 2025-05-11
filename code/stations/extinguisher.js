class Extinguisher extends Station {
    constructor(x, y, width, height, color, usageTime, usageExtraTime) {
        super(x, y, width, height, color || '#ff2020', 0, 0);
    }

    update(sprites, keys) {
    }

    draw(ctx) {
        // Save the current context state
        ctx.save();

        // Define colors
        const bodyColor = '#FF0000';  // Red for the main body
        const nozzleColor = '#333333'; // Dark gray for nozzle
        const handleColor = '#222222'; // Almost black for handle
        const metalRingColor = '#CCCCCC'; // Light gray for metal parts

        // Body dimensions
        const bodyWidth = this.width * 0.8;
        const bodyHeight = this.height * 0.85;
        const bodyX = this.x + (this.width - bodyWidth) / 2;
        const bodyY = this.y + (this.height - bodyHeight) / 2;

        // Draw the main body of the extinguisher (cylinder)
        ctx.fillStyle = bodyColor;

        // Create cylinder-like shape
        ctx.beginPath();
        // Bottom ellipse
        ctx.ellipse(
            bodyX + bodyWidth / 2,
            bodyY + bodyHeight - bodyWidth / 4,
            bodyWidth / 2,
            bodyWidth / 4,
            0, 0, Math.PI * 2
        );
        ctx.fill();

        // Rectangle body
        ctx.fillRect(
            bodyX,
            bodyY + bodyWidth / 4,
            bodyWidth,
            bodyHeight - bodyWidth / 2
        );

        // Top rounded part
        ctx.beginPath();
        ctx.ellipse(
            bodyX + bodyWidth / 2,
            bodyY + bodyWidth / 4,
            bodyWidth / 2,
            bodyWidth / 4,
            0, 0, Math.PI * 2
        );
        ctx.fill();

        // Draw the neck/top narrow part
        const neckWidth = bodyWidth * 0.4;
        const neckHeight = bodyHeight * 0.15;
        const neckX = bodyX + (bodyWidth - neckWidth) / 2;
        const neckY = bodyY - neckHeight;

        ctx.fillStyle = metalRingColor;
        ctx.fillRect(neckX, neckY, neckWidth, neckHeight);

        // Draw handle
        const handleWidth = bodyWidth * 0.6;
        const handleHeight = bodyHeight * 0.2;
        const handleX = bodyX + (bodyWidth - handleWidth) / 2;
        const handleY = bodyY + bodyHeight * 0.25;

        ctx.fillStyle = handleColor;
        ctx.fillRect(handleX, handleY, handleWidth, handleHeight * 0.3);

        // Draw nozzle/hose
        const hoseWidth = bodyWidth * 0.2;
        const hoseStartX = bodyX + bodyWidth * 0.8;
        const hoseStartY = bodyY + bodyHeight * 0.3;

        ctx.fillStyle = nozzleColor;
        ctx.beginPath();
        ctx.moveTo(hoseStartX, hoseStartY);
        ctx.lineTo(hoseStartX + bodyWidth * 0.3, hoseStartY);
        ctx.lineTo(hoseStartX + bodyWidth * 0.3, hoseStartY - bodyHeight * 0.3);
        ctx.lineTo(hoseStartX + bodyWidth * 0.3 + hoseWidth, hoseStartY - bodyHeight * 0.3);
        ctx.lineWidth = hoseWidth;
        ctx.strokeStyle = nozzleColor;
        ctx.stroke();

        // Draw pressure gauge
        const gaugeRadius = bodyWidth * 0.15;
        const gaugeX = bodyX + bodyWidth / 2;
        const gaugeY = bodyY + bodyHeight * 0.6;

        ctx.beginPath();
        ctx.arc(gaugeX, gaugeY, gaugeRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.strokeStyle = metalRingColor;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw gauge needle
        ctx.beginPath();
        ctx.moveTo(gaugeX, gaugeY);
        ctx.lineTo(gaugeX + gaugeRadius * 0.8, gaugeY - gaugeRadius * 0.3);
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Add label text
        ctx.font = `${Math.floor(bodyWidth * 0.25)}px Arial`;
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText('FIRE', bodyX + bodyWidth / 2, bodyY + bodyHeight * 0.4);
        ctx.fillText('EXT', bodyX + bodyWidth / 2, bodyY + bodyHeight * 0.5);

        // Add metallic sheen/highlight
        const gradient = ctx.createLinearGradient(
            bodyX, bodyY,
            bodyX + bodyWidth, bodyY + bodyHeight
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');

        ctx.fillStyle = gradient;
        ctx.fillRect(bodyX, bodyY + bodyWidth / 4, bodyWidth, bodyHeight - bodyWidth / 2);

        // Draw outline for definition
        ctx.strokeStyle = '#990000';  // Darker red
        ctx.lineWidth = 1;
        ctx.strokeRect(bodyX, bodyY + bodyWidth / 4, bodyWidth, bodyHeight - bodyWidth / 2);

        // Restore the context state
        ctx.restore();
    }

    interact(hero) {
        if (hero.heldItem === "")
            hero.toolHeld = Var.Tools.FIRE_EXTINGUISHER;
        else{
            alert("You need both hands!!! drop whatever food you are holding")
        }
    }

    reset() {
        super.reset()
        this.color = '#8f8f8f';
        this.IsActive = true;
    }
}