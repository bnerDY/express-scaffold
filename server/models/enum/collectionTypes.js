let Enum = {};

Enum.alert = "alert";
Enum.chart = "chart";
Enum.application = "application";

Enum.toModel = enumeration => {
  let map = {
    alert: require("../alert"),
    application: require("../application"),
    chart: require("../chart")
  };

  return map[enumeration];
};

Enum.toCollectionName = enumeration => {
  let map = {
    alert: "alert",
    application: "application",
    chart: "chart"
  };
  return map[enumeration];
};

module.exports = Enum;
