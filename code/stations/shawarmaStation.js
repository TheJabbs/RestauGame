class ShawarmaStation extends Station{
    constructor(x, y, width, height, color, usageTime, usageExtraTime) {
        super(x, y, width, height, color || '#f6b691', usageTime || 8, usageExtraTime || 4);
    }

    update(sprites, keys) {
        super.update(sprites, keys);
        if(this.IsBurning){
            this.color = "#330d04";
        }
        if (this.IsCollectable) {
            this.color = "#b54400"
        }
    }

    draw(ctx) {
        // Draw base station
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Draw stand
        const standWidth = this.width * 0.8;
        const standHeight = this.height * 0.7;
        const standX = this.x + (this.width - standWidth) / 2;
        const standY = this.y + (this.height - standHeight) / 2;

        // Base of shawarma stand
        ctx.fillStyle = '#5e4c3c';
        ctx.fillRect(standX, standY + standHeight * 0.8, standWidth, standHeight * 0.2);

        // Shaft of shawarma stand
        ctx.fillStyle = '#333333';
        ctx.fillRect(
            standX + standWidth / 2 - 5,
            standY + standHeight * 0.3,
            10,
            standHeight * 0.5
        );

        // Shawarma meat cylinder
        const meatWidth = standWidth * 0.5;
        const meatHeight = standHeight * 0.6;
        const meatX = standX + (standWidth - meatWidth) / 2;
        const meatY = standY;

        // Meat color varies by state
        if (this.IsBurning) {
            ctx.fillStyle = '#330d04';
        } else if (this.IsCollectable) {
            ctx.fillStyle = '#b54400';
        } else if (this.IsActive) {
            ctx.fillStyle = '#d4854c';
        } else {
            ctx.fillStyle = '#e6a66b';
        }

        // Draw meat cylinder
        ctx.beginPath();
        ctx.ellipse(
            standX + standWidth / 2,
            meatY,
            meatWidth / 2,
            meatWidth / 4,
            0,
            0,
            2 * Math.PI
        );
        ctx.fill();
        ctx.fillRect(meatX, meatY, meatWidth, meatHeight);
        ctx.beginPath();
        ctx.ellipse(
            standX + standWidth / 2,
            meatY + meatHeight,
            meatWidth / 2,
            meatWidth / 4,
            0,
            0,
            2 * Math.PI
        );
        ctx.fill();

        // Draw some detail lines on the meat
        ctx.strokeStyle = this.IsBurning ? '#1a0702' : '#b86d2f';
        ctx.lineWidth = 1;
        for (let i = 1; i < 5; i++) {
            ctx.beginPath();
            ctx.moveTo(meatX, meatY + i * meatHeight / 5);
            ctx.lineTo(meatX + meatWidth, meatY + i * meatHeight / 5);
            ctx.stroke();
        }

        // Draw heat source at bottom
        if (this.IsActive) {
            ctx.fillStyle = '#ff6600';
            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                ctx.moveTo(meatX + meatWidth * 0.3 + i * meatWidth * 0.2, meatY + meatHeight + 5);
                ctx.lineTo(meatX + meatWidth * 0.4 + i * meatWidth * 0.2, meatY + meatHeight + 15);
                ctx.lineTo(meatX + meatWidth * 0.2 + i * meatWidth * 0.2, meatY + meatHeight + 15);
                ctx.fill();
            }
        }

        // Draw station state indicator
        if (this.IsActive && !this.IsCollectable) {
            const progress = Math.min(this.TimeActive / this.UsageTime, 1);
            ctx.fillStyle = progress > 0.8 ? '#ff0000' : '#00ff00';
            ctx.fillRect(this.x, this.y - 10, this.width * progress, 5);
        }
    }

    interact(hero) {
        if(super.interact(hero)){
            return
        }

        if (this.IsCollectable  && hero.heldItem === "" && hero.toolHeld === Var.Tools.KNIFE) {
            hero.heldItem = "chicken";
            const sound = new Audio(Var.Sounds.CUTTING)
            sound.play().catch(error => console.error('Error playing sound:', error));
            this.reset();
        }else if(this.IsCollectable  && hero.heldItem !== "" ){
            alert("Your hands are full!")
        }else if(this.IsCollectable && hero.toolHeld !== Var.Tools.KNIFE){
            alert("You need a knife to collect the shawarma!")
        } else if (this.IsCollectable && !this.IsBurning) {
            alert("Your hands are full!")
        }
        else {
            this.IsActive = true
            const sound = new Audio(Var.Sounds.TURNING)
            sound.play().catch(error => console.error('Error playing sound:', error));
        }
    }

    reset() {
        super.reset()
        this.color = '#f6b691';
    }
}