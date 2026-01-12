
/**
 * Calculates the required assets at retirement and generates an asset depletion simulation.
 * 
 * @param {Object} params
 * @param {number} params.dieAge - Age at death (e.g., 90)
 * @param {number} params.retireAge - Age at retirement (e.g., 60)
 * @param {number} params.monthlyExpenses - Monthly expenses in Man Yen (e.g., 20)
 * @param {number} params.annualYield - Real annual yield in % (e.g., 4)
 * @param {number} params.pensionStartAge - Age pension starts (e.g., 65)
 * @param {number} params.pensionMonthly - Monthly pension in Man Yen (e.g., 10)
 * @param {number} params.lumpSumBuffer - Initial buffer for retirement in Man Yen (e.g., 200)
 * 
 * @returns {Object} { totalRequired: number, simulation: Array<{ age: number, assets: number }> }
 */
export const calculateRequiredAssets = ({
    dieAge,
    retireAge,
    monthlyExpenses,
    annualYield,
    pensionStartAge,
    pensionMonthly,
    lumpSumBuffer
}) => {
    // Basic validation
    if (dieAge <= retireAge) return { totalRequired: 0, simulation: [] };

    const monthsDuration = (dieAge - retireAge) * 12;
    // Monthly yield: (1 + r)^(1/12) - 1
    const monthlyRate = Math.pow(1 + annualYield / 100, 1 / 12) - 1;

    let totalPV = 0;

    // We calculate the Present Value (at Retirement) of all future deficits
    // Loop through each month from Retirement until Death
    for (let m = 0; m < monthsDuration; m++) {
        const currentAge = retireAge + m / 12;

        let income = 0;
        if (currentAge >= pensionStartAge) {
            income = pensionMonthly;
        }

        // Deficit for this month
        // Logic: "毎月の純支出 = max(0, 支出 − 年金月額)"
        const deficit = Math.max(0, monthlyExpenses - income);

        // Discount back to Retirement date (T=0)
        // Assuming cash flow occurs at the end of month m+1? or m?
        // Let's assume end of month (m=0 is first month, paid at t=1/12?)
        // Standard PV formula: FV / (1+r)^(n)
        // If m=0 (1st month), discount by 1 month.
        const discountFactor = Math.pow(1 + monthlyRate, -(m + 1));

        totalPV += deficit * discountFactor;
    }

    // Add the Lump Sum Buffer (needed at T=0)
    totalPV += lumpSumBuffer;

    // --- Simulation for Graph ---
    // Start with the calculated Total Required
    const simulation = [];
    let currentAssets = totalPV;

    // Initial point
    simulation.push({
        age: retireAge,
        assets: Math.round(currentAssets * 10) / 10 // Round to 1 decimal
    });

    // We simulate month by month to track the curve
    for (let m = 0; m < monthsDuration; m++) {
        const currentAge = retireAge + (m + 1) / 12; // Age at end of month

        // 1. Apply Growth (start of month assets grow for 1 month)
        // Wait, if we assume expenses are verified at end of month?
        // Logic: Assets * (1+r) - Expenses
        currentAssets = currentAssets * (1 + monthlyRate);

        // 2. Subtract Deficits
        // If this is the *very first* instant, we might subtract buffer?
        // But for simulation, let's assume buffer is spent effectively at T=0? 
        // Or kept and used?
        // User says: "Initial Year Buffer ... separate frame".
        // Let's assume the Buffer is spent immediately at Retirement (e.g. moving, tax).
        // So at m=0 (start), we might drop by Buffer.
        // Let's adjust logic:
        // PV included Buffer. So Initial Assets = PV.
        // Immediately subtract Buffer?
        // "退職翌年の..." (Next year after retirement).
        // Let's simplify: Subtract it spread out or lump sum?
        // "Lump sum buffer" implies lump sum.
        // Let's subtract it in the first month (or T=0).
        if (m === 0) {
            currentAssets -= lumpSumBuffer;
        }

        let income = 0;
        // Check if pension started (using same age logic)
        // Note: currentAge is end of month.
        // If retire 60, m=0 -> 60 + 1/12.
        // If pension starts 65.
        // 60 + 1/12 < 65.
        if ((retireAge + m / 12) >= pensionStartAge) {
            // Logic check: pension eligibility usually by month?
            // Let's stick to the previous simple logic:
            // if age >= param.
            income = pensionMonthly;
        } else {
            // Precise check
            if (currentAge >= pensionStartAge) income = pensionMonthly;
        }

        // Actually, let's use the loop index to be consistent with PV calc
        // PV calc used `retireAge + m/12` (beginning of month age).
        // Let's stay consistent.
        const ageAtMonthStart = retireAge + m / 12;
        let effectiveIncome = 0;
        if (ageAtMonthStart >= pensionStartAge) {
            effectiveIncome = pensionMonthly;
        }

        const deficit = Math.max(0, monthlyExpenses - effectiveIncome);
        currentAssets -= deficit;

        // Store data points annually or every month?
        // Graphing every month is fine, but maybe too many points?
        // Let's store every year or just every month. Recharts handles many points okay.
        // Let's store every 6 months or year to reduce noise if needed, but 30-40 years * 12 = 480 points. Fine.

        // Avoid negative noise at the end (should be 0)
        if (currentAssets < 0.1 && currentAssets > -0.1) currentAssets = 0;

        simulation.push({
            age: currentAge,
            assets: Math.max(0, Math.round(currentAssets * 10) / 10)
        });
    }

    return {
        totalRequired: Math.round(totalPV * 10) / 10, // Result in Man Yen
        simulation
    };
};
