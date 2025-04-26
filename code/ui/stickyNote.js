class StickyNote extends Sprite{
    constructor() {
        super();
        this.x = 1300
        this.y = 0
        this.width = 800
        this.height = 400

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

        if (hero) {
            if(hero.hasKnife){
                this.isHolding = "knife"
            }

            if(hero.hasFireExtinguisher){
                this.isHolding = "fire extinguisher"
            }
        }


        return false;
    }

    draw(ctx) {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = "20px Arial";
        ctx.fillText("Sticky Note", this.x + 10, this.y + 30);
        ctx.fillText(`You are holding ${this.isHolding}`, this.x + 10, this.y + 60);
        ctx.fillText(`You are grabbing ${this.isGrabbing}`, this.x + 10, this.y + 90);
        ctx.fillText(`Orders:`, this.x + 10, this.y + 120);

        const lines = this.orders.split('\n');
        lines.forEach((line, index) => {
            ctx.fillText(line, this.x + 10, this.y + 150 + index * 20); // Adjust line spacing with index * 20
        });
    }
}