const isProd = ({NODE_ENV}) => NODE_ENV === 'production'
const isHot = env => !isProd(env)

module.exports = {isProd, isHot}