// import moment from "moment";

// export const getDateInRegualarFormat = (date) => {
//   let result = "";

//   // if date is today return time in hh:mm format
//   if (moment(date).isSame(moment(), "day")) {
//     result = moment(date).format("hh:mm");
//   }
//   // if date is yesterday return yesterday and time in hh:mm format
//   else if (moment(date).isSame(moment().subtract(1, "day"), "day")) {
//     result = `Yesterday ${moment(date).format("hh:mm")}`;
//   }
//   // if date is this year return date and time in MMM DD hh:mm format
//   else if (moment(date).isSame(moment(), "year")) {
//     result = moment(date).format("MMM DD hh:mm");
//   }

//   return result;
// };
