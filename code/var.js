class Var {
    static Tools = {
        KNIFE: "knife",
        WOODEN_PLATE: "Wooden Plate",
        FIRE_EXTINGUISHER: "Fire Extinguisher"
    }

    static Sounds = {
        ANGRY: [
            "resources/assets/sounds/3AMO BADE EKOL.m4a",
            "resources/assets/sounds/fut aa facebook.m4a",
            "resources/assets/sounds/ya dani je3na.m4a",
            "resources/assets/sounds/wein saret al talabiye.m4a",
            "resources/assets/sounds/serry serry wein seret.m4a"
        ],
        THANKS: [
            "resources/assets/sounds/shukran habibe.m4a",
            "resources/assets/sounds/Habibi ya ghale.m4a"
        ],
        DRINKING: "resources/assets/sounds/water drinking.m4a",
        POURING: "resources/assets/sounds/water pouring.m4a",
        CUTTING: "resources/assets/sounds/shawarma cutting.m4a",
        TURNING: "resources/assets/sounds/shawarma aam yebrom.m4a",
        TOPPING: [
            "resources/assets/sounds/sauce 1.m4a",
            "resources/assets/sounds/sauce 2.m4a"
        ],
        IN: "resources/assets/sounds/in.m4a",
        OUT: "resources/assets/sounds/out.m4a",
        FRYING: "resources/assets/sounds/frying.m4a",
        BURNING: "resources/assets/sounds/frying burning.m4a",
        FIRE_EXTINGUISHER: "resources/assets/sounds/fire pushh.m4a",
        CLICK: "resources/assets/sounds/click.m4a",
        INTRO: "resources/assets/sounds/intro music.m4a"
    }

    static pizzaFormula = {
        "Peperoni Pizza (uncooked)": ["doe", "sauce", "cheese", "pepperoni"],
        "Pizza Vegetarian (uncooked)": ["doe", "sauce", "cheese", "mushroom", "olive", "green pepper"],
        "Pizza Margarita (uncooked)": ["doe", "sauce", "cheese"],
        "Nini's Pizza (uncooked)": ["doe", "sauce", "cheese", "special sauce", "pepperoni", "green pepper", "mushroom", "olive"],
        "Pizza Margarita (cooked)": ["doe", "sauce", "cheese"],
    }

    static shawarmaFormula = {
        "Shawarma no pickles": ["bread", "chicken", "garlic sauce"],
        "Shawarma no garlic": ["bread", "chicken", "pickles"],
        "Sharwarma only chicken": ["bread", "chicken"],
        "Shawarma": ["bread", "chicken", "pickles", "garlic sauce"]
    }

    static allowedToppings = [
        "sauce",
        "cheese",
        "pepperoni",
        "mushroom",
        "green pepper",
        "olive",
        "special sauce",
        "garlic sauce",
        "pickles",
    ]

}