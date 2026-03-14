const PLATFORM_FEE = 5;

const calculatePrice = (slices, ingredients, quantity = 1) => {
    let basePrice = 0;
    let hasCheese = false;
    let hasPaneer = false;
    let alooTikkiCount = 0;

    for (const slice of slices) {
        const ingredient = ingredients.find(ing => ing.id === slice.id);
        if (!ingredient) {
            throw new Error(`Invalid ingredient ID: ${slice.id}`);
        }

        basePrice += ingredient.price;

        const type = ingredient.name.toLowerCase().replace(/\s+/g, '_');
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
        finalPrice
    };
};

module.exports = {
    calculatePrice,
    PLATFORM_FEE
};
