import bcrypt from 'bcryptjs'

const bcryptfunc = (pass) => {
  pass = String(pass)
  return bcrypt.hashSync(pass, 10)
}

const users = [
  {
    name: 'admin User',
    email: 'admin@example.com',
    password: bcryptfunc(123456),
    isAdmin: true,
  },
  {
    name: 'john Don',
    email: 'john@example.com',
    password: bcryptfunc(123456),
    isAdmin: false,
  },
  {
    name: 'demi rose',
    email: 'demi@example.com',
    password: bcryptfunc(123456),
    isAdmin: false,
  },
  {
    name: 'daniella chavez',
    email: 'daniella@example.com',
    password: bcryptfunc(123456),
    isAdmin: false,
  },
]
export default users
