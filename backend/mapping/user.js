import bcrypt from 'bcryptjs'

// const bcryptfunc = (pass) => {
//   pass = String(pass)
//   return bcrypt.hashSync(pass, 10)
// }

const users = [
  {
    name: 'admin User',
    email: 'admin@example.com',
    password: await bcrypt.hash('Amir12345678', 8),
    isAdmin: true,
  },
  {
    name: 'john Don',
    email: 'john@example.com',
    password: await bcrypt.hash('Amir12345678', 8),
    isAdmin: false,
  },
  {
    name: 'demi rose',
    email: 'demi@example.com',
    password: await bcrypt.hash('Amir12345678', 8),
    isAdmin: false,
  },
  {
    name: 'daniella chavez',
    email: 'daniella@example.com',
    password: await bcrypt.hash('Amir12345678', 8),
    isAdmin: false,
  },
]
export default users
