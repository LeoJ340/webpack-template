function bytesToKB(size) {
    return Number((size / 1024).toFixed(2))
}

module.exports = {
    bytesToKB
}
