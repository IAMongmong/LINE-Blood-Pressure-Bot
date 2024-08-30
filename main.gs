function doPost(e) {

  // Token for LINE Bot authorization
  var line_token = 'YOUR_LINE_BOT_TOKEN';
  var data = JSON.parse(e.postData.contents);

  console.log(data);

  // Read replayToken, user message, user ID from the event
  var replyToken = data.events[0].replyToken;
  var userMessage = data.events[0].message.text;
  var userId = data.events[0].source.userId;
  // var groupId = data.events[0].source.groupId;
  
  if (typeof replyToken === 'undefined') {
    return;// Exit if no replyToken is found
  }

  // Open the Google Sheet by ID
  const ss = SpreadsheetApp.openById("YOUR_SPREADSHEET_ID");
  const sheet = ss.getSheets()[0];

  // Check if the user message matches the blood pressure format
  if (userMessage.match(/^\d{2,3}[\/／]\d{2,3}[\/／]\d{2,3}$/)) {
    var bpValues = userMessage.split(/[\/／]/); // Split the message to get blood pressure values
    var systolic = parseInt(bpValues[0]);
    var diastolic = parseInt(bpValues[1]);
    var pulse = parseInt(bpValues[2]);

    var now = new Date();
    // Append data to the Google Sheet
    sheet.appendRow([Utilities.formatDate(now, "GMT+8", "yyyy/MM/dd"), Utilities.formatDate(now, "GMT+8", "HH:mm:ss"), userId, systolic, diastolic, pulse]);

    // Evaluate blood pressure values
    var systolicMessage = evaluateSystolic(systolic);
    var diastolicMessage = evaluateDiastolic(diastolic);
    
    // Calculate average blood pressure
    var avgBP = calculateAverageBP(sheet);
    
    var replyMessage = "Received your reply!\n" + 
                       "Systolic: " + systolic + systolicMessage + "\n" +
                       "Diastolic: " + diastolic + diastolicMessage + "\n" +
                       "Average BP: " + avgBP.systolic + "/" + avgBP.diastolic + "/" + avgBP.pulse;
    
    Line_Bot(line_token, replyToken, replyMessage);
  } else if (userMessage.toLowerCase() === "average bp") {
    // Calculate and reply with average blood pressure
    var avgBP = calculateAverageBP(sheet);
    Line_Bot(line_token, replyToken, "Your average blood pressure is: " + avgBP.systolic + "/" + avgBP.diastolic + "/" + avgBP.pulse);
  }
  // else {
  //   Line_Bot(line_token, replyToken, "Please enter a valid blood pressure format (XXX/XXX/XXX) or 'average bp' to view your average.");
  // }
}

// Function to evaluate systolic blood pressure
function evaluateSystolic(value) {
  if (value < 120) {
    return " -> Normal, good!";
  } else if (value >= 120 && value <= 139) {
    return " -> Slightly high, should be <120";
  } else {
    return " -> Too high, should be <120";
  }
}

// Function to evaluate diastolic blood pressure
function evaluateDiastolic(value) {
  if (value < 80) {
    return " -> Normal, good!";
  } else if (value >= 80 && value <= 89) {
    return " -> Slightly high, should be <80";
  } else {
    return " -> Too high, should be <80";
  }
}

// Function to calculate average blood pressure from the Google Sheet
function calculateAverageBP(sheet) {
  var data = sheet.getDataRange().getValues();
  var totalSystolic = 0;
  var totalDiastolic = 0;
  var totalPulse = 0;
  var count = 0;

  // Loop through the data and sum the values
  for (var i = 1; i < data.length; i++) {
    totalSystolic += data[i][3];
    totalDiastolic += data[i][4];
    totalPulse += data[i][5];
    count++;
  }

  // Return the average values
  return {
    systolic: (totalSystolic / count).toFixed(0),
    diastolic: (totalDiastolic / count).toFixed(0),
    pulse: (totalPulse / count).toFixed(0)
  };
}

// Function to send a reply message using the LINE Bot API
function Line_Bot(token,replyToken,message)
{
  var url = 'https://api.line.me/v2/bot/message/reply';
  UrlFetchApp.fetch(url, {
      'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + token ,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': [{
        'type': 'text',
        'text': message,
      }],
    }),
  });
}

// Function to send a reminder message
function sendReminder() {
  var url = "https://api.line.me/v2/bot/message/push";
  var token = 'YOUR_LINE_BOT_TOKEN';
  var groupId = 'YOUR_GROUP_ID'; // Or UserID

  var options = {
    "method": "post",
    "contentType": "application/json",
    "headers": {
      "Authorization": "Bearer " + token
    },
    "payload": JSON.stringify({
      "to": groupId,
      "messages": [{
        "type": "text",
        "text": "Please check your blood pressure! Reply with the format OOO/OOO/OOO"
      }]
    })
  };
  
  UrlFetchApp.fetch(url, options); // Send the request
}
