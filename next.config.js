/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
    env: {
        MONGO_URI: 'mongodb+srv://odaclan:ODAclan1!@odaclan.negcqcl.mongodb.net/odaclan?retryWrites=true&w=majority'
    }
}