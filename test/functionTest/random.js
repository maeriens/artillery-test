const names = ['Kilgore', 'Sawyer', 'Baggins', 'Runciter']
const jobs = ['Firefighter', 'Messi Lover', 'Full Time Duck', 'Bookshelf']

const getRandomData = (userContext, events, done) => {

  let nameI = Math.floor((Math.random() * names.length));
  let jobI = Math.floor((Math.random() * jobs.length));

  userContext.vars.name = names[nameI];
  userContext.vars.job = jobs[jobI];

  return done();
}

module.exports = { getRandomData }
