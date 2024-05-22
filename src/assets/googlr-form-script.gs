/**
 * Array of Discord webhook URLs where the form responses will be sent.
 */
const webhooks = [
  'https://discord.com/api/webhooks/1241812632013639750/cG-rCFu2bO58d3eIiLwisCYjpQYA26qxK6-Sl2tUk-s2PJh7Q9utYdJ_FgR6f8FjfJ-j',
];

/**
 * Reference to the active Google Form.
 */
const form = FormApp.getActiveForm();

/**
 * Array of all responses received from the form.
 */
const allResponses = form.getResponses();

/**
 * The latest response received from the form, if any.
 */
const latestResponse = allResponses.length
  ? allResponses[allResponses.length - 1]
  : null;

// Check if there's a latest response, if not, throw an error.
if (!latestResponse) {
  throw new Error('No Responses found in your form.');
}

/**
 * Array of item responses from the latest form submission.
 */
const response = latestResponse.getItemResponses();

/**
 * Object to hold the structured data as per the required JSON format.
 */
const data = {
  name: '',
  city: '',
  adresse: {
    location: '',
    phoneNumber1: '',
    website: '',
    socials: [],
  },
  shortDescription: '',
  longDescription: '',
  sectors: [],
  technologiesUsed: [],
  logo: '',
};

// Iterate through the responses and map them to the appropriate fields in the data object.
response.forEach((itemResponse) => {
  const questionTitle = itemResponse.getItem().getTitle().toLowerCase();
  const answer = itemResponse.getResponse();

  switch (questionTitle) {
    case "nom de l'entreprise":
      data.name = answer;
      break;
    case 'ville':
      data.city = answer;
      break;
    case "description brève de l'entreprise":
      data.shortDescription = answer;
      break;
    case "description longue de l'entreprise":
      data.longDescription = answer;
      break;
    case 'secteurs(ex :ai,software..)':
      data.sectors = answer.split(',').map((s) => s.trim());
      break;
    case 'technologies utilisées(ex : spring,django,aws..)':
      data.technologiesUsed = answer.split(',').map((s) => s.trim());
      break;
    case "url du logo de l'entreprise":
      data.logo = answer;
      break;
    case 'numéro de téléphone':
      data.adresse.phoneNumber1 = answer;
      break;
    case 'site web':
      data.adresse.website = answer;
      break;
    case 'linkedin':
    case 'facebook':
    case 'youtube':
    case 'github':
      data.adresse.socials.push({
        platform:
          questionTitle.charAt(0).toUpperCase() + questionTitle.slice(1),
        value: answer,
      });
      break;
    default:
      break;
  }
});

/**
 * Convert the data object to a JSON string, formatted with indentation for readability.
 */
const jsonData = JSON.stringify(data, null, 2);

/**
 * Function to send the JSON data to the specified Discord webhooks.
 */
function sendJSON() {
  const payload = {
    content: '```json\n' + jsonData + '\n```', // Format the JSON data for display in Discord.
  };

  // Send the payload to each webhook URL.
  for (const webhook of webhooks) {
    UrlFetchApp.fetch(webhook, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
    });
  }
}

/**
 * Trigger function to handle form submissions and send the JSON data.
 * @param {Event} e - The form submit event.
 */
function onFormSubmit(e) {
  sendJSON();
}
