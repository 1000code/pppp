exports.totalCOD = (COD, percentage, currency_cod) => {
  let arrayCOD = [];
  let zum = 0;
  let money = 0;

  currency_cod === "lak" &&
    COD.map((item) => {
      if (item.currency_cod === "lak") {
        percentage.map((val) => {
          if (item.cod_lak >= val.price && currency_cod === val.currency) {
            money = (item.cod_lak * val.percent_branch) / 100;
          }
        });
        arrayCOD.push(money);
      }
    });

  currency_cod === "thb" &&
    COD.map((item) => {
      if (item.currency_cod === "thb") {
        percentage.map((val) => {
          if (item.cod_thb >= val.price && currency_cod === val.currency) {
            money = (item.cod_thb * val.percent_branch) / 100;
          }
        });
        arrayCOD.push(money);
      }
    });

  currency_cod === "usd" &&
    COD.map((item) => {
      if (item.currency_cod === "usd") {
        percentage.map((val) => {
          if (item.cod_usd >= val.price && currency_cod === val.currency) {
            money = (item.cod_usd * val.percent_branch) / 100;
          }
        });
        arrayCOD.push(money);
      }
    });

  arrayCOD.map((item) => {
    zum = zum + item;
  });

  zum === 0 && (zum = "-");
  return zum;
};

exports.shippingCost = (allParcel, tracking, branch_code, branch) => {
  let totalAll = 0;
  let totalStart = 0;
  let totalEnd = 0;
  let total_warehouse = 0;

  const percent_receive = branch.dividends_join[0].receive;
  const percent_delivery = branch.dividends_join[0].delivery;
  const percent_warehouse = branch.dividends_join[0].warehouse;

  allParcel.map((item) => {
    if (item.branch_start === branch_code) {
      totalStart = totalStart + item.shipping_cost;
    }
    if (
      item.branch_end === branch_code &&
      item.warehouse_now === branch_code &&
      item.status_parcel === "success"
    ) {
      totalEnd = totalEnd + item.shipping_cost;
    }
  });

  tracking.map((val) => {
    allParcel.map((item) => {
      if (
        val.serial_parcel === item.serial_parcel &&
        val.cancel_parcel === false
      ) {
        total_warehouse = total_warehouse + item.shipping_cost;
      }
    });
  });

  let totalWarehouse = (total_warehouse * percent_warehouse) / 100;
  let totalS = (totalStart * percent_receive) / 100;
  let totalE = (totalEnd * percent_delivery) / 100;
  let totalBranch = totalS + totalE;

  totalAll = totalBranch + totalWarehouse;

  totalAll === 0 && (totalAll = "-");
  totalWarehouse === 0 && (totalWarehouse = "-");
  totalBranch === 0 && (totalBranch = "-");

  return { totalBranch, totalWarehouse, totalAll };
};
