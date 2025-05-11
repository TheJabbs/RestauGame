class StickyNote extends Sprite{
    constructor() {
        super();
        this.x = 1300
        this.y = 0
        this.width = 800
        this.height = 400
        this.noteColor = 'yellow'

        this.isHolding = "nothing"
        this.isGrabbing = "nothing"
        this.orders =""
    }

    update(sprites, keys) {
        let tables = sprites.get("obstacle").filter(o => o instanceof Table && o.isOccupied);
        let hero = sprites.get("character").find(o => o instanceof Hero);

        let orderList = ''
        tables.forEach(o => {
            if (o.npc) {
                orderList += `Table ${o.number} - ${Math.floor(o.npc.patience / 100)}  ${o.npc.order} \n`;
            }
        })
        this.orders = orderList

        this.isHolding = hero.toolHeld === "" ? "nothing" : hero.toolHeld
        this.isGrabbing = hero.heldItem === "" ? "nothing" : hero.heldItem


        return false;
    }

    draw(ctx) {
        ctx.save();

        // Apply slight rotation for a more dynamic look
        ctx.translate(this.x + this.width/2, this.y + this.height/2);
        ctx.rotate(this.angle);

        // Draw shadow
        ctx.fillStyle = `rgba(0, 0, 0, ${this.shadowOpacity})`;
        ctx.fillRect(-this.width/2 + 5, -this.height/2 + 5, this.width, this.height);

        // Draw main sticky note with slight gradient
        const gradient = ctx.createLinearGradient(-this.width/2, -this.height/2, this.width/2, this.height/2);
        gradient.addColorStop(0, this.noteColor);
        gradient.addColorStop(0.8, "#fff4a0");
        gradient.addColorStop(1, "#ffe762");

        ctx.fillStyle = gradient;
        ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);

        // Draw folded corner effect
        ctx.fillStyle = "#ffe245";
        ctx.beginPath();
        ctx.moveTo(this.width/2 - 30, -this.height/2);
        ctx.lineTo(this.width/2, -this.height/2 + 30);
        ctx.lineTo(this.width/2, -this.height/2);
        ctx.closePath();
        ctx.fill();

        // Draw darker triangle for fold shadow
        ctx.fillStyle = "#e6cb3e";
        ctx.beginPath();
        ctx.moveTo(this.width/2 - 30, -this.height/2);
        ctx.lineTo(this.width/2 - 5, -this.height/2 + 25);
        ctx.lineTo(this.width/2, -this.height/2 + 30);
        ctx.lineTo(this.width/2 - 30, -this.height/2);
        ctx.closePath();
        ctx.fill();

        // Draw subtle lines mimicking paper texture
        ctx.strokeStyle = "rgba(0, 0, 0, 0.03)";
        ctx.lineWidth = 1;
        for (let i = 0; i < this.height; i += 12) {
            ctx.beginPath();
            ctx.moveTo(-this.width/2, -this.height/2 + i);
            ctx.lineTo(this.width/2, -this.height/2 + i);
            ctx.stroke();
        }

        // Draw pin at top
        ctx.fillStyle = "#ff3333";
        ctx.beginPath();
        ctx.arc(0, -this.height/2 + 15, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(0, -this.height/2 + 15, 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw title with shadow effect
        ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        ctx.font = "bold 26px Comic Sans MS, cursive";
        ctx.textAlign = "center";
        ctx.fillText("Orders & Inventory", 2, -this.height/2 + 52);

        ctx.fillStyle = "#d02323";
        ctx.fillText("Orders & Inventory", 0, -this.height/2 + 50);

        // Draw content with a handwritten-like font
        ctx.textAlign = "left";
        ctx.font = "20px Comic Sans MS, cursive";

        // Draw holding/grabbing info as checklists
        this.drawChecklistItem(ctx, -this.width/2 + 30, -this.height/2 + 90, "Holding:", this.isHolding);
        this.drawChecklistItem(ctx, -this.width/2 + 30, -this.height/2 + 130, "Grabbing:", this.isGrabbing);

        // Draw orders header
        ctx.fillStyle = "#254076";
        ctx.font = "bold 22px Comic Sans MS, cursive";
        ctx.fillText("Current Orders:", -this.width/2 + 30, -this.height/2 + 180);

        // Draw actual orders in a more organized format
        const lines = this.orders.split('\n');
        ctx.font = "20px Comic Sans MS, cursive";
        ctx.fillStyle = "#333333";

        lines.forEach((line, index) => {
            if (line.trim() === '') return;

            // Extract table number and order
            const tableMatch = line.match(/Table (\d+) - (\d+) (.*)/);
            if (tableMatch) {
                const tableNum = tableMatch[1];
                const patience = tableMatch[2];
                const order = tableMatch[3];

                // Draw table number with colored circle
                ctx.fillStyle = "#3a5998";
                ctx.beginPath();
                ctx.arc(-this.width/2 + 40, -this.height/2 + 210 + index * 30, 12, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = "#ffffff";
                ctx.font = "bold 16px Arial";
                ctx.textAlign = "center";
                ctx.fillText(tableNum, -this.width/2 + 40, -this.height/2 + 215 + index * 30);
                ctx.textAlign = "left";

                // Draw patience meter
                const patienceWidth = 50;
                const patienceHeight = 10;
                ctx.fillStyle = "#dddddd";
                ctx.fillRect(-this.width/2 + 60, -this.height/2 + 210 + index * 30, patienceWidth, patienceHeight);

                // Patience level color coded
                const patienceValue = parseInt(patience);
                let patienceColor = "#33cc33"; // Green for high patience
                if (patienceValue < 50) {
                    patienceColor = "#ff9900"; // Orange for medium patience
                }
                if (patienceValue < 25) {
                    patienceColor = "#cc3300"; // Red for low patience
                }

                ctx.fillStyle = patienceColor;
                ctx.fillRect(-this.width/2 + 60, -this.height/2 + 210 + index * 30,
                    (patienceValue / 100) * patienceWidth, patienceHeight);

                // Draw order text
                ctx.fillStyle = "#333333";
                ctx.font = "20px Comic Sans MS, cursive";
                ctx.fillText(order, -this.width/2 + 120, -this.height/2 + 215 + index * 30);
            } else {
                // Fallback if pattern doesn't match
                ctx.fillText(line, -this.width/2 + 40, -this.height/2 + 215 + index * 30);
            }
        });

        ctx.restore();
    }

    drawChecklistItem(ctx, x, y, label, value) {
        // Draw checkbox
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x, y - 15, 20, 20);
        ctx.strokeStyle = "#555555";
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y - 15, 20, 20);

        // If not "nothing", draw a check
        if (value !== "nothing") {
            ctx.strokeStyle = "#33cc33";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(x + 3, y - 5);
            ctx.lineTo(x + 8, y);
            ctx.lineTo(x + 17, y - 10);
            ctx.stroke();
        }

        // Draw label and value
        ctx.fillStyle = "#333333";
        ctx.font = "20px Comic Sans MS, cursive";
        ctx.fillText(`${label} ${value}`, x + 30, y);
    }
}