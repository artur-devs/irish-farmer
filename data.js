// Irish Garden Planner - Crop Database
// All data optimized for Irish climate (maritime temperate)

const CROPS = {
    // VEGETABLES
    potatoes: {
        name: "Potatoes",
        type: "vegetable",
        plantMonths: [3, 4, 5],  // March - May
        harvestMonths: [6, 7, 8, 9, 10],  // June - October
        daysToHarvest: { early: 70, main: 100, late: 120 },
        caloriesPer100g: 77,
        pricePerKg: 1.20,
        yieldPerPlant: 1.5, // kg
        notes: "First earlies March, second earlies April, maincrop May. Earth up regularly."
    },
    carrots: {
        name: "Carrots",
        type: "vegetable",
        plantMonths: [3, 4, 5, 6, 7],
        harvestMonths: [6, 7, 8, 9, 10, 11],
        daysToHarvest: { min: 70, max: 80 },
        caloriesPer100g: 41,
        pricePerKg: 1.00,
        yieldPerMeter: 3, // kg per meter row
        notes: "Sow successionally for continuous harvest. Protect from carrot fly."
    },
    onions: {
        name: "Onions",
        type: "vegetable",
        plantMonths: [3, 4],  // Sets in March-April
        harvestMonths: [7, 8, 9],
        daysToHarvest: { min: 100, max: 175 },
        caloriesPer100g: 40,
        pricePerKg: 1.10,
        yieldPerPlant: 0.15,
        notes: "Plant sets for reliability. Autumn sets can be planted Sep-Oct."
    },
    garlic: {
        name: "Garlic",
        type: "vegetable",
        plantMonths: [10, 11, 2, 3],  // Autumn or early spring
        harvestMonths: [6, 7, 8],
        daysToHarvest: { min: 180, max: 270 },
        caloriesPer100g: 149,
        pricePerKg: 8.00,
        yieldPerPlant: 0.05,
        notes: "Autumn planting produces larger bulbs. Needs cold period."
    },
    leeks: {
        name: "Leeks",
        type: "vegetable",
        plantMonths: [3, 4, 5],  // Sow, transplant June-July
        harvestMonths: [9, 10, 11, 12, 1, 2, 3],
        daysToHarvest: { min: 120, max: 150 },
        caloriesPer100g: 61,
        pricePerKg: 2.50,
        yieldPerPlant: 0.25,
        notes: "Very hardy, can harvest through winter. Transplant into deep holes."
    },
    cabbage: {
        name: "Cabbage",
        type: "vegetable",
        plantMonths: [2, 3, 4, 5, 7],
        harvestMonths: [6, 7, 8, 9, 10, 11, 12, 1, 2],
        daysToHarvest: { min: 70, max: 120 },
        caloriesPer100g: 25,
        pricePerKg: 1.20,
        yieldPerPlant: 1.0,
        notes: "Spring, summer and winter varieties available. Net against pigeons."
    },
    kale: {
        name: "Kale",
        type: "vegetable",
        plantMonths: [4, 5, 6, 7],
        harvestMonths: [9, 10, 11, 12, 1, 2, 3],
        daysToHarvest: { min: 55, max: 75 },
        caloriesPer100g: 49,
        pricePerKg: 3.50,
        yieldPerPlant: 0.5,
        notes: "Very hardy superfood. Flavour improves after frost. Pick leaves regularly."
    },
    brusselsSprouts: {
        name: "Brussels Sprouts",
        type: "vegetable",
        plantMonths: [3, 4],
        harvestMonths: [10, 11, 12, 1, 2],
        daysToHarvest: { min: 150, max: 180 },
        caloriesPer100g: 43,
        pricePerKg: 3.00,
        yieldPerPlant: 0.9,
        notes: "Start early for Christmas harvest. Stake plants in windy areas."
    },
    broccoli: {
        name: "Broccoli",
        type: "vegetable",
        plantMonths: [3, 4, 5, 6],
        harvestMonths: [6, 7, 8, 9, 10, 11],
        daysToHarvest: { min: 60, max: 100 },
        caloriesPer100g: 34,
        pricePerKg: 2.80,
        yieldPerPlant: 0.4,
        notes: "Calabrese for summer, sprouting broccoli overwinters for spring."
    },
    cauliflower: {
        name: "Cauliflower",
        type: "vegetable",
        plantMonths: [3, 4, 5],
        harvestMonths: [6, 7, 8, 9, 10],
        daysToHarvest: { min: 85, max: 130 },
        caloriesPer100g: 25,
        pricePerKg: 2.00,
        yieldPerPlant: 0.7,
        notes: "Needs consistent moisture. Cover curds to keep white."
    },
    peas: {
        name: "Peas",
        type: "vegetable",
        plantMonths: [3, 4, 5, 6],
        harvestMonths: [6, 7, 8, 9],
        daysToHarvest: { min: 60, max: 70 },
        caloriesPer100g: 81,
        pricePerKg: 4.00,
        yieldPerMeter: 1.5,
        notes: "Sow successionally. Provide support. Pick regularly to encourage more pods."
    },
    broadBeans: {
        name: "Broad Beans",
        type: "vegetable",
        plantMonths: [2, 3, 4, 10, 11],  // Spring or autumn sowing
        harvestMonths: [5, 6, 7, 8],
        daysToHarvest: { min: 90, max: 120 },
        caloriesPer100g: 88,
        pricePerKg: 4.50,
        yieldPerPlant: 0.3,
        notes: "Autumn sowing gives earlier crop. Pinch out tips to deter blackfly."
    },
    runnerBeans: {
        name: "Runner Beans",
        type: "vegetable",
        plantMonths: [5, 6],
        harvestMonths: [7, 8, 9, 10],
        daysToHarvest: { min: 60, max: 75 },
        caloriesPer100g: 25,
        pricePerKg: 4.00,
        yieldPerPlant: 2.0,
        notes: "Need strong support. Pick regularly before beans bulge."
    },
    frenchBeans: {
        name: "French Beans",
        type: "vegetable",
        plantMonths: [5, 6, 7],
        harvestMonths: [7, 8, 9, 10],
        daysToHarvest: { min: 55, max: 65 },
        caloriesPer100g: 31,
        pricePerKg: 5.00,
        yieldPerPlant: 0.3,
        notes: "Dwarf varieties need no support. Pick young for best flavour."
    },
    courgettes: {
        name: "Courgettes",
        type: "vegetable",
        plantMonths: [5, 6],
        harvestMonths: [7, 8, 9, 10],
        daysToHarvest: { min: 45, max: 55 },
        caloriesPer100g: 17,
        pricePerKg: 2.50,
        yieldPerPlant: 4.0,
        notes: "Very productive. Harvest small. Can grow to marrows if left."
    },
    lettuce: {
        name: "Lettuce",
        type: "vegetable",
        plantMonths: [3, 4, 5, 6, 7, 8],
        harvestMonths: [5, 6, 7, 8, 9, 10],
        daysToHarvest: { min: 45, max: 70 },
        caloriesPer100g: 15,
        pricePerKg: 4.00,
        yieldPerPlant: 0.3,
        notes: "Sow little and often. Cut-and-come-again varieties most productive."
    },
    spinach: {
        name: "Spinach",
        type: "vegetable",
        plantMonths: [3, 4, 5, 8, 9],
        harvestMonths: [5, 6, 7, 8, 9, 10, 11],
        daysToHarvest: { min: 40, max: 50 },
        caloriesPer100g: 23,
        pricePerKg: 5.00,
        yieldPerMeter: 1.0,
        notes: "Bolts in heat. Grow in partial shade in summer. Perpetual spinach hardier."
    },
    beetroot: {
        name: "Beetroot",
        type: "vegetable",
        plantMonths: [4, 5, 6, 7],
        harvestMonths: [6, 7, 8, 9, 10, 11],
        daysToHarvest: { min: 60, max: 90 },
        caloriesPer100g: 43,
        pricePerKg: 1.80,
        yieldPerMeter: 3.0,
        notes: "Sow successionally. Harvest golf-ball size for best flavour."
    },
    parsnips: {
        name: "Parsnips",
        type: "vegetable",
        plantMonths: [2, 3, 4],
        harvestMonths: [10, 11, 12, 1, 2, 3],
        daysToHarvest: { min: 120, max: 180 },
        caloriesPer100g: 75,
        pricePerKg: 1.50,
        yieldPerMeter: 2.5,
        notes: "Slow to germinate. Flavour sweetens after frost. Leave in ground over winter."
    },
    turnips: {
        name: "Turnips",
        type: "vegetable",
        plantMonths: [3, 4, 5, 7, 8],
        harvestMonths: [5, 6, 7, 8, 9, 10, 11],
        daysToHarvest: { min: 50, max: 80 },
        caloriesPer100g: 28,
        pricePerKg: 1.20,
        yieldPerMeter: 2.0,
        notes: "Quick growing. Harvest small for tender roots."
    },
    swede: {
        name: "Swede",
        type: "vegetable",
        plantMonths: [5, 6],
        harvestMonths: [10, 11, 12, 1, 2, 3],
        daysToHarvest: { min: 90, max: 120 },
        caloriesPer100g: 38,
        pricePerKg: 1.00,
        yieldPerMeter: 3.0,
        notes: "Hardy root vegetable. Can be left in ground and harvested as needed."
    },
    celery: {
        name: "Celery",
        type: "vegetable",
        plantMonths: [3, 4, 5],
        harvestMonths: [8, 9, 10, 11],
        daysToHarvest: { min: 120, max: 180 },
        caloriesPer100g: 16,
        pricePerKg: 2.20,
        yieldPerPlant: 0.6,
        notes: "Needs lots of water. Self-blanching varieties easier."
    },
    radishes: {
        name: "Radishes",
        type: "vegetable",
        plantMonths: [3, 4, 5, 6, 7, 8, 9],
        harvestMonths: [4, 5, 6, 7, 8, 9, 10],
        daysToHarvest: { min: 25, max: 40 },
        caloriesPer100g: 16,
        pricePerKg: 3.00,
        yieldPerMeter: 1.5,
        notes: "Quick crop, ready in weeks. Winter radishes take longer."
    },
    sweetcorn: {
        name: "Sweetcorn",
        type: "vegetable",
        plantMonths: [5, 6],
        harvestMonths: [8, 9, 10],
        daysToHarvest: { min: 80, max: 100 },
        caloriesPer100g: 86,
        pricePerKg: 3.00,
        yieldPerPlant: 0.3,
        notes: "Plant in blocks for wind pollination. Choose early varieties for Ireland."
    },

    // FRUITS
    strawberries: {
        name: "Strawberries",
        type: "fruit",
        plantMonths: [3, 4, 8, 9],  // Spring or autumn
        harvestMonths: [6, 7, 8, 9],
        daysToHarvest: { min: 60, max: 90 },
        caloriesPer100g: 32,
        pricePerKg: 6.00,
        yieldPerPlant: 0.5,
        notes: "Everbearing varieties crop June to October. Replace plants every 3 years."
    },
    raspberries: {
        name: "Raspberries",
        type: "fruit",
        plantMonths: [11, 12, 1, 2, 3],  // Dormant season
        harvestMonths: [6, 7, 8, 9, 10],
        daysToHarvest: { min: 365, max: 730 },  // Year 2 onwards
        caloriesPer100g: 52,
        pricePerKg: 12.00,
        yieldPerPlant: 1.0,
        notes: "Summer and autumn varieties available. Need support wires."
    },
    blackberries: {
        name: "Blackberries",
        type: "fruit",
        plantMonths: [10, 11, 12, 1, 2, 3],
        harvestMonths: [8, 9, 10],
        daysToHarvest: { min: 365, max: 730 },
        caloriesPer100g: 43,
        pricePerKg: 10.00,
        yieldPerPlant: 4.0,
        notes: "Thornless varieties available. Very vigorous, need training."
    },
    blackcurrants: {
        name: "Blackcurrants",
        type: "fruit",
        plantMonths: [10, 11, 12, 1, 2, 3],
        harvestMonths: [7, 8],
        daysToHarvest: { min: 365, max: 730 },
        caloriesPer100g: 63,
        pricePerKg: 8.00,
        yieldPerPlant: 4.5,
        notes: "Very high in vitamin C. Prune hard for best fruit."
    },
    redcurrants: {
        name: "Redcurrants",
        type: "fruit",
        plantMonths: [10, 11, 12, 1, 2, 3],
        harvestMonths: [7, 8],
        daysToHarvest: { min: 365, max: 730 },
        caloriesPer100g: 56,
        pricePerKg: 10.00,
        yieldPerPlant: 4.0,
        notes: "Can be trained as cordons. Good for jelly making."
    },
    gooseberries: {
        name: "Gooseberries",
        type: "fruit",
        plantMonths: [10, 11, 12, 1, 2, 3],
        harvestMonths: [6, 7, 8],
        daysToHarvest: { min: 365, max: 730 },
        caloriesPer100g: 44,
        pricePerKg: 7.00,
        yieldPerPlant: 3.0,
        notes: "Dual purpose: cook green, eat ripe. Watch for mildew."
    },
    rhubarb: {
        name: "Rhubarb",
        type: "fruit",
        plantMonths: [11, 12, 1, 2, 3],
        harvestMonths: [4, 5, 6, 7],
        daysToHarvest: { min: 365, max: 730 },
        caloriesPer100g: 21,
        pricePerKg: 3.50,
        yieldPerPlant: 2.5,
        notes: "Very easy to grow. Don't harvest first year. Force for early crop."
    },
    apples: {
        name: "Apples",
        type: "fruit",
        plantMonths: [11, 12, 1, 2, 3],
        harvestMonths: [8, 9, 10, 11],
        daysToHarvest: { min: 1095, max: 1825 },  // 3-5 years
        caloriesPer100g: 52,
        pricePerKg: 2.50,
        yieldPerPlant: 20.0,  // Mature tree
        notes: "Choose varieties suited to Irish climate. Most need pollination partner."
    },
    pears: {
        name: "Pears",
        type: "fruit",
        plantMonths: [11, 12, 1, 2, 3],
        harvestMonths: [8, 9, 10],
        daysToHarvest: { min: 1460, max: 2555 },  // 4-7 years
        caloriesPer100g: 57,
        pricePerKg: 2.80,
        yieldPerPlant: 15.0,
        notes: "Need warm sheltered spot. Conference is reliable in Ireland."
    },
    plums: {
        name: "Plums",
        type: "fruit",
        plantMonths: [11, 12, 1, 2, 3],
        harvestMonths: [7, 8, 9],
        daysToHarvest: { min: 1095, max: 1825 },
        caloriesPer100g: 46,
        pricePerKg: 3.50,
        yieldPerPlant: 12.0,
        notes: "Victoria is self-fertile and reliable. Protect blossom from frost."
    },

    // HERBS
    parsley: {
        name: "Parsley",
        type: "herb",
        plantMonths: [3, 4, 5],
        harvestMonths: [5, 6, 7, 8, 9, 10],
        daysToHarvest: { min: 70, max: 90 },
        caloriesPer100g: 36,
        pricePerKg: 8.00,
        yieldPerPlant: 0.5,
        notes: "Soak seeds overnight to speed germination. Biennial grown as annual. Flat-leaf has more flavour."
    },
    chives: {
        name: "Chives",
        type: "herb",
        plantMonths: [2, 3, 4],
        harvestMonths: [4, 5, 6, 7, 8, 9, 10],
        daysToHarvest: { min: 60, max: 90 },
        caloriesPer100g: 30,
        pricePerKg: 15.00,
        yieldPerPlant: 0.3,
        notes: "Hardy perennial. Snip regularly to encourage new growth. Purple flowers are also edible."
    },
    mint: {
        name: "Mint",
        type: "herb",
        plantMonths: [3, 4, 5],
        harvestMonths: [5, 6, 7, 8, 9, 10],
        daysToHarvest: { min: 90, max: 120 },
        caloriesPer100g: 70,
        pricePerKg: 15.00,
        yieldPerPlant: 0.4,
        notes: "Plant in containers to stop it spreading. Thrives in Irish damp. Many varieties: spearmint, peppermint, apple mint."
    },
    thyme: {
        name: "Thyme",
        type: "herb",
        plantMonths: [3, 4, 5],
        harvestMonths: [5, 6, 7, 8, 9, 10, 11],
        daysToHarvest: { min: 90, max: 120 },
        caloriesPer100g: 101,
        pricePerKg: 20.00,
        yieldPerPlant: 0.2,
        notes: "Hardy perennial. Prefers well-drained soil. Harvest before flowering for best flavour."
    },
    rosemary: {
        name: "Rosemary",
        type: "herb",
        plantMonths: [3, 4, 5],
        harvestMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        daysToHarvest: { min: 120, max: 180 },
        caloriesPer100g: 131,
        pricePerKg: 18.00,
        yieldPerPlant: 0.3,
        notes: "Evergreen perennial shrub. Needs a sheltered spot in Ireland. Harvest shoot tips to keep bushy."
    },
    sage: {
        name: "Sage",
        type: "herb",
        plantMonths: [3, 4, 5],
        harvestMonths: [5, 6, 7, 8, 9, 10],
        daysToHarvest: { min: 90, max: 120 },
        caloriesPer100g: 315,
        pricePerKg: 18.00,
        yieldPerPlant: 0.2,
        notes: "Hardy perennial. Don't over-harvest in first year. Excellent with pork and stuffing."
    },
    dill: {
        name: "Dill",
        type: "herb",
        plantMonths: [4, 5, 6, 7],
        harvestMonths: [6, 7, 8, 9],
        daysToHarvest: { min: 50, max: 70 },
        caloriesPer100g: 43,
        pricePerKg: 12.00,
        yieldPerPlant: 0.1,
        notes: "Annual. Sow successionally every few weeks. Harvest fronds before it goes to seed."
    },
    coriander: {
        name: "Coriander",
        type: "herb",
        plantMonths: [3, 4, 5, 6, 7, 8],
        harvestMonths: [5, 6, 7, 8, 9, 10],
        daysToHarvest: { min: 40, max: 60 },
        caloriesPer100g: 23,
        pricePerKg: 12.00,
        yieldPerMeter: 0.2,
        notes: "Bolts quickly in heat. Sow every 3-4 weeks for continuous supply. Partial shade helps."
    },
    oregano: {
        name: "Oregano",
        type: "herb",
        plantMonths: [3, 4, 5],
        harvestMonths: [6, 7, 8, 9],
        daysToHarvest: { min: 90, max: 120 },
        caloriesPer100g: 265,
        pricePerKg: 15.00,
        yieldPerPlant: 0.15,
        notes: "Hardy perennial. Harvest just before flowering for strongest flavour. Dries well."
    },
    lemonBalm: {
        name: "Lemon Balm",
        type: "herb",
        plantMonths: [3, 4, 5],
        harvestMonths: [5, 6, 7, 8, 9, 10],
        daysToHarvest: { min: 90, max: 120 },
        caloriesPer100g: 49,
        pricePerKg: 10.00,
        yieldPerPlant: 0.4,
        notes: "Vigorous perennial, can be invasive. Lovely lemon scent. Excellent for herbal tea."
    },
    fennel: {
        name: "Fennel",
        type: "herb",
        plantMonths: [3, 4, 5],
        harvestMonths: [7, 8, 9, 10],
        daysToHarvest: { min: 90, max: 120 },
        caloriesPer100g: 31,
        pricePerKg: 10.00,
        yieldPerPlant: 0.3,
        notes: "Tall perennial. Keep away from other plants. Fronds, seeds and bulb all edible."
    },
    basil: {
        name: "Basil",
        type: "herb",
        plantMonths: [5, 6],
        harvestMonths: [7, 8, 9],
        daysToHarvest: { min: 60, max: 90 },
        caloriesPer100g: 22,
        pricePerKg: 20.00,
        yieldPerPlant: 0.1,
        notes: "Needs warmth — grow in a polytunnel or on a sunny windowsill in Ireland. Pinch out flowers."
    },
    bay: {
        name: "Bay Laurel",
        type: "herb",
        plantMonths: [3, 4, 5],
        harvestMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        daysToHarvest: { min: 365, max: 730 },
        caloriesPer100g: 313,
        pricePerKg: 25.00,
        yieldPerPlant: 0.5,
        notes: "Slow-growing evergreen shrub. Hardy once established. Pick fresh leaves year-round."
    },
    chamomile: {
        name: "Chamomile",
        type: "herb",
        plantMonths: [3, 4, 5],
        harvestMonths: [6, 7, 8],
        daysToHarvest: { min: 60, max: 90 },
        caloriesPer100g: 1,
        pricePerKg: 20.00,
        yieldPerPlant: 0.05,
        notes: "German chamomile is annual, Roman is perennial. Harvest flower heads when fully open for tea."
    },

    // FLOWERS — Edible
    nasturtium: {
        name: "Nasturtium",
        type: "flower",
        plantMonths: [4, 5, 6],
        harvestMonths: [6, 7, 8, 9, 10],
        daysToHarvest: { min: 50, max: 70 },
        caloriesPer100g: 28,
        pricePerKg: 30.00,
        yieldPerPlant: 0.1,
        notes: "Edible (flowers and leaves, peppery flavour). Very easy, prolific and self-seeds freely. Great for salads."
    },
    calendula: {
        name: "Calendula",
        type: "flower",
        plantMonths: [3, 4, 5],
        harvestMonths: [6, 7, 8, 9, 10],
        daysToHarvest: { min: 50, max: 60 },
        caloriesPer100g: 0,
        pricePerKg: 25.00,
        yieldPerPlant: 0.05,
        notes: "Edible petals. Add colour to salads and rice. Also medicinal. Deadhead to prolong flowering all season."
    },
    borage: {
        name: "Borage",
        type: "flower",
        plantMonths: [4, 5, 6],
        harvestMonths: [6, 7, 8, 9],
        daysToHarvest: { min: 50, max: 60 },
        caloriesPer100g: 21,
        pricePerKg: 40.00,
        yieldPerPlant: 0.05,
        notes: "Edible star-shaped blue flowers. Excellent pollinator attractor. Self-seeds prolifically once established."
    },
    elderflower: {
        name: "Elderflower",
        type: "flower",
        plantMonths: [11, 12, 1, 2, 3],
        harvestMonths: [5, 6],
        daysToHarvest: { min: 365, max: 730 },
        caloriesPer100g: 0,
        pricePerKg: 20.00,
        yieldPerPlant: 1.0,
        notes: "Edible flowers for cordial and fritters. Native Irish elder shrub. Autumn berries also edible."
    },
    viola: {
        name: "Viola",
        type: "flower",
        plantMonths: [2, 3, 4, 8, 9],
        harvestMonths: [3, 4, 5, 6, 9, 10],
        daysToHarvest: { min: 60, max: 90 },
        caloriesPer100g: 0,
        pricePerKg: 40.00,
        yieldPerPlant: 0.05,
        notes: "Edible flowers for cake decoration and salads. Overwinters well in Irish climate. Prolific bloomer."
    },

    // FLOWERS — Ornamental
    dahlia: {
        name: "Dahlia",
        type: "flower",
        plantMonths: [4, 5],
        harvestMonths: [7, 8, 9, 10],
        daysToHarvest: { min: 90, max: 120 },
        caloriesPer100g: 0,
        pricePerKg: 0,
        yieldPerPlant: 0.2,
        notes: "Lift tubers before winter frost and store in dry compost. Stunning variety of sizes and colours."
    },
    lupin: {
        name: "Lupin",
        type: "flower",
        plantMonths: [3, 4, 5],
        harvestMonths: [5, 6, 7],
        daysToHarvest: { min: 60, max: 90 },
        caloriesPer100g: 0,
        pricePerKg: 0,
        yieldPerPlant: 0.1,
        notes: "Hardy perennial. Fixes nitrogen in soil. Cut spent spikes to encourage a second flush of flowers."
    },
    sweetPea: {
        name: "Sweet Pea",
        type: "flower",
        plantMonths: [2, 3, 4, 10, 11],
        harvestMonths: [6, 7, 8, 9],
        daysToHarvest: { min: 70, max: 100 },
        caloriesPer100g: 0,
        pricePerKg: 0,
        yieldPerPlant: 0.1,
        notes: "Fragrant annual climber. Pick flowers constantly to extend the season. Needs support."
    },
    cosmos: {
        name: "Cosmos",
        type: "flower",
        plantMonths: [4, 5, 6],
        harvestMonths: [7, 8, 9, 10],
        daysToHarvest: { min: 60, max: 90 },
        caloriesPer100g: 0,
        pricePerKg: 0,
        yieldPerPlant: 0.15,
        notes: "Easy annual from seed. Direct sow after last frost. Self-seeds freely year after year."
    },
    sunflower: {
        name: "Sunflower",
        type: "flower",
        plantMonths: [4, 5, 6],
        harvestMonths: [8, 9, 10],
        daysToHarvest: { min: 70, max: 100 },
        caloriesPer100g: 0,
        pricePerKg: 0,
        yieldPerPlant: 0.2,
        notes: "Great for children. Seed heads attract birds. Dwarf varieties better for exposed Irish gardens."
    },
    fuchsia: {
        name: "Fuchsia",
        type: "flower",
        plantMonths: [4, 5],
        harvestMonths: [6, 7, 8, 9, 10],
        daysToHarvest: { min: 60, max: 90 },
        caloriesPer100g: 0,
        pricePerKg: 0,
        yieldPerPlant: 0.2,
        notes: "Ireland's unofficial flower. Thrives in Irish mild, damp conditions. Ideal for hedging or containers."
    },
    primrose: {
        name: "Primrose",
        type: "flower",
        plantMonths: [8, 9],
        harvestMonths: [2, 3, 4, 5],
        daysToHarvest: { min: 150, max: 200 },
        caloriesPer100g: 0,
        pricePerKg: 0,
        yieldPerPlant: 0.05,
        notes: "Native Irish wildflower. Cheerful early spring colour. Spreads naturally in damp shaded spots."
    }
};

// Monthly names for calendar
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Recommended daily calories per person (average)
const DAILY_CALORIES = 2000;

// Recommended yearly vegetable/fruit intake per person (kg)
// Based on 5-a-day guidelines: ~400g per day = ~146kg per year
const YEARLY_PRODUCE_TARGET = 150; // kg per person

// Total crops (all types)
const TOTAL_CROP_TYPES = Object.keys(CROPS).length;

// Food crops only (vegetables + fruits) — used for self-sufficiency variety metric
const FOOD_CROP_TYPES = Object.keys(CROPS).filter(id => ['vegetable', 'fruit'].includes(CROPS[id].type)).length;

// Utility function to get current month (1-12)
function getCurrentMonth() {
    return new Date().getMonth() + 1;
}

// Get crops ready to plant this month
function getCropsToPlant(month = getCurrentMonth()) {
    return Object.entries(CROPS)
        .filter(([_, crop]) => crop.plantMonths.includes(month))
        .map(([id, crop]) => ({ id, ...crop }));
}

// Get crops ready to harvest this month
function getCropsToHarvest(month = getCurrentMonth()) {
    return Object.entries(CROPS)
        .filter(([_, crop]) => crop.harvestMonths.includes(month))
        .map(([id, crop]) => ({ id, ...crop }));
}

// Calculate expected harvest date from planting date
function getExpectedHarvestDate(cropId, plantDate) {
    const crop = CROPS[cropId];
    if (!crop) return null;

    const days = crop.daysToHarvest.max || crop.daysToHarvest.min || 90;
    const date = new Date(plantDate);
    date.setDate(date.getDate() + days);
    return date;
}

// Calculate calories from harvest weight
function calculateCalories(cropId, weightKg) {
    const crop = CROPS[cropId];
    if (!crop) return 0;
    return Math.round((crop.caloriesPer100g * weightKg * 10));
}

// Calculate cost savings
function calculateSavings(cropId, weightKg) {
    const crop = CROPS[cropId];
    if (!crop) return 0;
    return Math.round(crop.pricePerKg * weightKg * 100) / 100;
}
