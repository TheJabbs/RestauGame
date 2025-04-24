class NpcSpawner extends Sprite {
    constructor(sprites) {
        super();

        this.npcList = sprites.get('npc');
        this.npcBuffer = [];

        for (let i = 0; i < 10; i++) {
            let npc = new Npc(1100, 650  , 50, 50, 5);
            this.npcBuffer.push(npc);
        }

        for (let sprite of sprites.get('ui')) {
            if (sprite instanceof TimeManager) {
                this.timeManager = sprite;
            }
        }

        this.tables = [];
        for (let sprite of sprites.get('obstacle')) {
            if (sprite instanceof Table) {
                this.tables.push(sprite);
            }
        }

        this.maxActiveTable = 0;

        this.cooldown = 0;
    }

    update(sprite, key) {
        if (this.timeManager.hours >= 8 && this.timeManager.hours < 12) {
            this.maxActiveTable = Math.floor(this.tables.length / 2);
        } else if (this.timeManager.hours >= 12 && this.timeManager.hours < 16) {
            this.maxActiveTable = Math.floor(this.tables.length * 2 / 3);
        } else if (this.timeManager.hours >= 16 && this.timeManager.hours < 20) {
            this.maxActiveTable = Math.floor(this.tables.length / 2) + 1;
        } else if (this.timeManager.hours >= 20 && this.timeManager.hours < 24) {
            this.maxActiveTable = Math.floor(this.tables.length * 2 / 3) + 1;
        }

        this.cooldown++;


        if (this.countActiveTables() < this.maxActiveTable && this.cooldown  % 300 === 0) {
            if (this.npcBuffer.length > 0) {
                let table = this.getUnOccupiedTable();
                if (table) {
                    let npc = this.npcBuffer.pop();
                    if (npc) {
                        npc.setWhereToGo(table.x, table.y);
                        table.setNpc(npc);
                        table.isOccupied = true;
                        sprite.get('npc').push(npc);
                    }else{
                        console.log('no npc available')
                    }
                }
            }
        }
    }

    countActiveTables() {
        let count = 0;
        for (let table of this.tables) {
            if (table.isOccupied) {
                count++;
            }
        }
        return count;
    }

    getUnOccupiedTable() {
        //picks random unoccupied table
        let unOccupiedTables = this.tables.filter(table => !table.isOccupied);
        if (unOccupiedTables.length > 0) {
            let randomIndex = Math.floor(Math.random() * unOccupiedTables.length);
            return unOccupiedTables[randomIndex];
        }
        return null;
    }
}