class FriesStation extends Station {
    constructor(x, y, width, height, color, usageTime, usageExtraTime) {
        super(x, y, width, height, color || '#b8a229', usageTime || 10, usageExtraTime || 10);
    }

    update(sprites, keys) {
        super.update(sprites, keys);

        //make it chnage color depending on where it is to finish
        if (this.IsBurning) {
            this.color = '#741c00';
        }
        if (this.IsCollectable) {
            this.color = "yellow"
        }


        return false;
    }

    draw(ctx) {
        // Draw base station
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Draw fryer details
        const innerWidth = this.width * 0.8;
        const innerHeight = this.height * 0.7;
        const innerX = this.x + (this.width - innerWidth) / 2;
        const innerY = this.y + (this.height - innerHeight) / 3;

        // Draw fryer container
        ctx.fillStyle = this.IsBurning ? '#551500' : '#404040';
        ctx.fillRect(innerX, innerY, innerWidth, innerHeight);

        // Draw oil
        ctx.fillStyle = this.IsBurning ? '#b45c00' : '#f0d880';
        ctx.fillRect(innerX, innerY, innerWidth, innerHeight * 0.8);

        // Draw fries if ready
        if (this.IsCollectable) {
            // Draw multiple fries
            ctx.fillStyle = '#ffcd75';
            const friesWidth = innerWidth * 0.12;
            const friesCount = 5;
            const spacing = (innerWidth - friesCount * friesWidth) / (friesCount + 1);

            for (let i = 0; i < friesCount; i++) {
                const friesX = innerX + spacing + i * (friesWidth + spacing);
                ctx.fillRect(friesX, innerY + innerHeight * 0.2, friesWidth, innerHeight * 0.5);
            }
        }

        // Draw fryer handle on right side
        ctx.fillStyle = '#808080';
        ctx.fillRect(
            this.x + this.width * 0.85,
            this.y + this.height * 0.1,
            this.width * 0.1,
            this.height * 0.3
        );

        // Draw station state indicator
        if (this.IsActive && !this.IsCollectable) {
            const progress = Math.min(this.TimeActive / this.UsageTime, 1);
            ctx.fillStyle = '#00ff00';
            ctx.fillRect(this.x, this.y - 10, this.width * progress, 5);
        }
    }


    interact(hero) {
        if(super.interact(hero)){
            return
        }

        if (this.IsCollectable && !this.IsBurning && hero.heldItem === "") {
            hero.heldItem = "Fries";
            alert("Fries collected");
            this.reset();
        } else if (this.IsCollectable && !this.IsBurning) {
            alert("Your hands are full!")
        } else {
            this.IsActive = true
            const sound = new Audio(Var.Sounds.FRYING)
            sound.play().catch(error => console.error('Error playing sound:', error));
        }
    }

    reset() {
        super.reset()
        this.color = '#8f8f8f';
    }
}