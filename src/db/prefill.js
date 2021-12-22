const queries = require("./queries")

const _run = async (db, query, params) => new Promise((resolve, reject) => {
  db.run(query, params, function (error) {
    console.log(this)
    if (error) {
      reject(error)
    } else {
      resolve(this)
    }
  })
})

const users = [
  [1, "Divyansh", "9953742261",],
  [2, "Vidur", "9999411237",],
  [3, "Abhishek", "9716976612",],
  [4, "Phil", "8884141979",],
  [5, "Raghav", "9899123341",],
  [6, "Akash", "9958831638",],
  [7, "Simran", "8054105473",],
  [8, "Gilson", "8800891039",],
  [9, "Blesson", "9891872488",],
  [10, "Jenny", "9716261872",],
  [11, "Ashish", "7503173103",],
  [12, "Rijo", "9886478871",],
  [13, "Anjali", "9650199611",],
  [14, "Vishnu", "9968776339",],
  [15, "Roshan", "9711444506",],
  [16, 'Jaison', '9847896946',],
  [17, 'Jijo', '90139 57494',]
]

const _shuffle = () => {
  console.log("Shuffling")
  let added = []
  for (let user of users) {
    while (true) {
      const giftee = Math.floor((Math.random() * 17)) + 1
      if (giftee == user[0]) continue
      if (added.includes(giftee)) continue
      user.push(giftee)
      added.push(giftee)
      break
    }
    console.log(user)
  }
  console.log("Shuffling complete")
}

module.exports = prefillDb = async (db) => {
  
  _shuffle()
  console.log("Updating db")
  for (let user of users) {
    const result = await _run(db, queries.createUser, user)
  }
}