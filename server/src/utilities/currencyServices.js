const { db } = require('../config/db');

module.exports = {
  async findCurrency(name, id) {

    const currencyRef = db.collection('currency')
    const currencyRefDoc = currencyRef.doc(id);

    const snapshot = await currencyRef.where(FirebaseFirestore.FieldPath.documentId(), '!=', `${id}`).where('name', '==', `${name}`).get()
    //const doc = db.collection('currency').doc(req.params.id)
    // let snapshot = currencyRef.where('name', '==', `${name}`)
    // if(id) {
    //     snapshot = snapshot.where('id', '!=', `${id}`)
    // }
    // snapshot = await snapshot.get()
    
    // Push the currency doc with the same name into an array
    let currencyMatch = []
    snapshot.forEach(doc => {
        currencyMatch.push({
            id: doc.id,
            name: doc.data().name,
            code: doc.data().code,
            country: doc.data().country,
            marketStatus: doc.data().marketStatus,
            imageLogo: doc.data().imageLogo,
            currentPrice: doc.data().currentPrice,
            percentChange24h: doc.data().percentChange24h,
            description: doc.data().description,
            lastUpdated: doc.data().lastUpdated
        })
    })
    return currencyMatch

    currencyMatch = []
    return currencyMatch
}

}