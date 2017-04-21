/**
 * Created by chuhaoyuan on 2017/2/7.
 */
const Helper  = function () {
  let that = {};
  that.numberToDollar = function (number) {
    if (number.toString().length > 3 && number.toString().length <= 6){
      return (number/1000).toFixed(3) + 'K';
    }else
    if (number.toString().length > 6 && number.toString().length <= 9){
      return Math.floor(number/1000000) + 'M';
    }else
    if (number.toString().length > 9 && number.toString().length <= 12){
      return Math.floor(number/1000000000) + 'B';
    }else
    if (number.toString().length > 12) {
      return Math.floor(number/1000000000000) + 'T';
    }


    return number;
  };
  return that;
};
let helper = Helper();
export default helper;