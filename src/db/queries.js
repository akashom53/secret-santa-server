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
  getUserByPhone: `SELECT * FROM User WHERE phone = ?`,
  getUserById: `SELECT * FROM User WHERE id = ?`,
  createUser: `INSERT INTO User (id, name, phone, gifteeId) VALUES (?, ?, ?, ?)`,
  setToken: `UPDATE User
  SET token = ?
  WHERE id = ?`,
  getWishlistByUserId: `SELECT * FROM Wishlist WHERE userId = ?`,
  createWishlist: `INSERT INTO Wishlist (name, desc, url, userId) VALUES (?, ?, ?, ?)`,
}

module.exports = queries