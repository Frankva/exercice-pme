const employeeModel = require('../models/Employee');

exports.getLogin = (req, res) => {
  if (req.session.userId) {
    return res.redirect('/time/');
  }
  res.render('login', {});
}

exports.postLogin = (req, res) => {
  const {email, password} = req.body;
  const id = employeeModel.getEmployeeId(email, password)
    .then(id => {
      // res.send("login correct");
      req.session.userId = id.toString();
      res.redirect('/time');
    })
    .catch(e => {
      console.log(e);
      res.send("login incorrect");
    });
}
