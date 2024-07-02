export const shuffleArray = <T>(array: T[]): T[] => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

export const generateGrid = <T>(array: T[], gridSize: number, emptyIndex: number): (T | null)[][] => {
    let grid: (T | null)[][] = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null));
    let index = 0;
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (index === emptyIndex) {
                grid[row][col] = null;
            } else {
                grid[row][col] = array[index];
            }
            index++;
        }
    }
    return grid;
};

export const prepareGridData = <T>(prompts: T[], gridSize: number, emptyIndex: number): (T | null)[][] => {
    const shuffledPrompts = shuffleArray(prompts);
    return generateGrid(shuffledPrompts, gridSize, emptyIndex);
};
