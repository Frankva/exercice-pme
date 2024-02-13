const moneyTimeModel = require('../models/MoneyList');
exports.get = async (req, res) => {
  let isConnected = false;
  const date = req.params.date;
  if (!date) {
    console.log('date undefine');
    const today = new Date().toISOString().slice(0, 10);
    return res.redirect('/money-list/' + today);
  }
  const userId = req.session.userId;
  if (!userId) {
    return res.redirect('/login');
  }
  if (! await moneyTimeModel.isAdmin(userId)) {
    return res.redirect('/');
  }
  isConnected = true;
  const selectList = await moneyTimeModel.selectList(date);
  return res.render('money-list', { 
    selectList: selectList,
    dailyDate: date,
    isConnected: isConnected
  });
}
