module.exports = {
    extends: ["standard", "prettier"],
    plugins: ["prettier"],
    rules:{
        semi: ['error', 'never'],
        'prettier/prettier': ['error', { singleQuote: true, semi: false }]
    } 
}
  