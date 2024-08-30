# LINE Blood Pressure Bot

This is a Google Apps Script-based LINE bot that helps users record and track their blood pressure. Users can send their blood pressure readings in a specified format, and the bot will log the data in a Google Sheet, evaluate the readings, and provide feedback. Users can also request their average blood pressure from the bot.

## Features

- **Record Blood Pressure:** Users can send their blood pressure and pulse in the format `XXX/XXX/XXX`. The bot will log these values and provide feedback on whether the readings are normal, slightly high, or too high.
- **Calculate and Display Average Blood Pressure:** Users can request their average blood pressure by sending the message "average bp".
- **Automated Reminders:** The bot can send periodic reminders to users or groups to check and log their blood pressure.

## Setup Instructions

### Prerequisites

- A Google account with access to Google Apps Script.
- A LINE developer account with a channel created for the LINE bot.
- A Google Sheet created to store the blood pressure data.
- A secure way to handle sensitive data such as LINE bot tokens and Google Sheet IDs.

### Step 1: Google Apps Script Setup

1. **Create a New Google Apps Script Project:**
   - Go to [Google Apps Script](https://script.google.com/).
   - Click on `New Project` to create a new script.

2. **Copy the Script Code:**
   - Copy the provided code from your `Main.gs` file into the new project.

3. **Replace Placeholders:**
   - Replace `YOUR_LINE_BOT_TOKEN` with your actual LINE bot token.
   - Replace `YOUR_SPREADSHEET_ID` with the ID of your Google Sheet.
   - Replace `YOUR_GROUP_ID` with your actual LINE group ID if using group messaging.

4. **Set Up Triggers:**
   - Set up a trigger to run the `doPost` function whenever an HTTP POST request is received. This can be done by deploying the script as a web app.

5. **Deploy as a Web App:**
   - Click on `Deploy` > `New Deployment`.
   - Choose `Web App`.
   - Set the access to `Anyone` or `Anyone, even anonymous` based on your requirement.
   - Copy the web app URL; you will use this URL as the webhook in your LINE bot settings.

### Step 2: LINE Bot Setup

1. **Create a LINE Developer Account and Channel:**
   - Sign up at [LINE Developers](https://developers.line.biz/en/).
   - Create a new provider and then a new channel under Messaging API.

2. **Configure the Channel:**
   - Set the channel settings, including the name and description.
   - Under the Messaging API tab, set the webhook URL to the URL of your deployed Google Apps Script web app.

3. **Enable Webhook:**
   - Make sure the webhook is enabled in the LINE channel settings.

4. **Set Up LINE Messaging API:**
   - Go to the `Messaging API` settings in your LINE developer console.
   - Copy your `Channel Access Token` and replace `YOUR_LINE_BOT_TOKEN` in your script.

### Step 3: Google Sheets Setup

1. **Create a Google Sheet:**
   - Create a new Google Sheet in your Google Drive.
   - Name the first sheet (tab) accordingly, e.g., `BloodPressureData`.

2. **Share the Sheet:**
   - Make sure to share the Google Sheet with the email associated with your Google Apps Script project (usually ends in `@appspot.gserviceaccount.com`).

3. **Set Up Columns:**
   - Set up columns for date, time, user ID, systolic, diastolic, and pulse, e.g., `Date`, `Time`, `UserID`, `Systolic`, `Diastolic`, `Pulse`.

### Step 4: Testing the Bot

1. **Test Webhook Connection:**
   - Send a test message to your LINE bot. Check if the webhook connection is successful in the LINE developer console.

2. **Send Blood Pressure Data:**
   - Send a message to your bot in the format `120/80/60` (Systolic/Diastolic/Pulse) to check if it logs data in the Google Sheet.

3. **Request Average Blood Pressure:**
   - Send the message "average bp" to request the average blood pressure from the bot.

### Step 5: Security and Best Practices

- **Environment Variables:** Use environment variables or script properties to manage sensitive data instead of hardcoding them.
- **Error Handling:** Implement proper error handling and logging for better maintainability and debugging.
- **Regular Backups:** Regularly back up your Google Sheet data to prevent accidental data loss.

## Usage

- **Log Blood Pressure:** Send a message to the LINE bot in the format `120/80/60`.
- **Get Average Blood Pressure:** Send a message saying "average bp" to receive the calculated average blood pressure values.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

