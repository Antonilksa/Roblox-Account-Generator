import fetch from "node-fetch";
import fs from "fs";

import NAMES from './names.json' assert { type: 'json' };

console.log('');
console.log('Github: https://github.com/Antonilksa');
console.log('Discord: ! 「NB」 Antoniksa#1002');

const cache = {};
if (!fs.existsSync("./cache.json")) {
  fs.writeFileSync("./cache.json", JSON.stringify(cache));
}

async function checkLastOnline(username) {
  const url = `https://users.roblox.com/v1/usernames/users`;
  const data = { usernames: [username], excludeBannedUsers: true };

  let response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error(`Error checking username ${username}: ${err.message}`);
    return false;
  }

  if (response.status !== 200) {
    console.error(`Error checking username ${username}: received status code ${response.status}`);
    return false;
  }

  let json;
  try {
    json = await response.json();
  } catch (err) {
    console.error(`Error parsing JSON response for username ${username}: ${err.message}`);
    return false;
  }

  if (!json.data || json.data.length === 0) {
    console.error(`Error checking username ${username}: received empty response data`);
    return false;
  }

  const userId = json.data[0].id;
  const onlineUrl = `https://presence.roblox.com/v1/presence/last-online`;
  const onlineData = { userIds: [userId] };

  try {
    response = await fetch(onlineUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(onlineData),
    });
  } catch (err) {
    console.error(`Error checking last online for username ${username}: ${err.message}`);
    return false;
  }

  if (response.status !== 200) {
    console.error(`Error checking last online for username ${username}: received status code ${response.status}`);
    return false;
  }

  try {
    json = await response.json();
  } catch (err) {
    console.error(`Error parsing JSON response for last online check of username ${username}: ${err.message}`);
    return false;
  }

  if (!json.lastOnlineTimestamps || json.lastOnlineTimestamps.length === 0) {
    console.error(`Error checking last online for username ${username}: received empty response data`);
    return false;
  }

  const lastOnline = json.lastOnlineTimestamps[0].lastOnline;
  const year = lastOnline.slice(0, 4);

  return year === "2010";
}

(async () => {
  try {
    for (const firstName of NAMES.first) {
      let startIndex = 0;
      while (startIndex < 500) {
        let response = await fetch(
          `https://www.roblox.com/search/users/results?maxRows=100&keyword=${firstName}&startIndex=${startIndex}`
        );

        let users;
        try {
          users = await response.json();
        } catch (err) {
          console.error(`Error parsing JSON response for search results of ${firstName}: ${err.message}`);
          continue;
        }

        if (!users.UserSearchResults) continue;

        for (const user of users.UserSearchResults) {
          if ((cache[user.Name] || (cache[user.Name] = [])).includes(user.Name)) continue;

          console.log(`Checking account ${user.Name}`);

          const validAccount = await checkLastOnline(user.Name);

          if (validAccount) {
            console.log(`Found valid account ${validAccount}`);
            cache[user.Name].push(validAccount);
            fs.appendFileSync(
              "alts.txt",
              `${user.Name}:l0l0l0l\n`
            );
          }
        }
    
        startIndex = startIndex === 0 ? 12 : startIndex * 2;
    
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
    
    fs.writeFileSync("./cache.json", JSON.stringify(cache));
  } catch (err) {
    console.error(`An error occurred: ${err.message}`);
    console.error(err.stack);
  }
})();

process.on("SIGINT", () => {
  fs.writeFileSync("./cache.json", JSON.stringify(cache));
});

export default cache;
export { checkLastOnline };