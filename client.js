const fs = require("fs");
const axios = require("axios");
const { config } = require("dotenv");

const data = JSON.parse(fs.readFileSync("dict/dict.json", "utf-8"));

data.forEach((obj) => {
  let config = {
    method: "post",
    url: `https://project-irula.azurewebsites.net/api/newWord`,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      lexicalUnit: obj.lexicalUnit,
      grammaticalInfo: obj.grammaticalInfo,
      picturePath: `https://projectirulapics.blob.core.windows.net/project-irula-pictures/${obj.enWord}.jpg`,
      audioPath: `https://projectirulapics.blob.core.windows.net/project-irula-audio/${obj.enWord}.mp3`,
      enWord: obj.enWord,
      irulaWord: obj.irulaWord,
      taWord: obj.taWord,
      enMeaning: obj.enMeaning,
      taMeaning: obj.taMeaning,
      category: obj.category,
    }),
  };
  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
});
