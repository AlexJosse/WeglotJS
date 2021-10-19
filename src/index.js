const fs = require("fs");

const readFile = (fileName) => {
  try {
    const data = fs.readFileSync(fileName, "utf8");
    return data;
  } catch (err) {
    console.error(err);
  }
};

const convertHhMmToSecond = (date) => {
  const [hours, minutes] = date.split(":");
  const totalSeconds = +hours * 60 * 60 + +minutes * 60;
  return totalSeconds;
};

const sortDate = (listDate) => {
  listDate.sort((a, b) => {
    let one = convertHhMmToSecond(a.slice(0, 5));
    let second = convertHhMmToSecond(b.slice(0, 5));
    if (one < second) {
      return -1;
    }
    if (one > second) {
      return 1;
    }
    return 0;
  });
};

const checkingForAday = (listDate) => {
  let start = 28800; // 08:00:00
  const end = 64740; // 17:59:00
  const timeScheduled = 3540;
  let result_one = '';
  let result_two = '';
  let cpt = 0;
  sortDate(listDate);
  while (cpt < listDate.length) {
    if (listDate[cpt] !== undefined) {
      if (
        convertHhMmToSecond(listDate[cpt].slice(0, 5)) - timeScheduled >=
        start
      ) {
        return new Date((start) * 1000 ).toISOString().substr(11, 5) + '-' + new Date((start + (60*59)) * 1000 ).toISOString().substr(11, 5);
      }
      if (listDate[cpt + 1] !== undefined) {
        if (
          convertHhMmToSecond(listDate[cpt].slice(6, 11)) + timeScheduled <
            convertHhMmToSecond(listDate[cpt + 1].slice(0, 5)) &&
          convertHhMmToSecond(listDate[cpt].slice(6, 11)) + timeScheduled < end
        ) {
          result_one = convertHhMmToSecond(listDate[cpt].slice(6, 11));
          result_two = result_one + (60 * 60) - 1;
          return new Date((result_one + 60 )* 1000 ).toISOString().substr(11, 5) + '-' + new Date((result_two + 60 )* 1000 ).toISOString().substr(11, 5);
        }
      }
      start = convertHhMmToSecond(listDate[cpt].slice(6, 11));
      cpt += 1;
    }
  }
  return "no result founded";
};

const checkBooking = (dataFile, day) => {
  // const regexp = /(3 [0-1]?[0-9]|2[0-3]):[0-5][0-9]-[0-9][0-9]:[0-5][0-9]/g;
  const regex = new RegExp(
    `(${day} [0-1]?[0-9]|2[0-3]):[0-5][0-9]-[0-9][0-9]:[0-5][0-9]`,
    "g"
  );
  const matches_array = dataFile.match(regex);
  if (matches_array === null) {
    return "no result";
  }
  const date = matches_array.map((el) => {
    return el.replace(`${day} `, "");
  });
  const result = checkingForAday(date);
  return (day + ' ' + result);
};

fs.readdirSync("./data/").forEach((file) => {
  if (file.includes("input") === true) {
    const data = readFile(`./data/${file}`);
    checkBooking(data, 1);
  }
});

module.exports = {checkBooking, readFile};
