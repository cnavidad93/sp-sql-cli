import { v4 as uuid } from "uuid";
import { FINALITIES, GRADES, GROUPS, TYPES } from "../constants/constants.js";
import { errorMsg, formatDate } from "./commonHelpers.js";

const createStudyProgrammeGroup = (href, date) => {
  if (!href) errorMsg(`[Error creating studyProgrammes]`, `No href founded.`);

  return {
    startDate: formatDate(date),
    studyProgrammeGroup: {
      href,
    },
  };
};

export const build = (rows = "") => {
  const sql = `
  insert into studyprogrammes(
    key,
    type,
    title,
    "startDate",
    "studyProgrammeGroups"
  )
  values`;

  const values = rows.map(({ title, type, date, grade, finality, group }) => {
    const studyProgrammeGroups = [
      createStudyProgrammeGroup(GRADES[grade], date),
      createStudyProgrammeGroup(FINALITIES[finality], date),
      createStudyProgrammeGroup(GROUPS[group], date),
    ];

    return `
    -- New study programme : ${title}
    ("${uuid()}",
      "${TYPES[type]}",
      "${title}",
      "${formatDate(date)}",
      '${JSON.stringify(studyProgrammeGroups)}'::jsonb
    );`;
  });

  return sql + values.join("");
};
