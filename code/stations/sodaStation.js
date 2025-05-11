class SodaStation extends Station{
    constructor(x, y, width, height, color, usageTime, usageExtraTime) {
        super(x, y, width, height, color || '#0a3e9a', usageTime || 10, usageExtraTime || 0);
        this.IsActive = true
    }

    update(sprites, keys) {
        super.update(sprites, keys);

        if (this.IsCollectable) {
            this.color = "#609bff"
        }
    }

    draw(ctx) {
        // Draw base station
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Draw soda machine
        const machineWidth = this.width * 0.8;
        const machineHeight = this.height * 0.9;
        const machineX = this.x + (this.width - machineWidth) / 2;
        const machineY = this.y + (this.height - machineHeight) / 2;

        // Machine body
        ctx.fillStyle = '#444444';
        ctx.fillRect(machineX, machineY, machineWidth, machineHeight);

        // Display panel
        ctx.fillStyle = '#222222';
        ctx.fillRect(
            machineX + machineWidth * 0.1,
            machineY + machineHeight * 0.1,
            machineWidth * 0.8,
            machineHeight * 0.2
        );

        // Buttons (3 soda types)
        const buttonColors = ['#ff0000', '#ffa500', '#00ff00'];
        const buttonWidth = machineWidth * 0.2;
        const buttonSpacing = (machineWidth - buttonWidth * 3) / 4;

        for (let i = 0; i < 3; i++) {
            ctx.fillStyle = buttonColors[i];
            ctx.fillRect(
                machineX + buttonSpacing + i * (buttonWidth + buttonSpacing),
                machineY + machineHeight * 0.4,
                buttonWidth,
                machineHeight * 0.1
            );
        }

        // Cup area
        ctx.fillStyle = '#333333';
        ctx.fillRect(
            machineX + machineWidth * 0.3,
            machineY + machineHeight * 0.6,
            machineWidth * 0.4,
            machineHeight * 0.3
        );

        // Draw cup if collectible
        if (this.IsCollectable) {
            // Cup
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.moveTo(
                machineX + machineWidth * 0.35,
                machineY + machineHeight * 0.65
            );
            ctx.lineTo(
                machineX + machineWidth * 0.35,
                machineY + machineHeight * 0.85
            );
            ctx.lineTo(
                machineX + machineWidth * 0.65,
                machineY + machineHeight * 0.85
            );
            ctx.lineTo(
                machineX + machineWidth * 0.65,
                machineY + machineHeight * 0.65
            );
            ctx.fill();

            // Soda in cup
            ctx.fillStyle = '#aa5500';
            ctx.fillRect(
                machineX + machineWidth * 0.35,
                machineY + machineHeight * 0.7,
                machineWidth * 0.3,
                machineHeight * 0.15
            );

            // Bubbles
            ctx.fillStyle = '#ffffff';
            for (let i = 0; i < 5; i++) {
                ctx.beginPath();
                ctx.arc(
                    machineX + machineWidth * (0.4 + i * 0.05),
                    machineY + machineHeight * 0.73,
                    2,
                    0,
                    2 * Math.PI
                );
                ctx.fill();
            }
        }

        // Draw station state indicator
        if (this.IsActive && !this.IsCollectable) {
            const progress = Math.min(this.TimeActive / this.UsageTime, 1);
            ctx.fillStyle = '#00ff00';
            ctx.fillRect(this.x, this.y - 10, this.width * progress, 5);
        }
    }

    interact(hero) {
        super.interact(hero);
        if (this.IsCollectable  && hero.heldItem === "") {
            hero.heldItem = "Soda";
            alert("Soda collected");
            this.reset();
            const sound = new Audio(Var.Sounds.POURING)
            sound.play().catch(error => console.error('Error playing sound:', error));
        } else if (this.IsCollectable && !this.IsBurning) {
            alert("Your hands are full!")
        }
    }

    reset() {
        super.reset()
        this.color = '#8f8f8f';
        this.IsActive = true;
    }
}