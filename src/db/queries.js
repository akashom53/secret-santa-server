const queries = {
  createUserTable: `CREATE TABLE IF NOT EXISTS 'User' ( 
    id INTEGER PRIMARY KEY, 
    name TEXT,  
    phone TEXT UNIQUE,
    gifteeId INTEGER,
    token TEXT
  )`,
  createWishlistTable: `CREATE TABLE IF NOT EXISTS 'Wishlist' ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT,  
    desc TEXT,
    url TEXT,
    userId INTEGER
  )`,
  getAllUsers: 'SELECT * FROM User',
  getUserByPhone: `SELECT * FROM User WHERE phone = ?`,
  getUserByToken: `SELECT * FROM User WHERE token = ?`,
  getUserById: `SELECT * FROM User WHERE id = ?`,
  createUser: `INSERT INTO User (id, name, phone, gifteeId) VALUES (?, ?, ?, ?)`,
  logoutUser: 'update User set token=NULL where id=?',
  setToken: `UPDATE User
  SET token = ?
  WHERE id = ?`,
  getWishlistByUserId: `SELECT * FROM Wishlist WHERE userId = ?`,
  getAllWishlist: `SELECT * FROM Wishlist`,
  createWishlist: `INSERT INTO Wishlist (name, desc, url, userId) VALUES (?, ?, ?, ?)`,
}

module.exports = queries