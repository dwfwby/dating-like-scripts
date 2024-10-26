// Add this script to dev tools executer scripts when oppened dating tab
// Choise JS context to app frame
// Exec on site vk.com/dating

const config = {
    yesquery: `div[data-testid="current-card"] div[aria-label="like"]`,
    skipquery: `div[data-testid="current-card"] div[aria-label="dislike"]`,
    comparedquery: `.zdY03b82.zvMigqbX`,
    comparedtimeout: 5000,
    elementtimeout: 5000,
    waitlike: 500
}
