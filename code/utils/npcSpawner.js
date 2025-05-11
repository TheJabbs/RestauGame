class NpcSpawner extends Sprite {
    constructor(sprites, game) {
        super();
        this.game = game
        this.npcBuffer = [];

        for (let i = 0; i < 10; i++) {
            let npc = new Npc(1100, 650, 50, 50, 5);
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
        const hour = this.timeManager.hours;
        const totalTables = this.tables.length;

        if (hour >= 8 && hour < 12) {
            this.maxActiveTable = Math.floor(totalTables / 2);
        } else if (hour >= 12 && hour < 16) {
            this.maxActiveTable = Math.floor((2 / 3) * totalTables);
        } else if (hour >= 16 && hour < 20) {
            this.maxActiveTable = Math.floor(totalTables / 2) + 1;
        } else if (hour >= 20 && hour < 24) {
            this.maxActiveTable = Math.floor((2 / 3) * totalTables) + 1;
        }

        this.cooldown++;

        // Get time manager
        const timerMng = sprite.get('ui').find(o => o instanceof TimeManager);
        const currentTime = timerMng?.getTime() ?? "";

        // Clear buffer at midnight
        if (currentTime === "24:00") {
            this.npcBuffer = [];
            return;
        }

        const needNpc = this.countActiveTables() < this.maxActiveTable && this.cooldown % 300 === 0;

        if (needNpc) {
            if (this.npcBuffer.length > 0) {
                const table = this.getUnOccupiedTable();
                if (table) {
                    const npc = this.npcBuffer.pop();
                    npc.setWhereToGo(table.x, table.y);
                    sprite.get('npc').push(npc);
                    table.setNpc(npc);
                    table.isOccupied = true;
                }
            } else {
                for (let i = 0; i < 10; i++) {
                    const npc = new Npc(1100, 650, 50, 50, 5);
                    this.npcBuffer.push(npc);
                }

                if (sprite.get('npc').length === 0) {
                    alert("Game Over!");
                    this.game.previousLevel();
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