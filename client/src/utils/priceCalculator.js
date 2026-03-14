export const INGREDIENT_PRICES = {
    aloo_tikki: 20,
    paneer: 25,
    cheese: 15,
    tomato: 10,
    onion: 10,
    lettuce: 8,
    bread: 0
};

export const PLATFORM_FEE = 5;

export const calculatePrice = (slices, quantity = 1) => {
    let basePrice = 0;
    let hasCheese = false;
    let hasPaneer = false;
    let alooTikkiCount = 0;

    for (let i = 0; i < slices.length; i++) {
        const type = slices[i].type;
        basePrice += (INGREDIENT_PRICES[type] || 0);

        if (type === 'cheese') hasCheese = true;
        if (type === 'paneer') hasPaneer = true;
        if (type === 'aloo_tikki') alooTikkiCount++;
    }

    const alooTikkiPenalty = Math.floor(alooTikkiCount / 2) * 2;

    let discount = 0;
    if (hasCheese && hasPaneer) {
        discount = 3;
    }

    const totalBeforeQty = basePrice - discount + alooTikkiPenalty;
    const finalPrice = Math.max(0, (totalBeforeQty * quantity) + PLATFORM_FEE);

    return {
        basePrice: basePrice * quantity,
        discount: discount * quantity,
        penalty: alooTikkiPenalty * quantity,
        platformFee: PLATFORM_FEE,
        finalPrice,
        isOversized: slices.length > 6
    };
};
