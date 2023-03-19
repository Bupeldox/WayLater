


var datastore = {
    reviews:[{
        productName: "The name of the thing",
        review: "this is a thing that exists, very wow",
        rating: 3,
        
    },
    {
        productName: "The name of the thing",
        review: "this is a thing that exists, very wow",
        rating: 3
    },
    {
        productName: "The name of the thing",
        review: "this is a thing that exists, very wow",
        rating: 3
    }],
    
};

module.exports.getLatestReviews = () => {
    return datastore.reviews.filter(i=>i.review);
}

module.exports.store = (bin,data)=>{
    if(!datastore[bin]){
        datastore[bin] = [];
    }

    datastore[bin].push(data);

};