
const dailySchedulesModel = require('../models/DailySchedules');
const moneyTimeModel = require('../models/moneyTime');

exports.getTime = async (req, res) => {
  let isConnected = false;
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  isConnected = true;
  if (!req.params.date) {
    console.log('date undefine');
    const today = new Date().toISOString().slice(0, 10);
    return res.redirect('/time/' + today);
  }
  const param = {
    dailyDate: req.params.date,
    employeeId: req.session.userId
  };
  const dailySchedules = await dailySchedulesModel.select(param);
  const moneyTime = await moneyTimeModel.select(param);
  res.render('time', { 
    ...dailySchedules,
    ...moneyTime,
    dailyDate: req.params.date,
    isConnected: isConnected
  });
}

exports.postTime = (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  // console.log(req.params);
  // console.log(req.session);
  // console.log(req.body);
  dailySchedulesModel.insert({
    dailyDate: req.body.dailyDate,
    startHour: req.body.startHour,
    endHour: req.body.endHour,
    employeeId: req.session.userId 
  });
    return res.redirect('/time/' + req.body.dailyDate);
}
