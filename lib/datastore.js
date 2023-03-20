


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
module.exports.getReviewableById = (id)=>{

    return datastore.reviews.find(i=>i.id == id);

}
module.exports.store = (bin,data)=>{
    if(!datastore[bin]){
        datastore[bin] = [];
    }

    if(!data.id){
        return false;
    }

    var index = datastore[bin].findIndex(i=>i.id == data.id);

    if(index!=-1){
        datastore[bin][index] = data;
        return true;
    }else{
        datastore[bin].push(data);
        return true;
    }

    return false;
};