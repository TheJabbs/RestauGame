class StartMenu extends Sprite {
    constructor(x, y, width, height, game) {
        super();

        const sound = new Audio(Var.Sounds.INTRO);
        sound.play().catch(error => console.error('Error playing sound:', error));

        this.game = game

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.active = true;
        this.showingHowToPlay = false;

        // Game states
        this.MENU_STATE = "menu";
        this.HOW_TO_PLAY_STATE = "howToPlay";
        this.currentState = this.MENU_STATE;

        // Create buttons
        this.buttons = {
            start: new MenuButton(
                this.width / 2 - 100,
                this.height / 2 - 25,
                200,
                50,
                'Start Game',
                '#4CAF50',
                '#45a049',
                'white'
            ),
            howToPlay: new MenuButton(
                this.width / 2 - 100,
                this.height / 2 + 50,
                200,
                50,
                'How to Play',
                '#2196F3',
                '#0b7dda',
                'white'
            ),
            back: new MenuButton(
                this.width / 2 - 100,
                this.height - 100,
                200,
                50,
                'Back to Menu',
                '#f44336',
                '#d32f2f',
                'white'
            )
        };

        // Game title and restaurant name
        this.title = "Nini's Restaurant";
        this.restaurantName = "Shukran Habibi";

        // How to play instructions
        this.howToPlayInstructions = [
            "Welcome to Chef's Delight Restaurant!",
            "",
            "How to Play:",
            "1. Use WASD or arrow keys to move your character",
            "2. Approach food stations to interact with press E",
            "3. Deliver the correct food items to customers at tables",
            "4. Serve customers before they run out of patience",
            "5. Each successful order increases your score",
            "6. Try to get the highest star rating possible!",
            "",
            "Food Stations:",
            "- Pizza Counter: Serves different types of pizzas",
            "- Fries Station: Quick to serve fries",
            "- Shawarma Stand: Make custom shawarma orders",
            "- Soda Fountain: For drink orders",
            "",
            "Tips:",
            "- Prioritize customers with low patience",
            "- Remember that some orders take longer to prepare",
            "- Keep an eye on your star rating to track performance"
        ];
    }

    update(sprites, keys, mouse) {
        // Check for mouse input if provided
        if (mouse && mouse.clicked) {
            this.handleClick(mouse.x, mouse.y);
            mouse.clicked = false; // Reset the click state
        }

        if (mouse) {
            this.updateButtonStates(mouse.x, mouse.y);
        }

        return !this.active; // Return true when menu should be removed
    }

    updateButtonStates(mouseX, mouseY) {
        // Update hover states for buttons based on current state
        if (this.currentState === this.MENU_STATE) {
            this.buttons.start.isHovered = this.isPointInButton(mouseX, mouseY, this.buttons.start);
            this.buttons.howToPlay.isHovered = this.isPointInButton(mouseX, mouseY, this.buttons.howToPlay);
        } else if (this.currentState === this.HOW_TO_PLAY_STATE) {
            this.buttons.back.isHovered = this.isPointInButton(mouseX, mouseY, this.buttons.back);
        }
    }

    handleClick(mouseX, mouseY) {
        if (!this.active) return;

        if (this.currentState === this.HOW_TO_PLAY_STATE) {
            // Back button in How to Play screen
            if (this.isPointInButton(mouseX, mouseY, this.buttons.back)) {
                this.currentState = this.MENU_STATE;
            }
        } else {
            // Start button in main menu
            if (this.isPointInButton(mouseX, mouseY, this.buttons.start)) {
                this.active = false;
                console.log("Game started!");
                game.nextLevel()
            }

            // How to Play button in main menu
            if (this.isPointInButton(mouseX, mouseY, this.buttons.howToPlay)) {
                this.currentState = this.HOW_TO_PLAY_STATE;
            }
        }
    }

    isPointInButton(x, y, button) {
        return x >= button.x &&
            x <= button.x + button.width &&
            y >= button.y &&
            y <= button.y + button.height;
    }

    draw(ctx) {
        if (!this.active) return;

        // Clear the canvas area
        ctx.fillStyle = '#f5f5f5';
        ctx.fillRect(this.x, this.y, this.width, this.height);

        if (this.currentState === this.HOW_TO_PLAY_STATE) {
            this.drawHowToPlay(ctx);
        } else {
            this.drawMainMenu(ctx);
        }
    }

    drawMainMenu(ctx) {
        // Draw game title
        ctx.fillStyle = '#333';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.title, this.width / 2, 120);

        // Draw restaurant name
        ctx.fillStyle = '#555';
        ctx.font = 'italic 32px Arial';
        ctx.fillText(this.restaurantName, this.width / 2, 170);

        // Draw decorative food icons
        this.drawFoodIcons(ctx);

        // Draw buttons
        this.buttons.start.draw(ctx);
        this.buttons.howToPlay.draw(ctx);

        // Draw footer text
        ctx.fillStyle = '#777';
        ctx.font = '14px Arial';
        ctx.fillText('© 2025 NIni Restaurant ', this.width / 2, this.height - 20);
    }

    drawHowToPlay(ctx) {
        // Draw title
        ctx.fillStyle = '#333';
        ctx.font = 'bold 36px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('How to Play', this.width / 2, 80);

        // Draw instructions
        ctx.font = '16px Arial';
        ctx.textAlign = 'left';
        ctx.fillStyle = '#333';

        const startY = 130;
        const lineHeight = 24;

        this.howToPlayInstructions.forEach((line, index) => {
            ctx.fillText(line, 100, startY + (index * lineHeight));
        });

        // Draw back button
        this.buttons.back.draw(ctx);
    }

    drawFoodIcons(ctx) {
        // Simple food icon drawings

        // Pizza icon
        ctx.beginPath();
        ctx.arc(this.width / 4, 250, 30, 0, Math.PI * 2);
        ctx.fillStyle = '#FFC107';
        ctx.fill();
        ctx.strokeStyle = '#D84315';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw pizza slices
        ctx.beginPath();
        ctx.moveTo(this.width / 4, 250);
        ctx.lineTo(this.width / 4 + 30, 250);
        ctx.moveTo(this.width / 4, 250);
        ctx.lineTo(this.width / 4, 250 - 30);
        ctx.moveTo(this.width / 4, 250);
        ctx.lineTo(this.width / 4 - 21, 250 - 21);
        ctx.strokeStyle = '#D84315';
        ctx.stroke();

        // Soda icon
        ctx.fillStyle = '#2196F3';
        ctx.fillRect(this.width * 3/4 - 15, 230, 30, 40);
        ctx.fillStyle = '#BBDEFB';
        ctx.fillRect(this.width * 3/4 - 15, 230, 30, 10);

        // Straw
        ctx.fillStyle = '#F44336';
        ctx.fillRect(this.width * 3/4 + 5, 220, 5, 25);

        // Fries icon
        ctx.fillStyle = '#FFD54F';
        ctx.fillRect(this.width / 2 - 20, 235, 40, 30);

        // Draw fries
        for (let i = 0; i < 5; i++) {
            ctx.fillStyle = '#FFC107';
            ctx.fillRect(this.width / 2 - 15 + i * 7, 220, 5, 25);
        }
    }
}

// Button class for menu items
class MenuButton {
    constructor(x, y, width, height, text, color, hoverColor, textColor) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.color = color;
        this.hoverColor = hoverColor;
        this.textColor = textColor;
        this.isHovered = false;
    }

    draw(ctx) {
        // Draw button background
        ctx.fillStyle = this.isHovered ? this.hoverColor : this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Draw button text
        ctx.fillStyle = this.textColor;
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);

        // Draw button border
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}