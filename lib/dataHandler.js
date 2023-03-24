

const uuid = require("uuid");
const datastore = require("./datastore");

const helper = {};



function getCompletedReviews(){
    return datastore.get("reviews")
    .filter(i=>i.reviewContent)
}

helper.getLatestReviews = () => {
    var 
    reviews = getCompletedReviews()
    .sort((a,b)=>a.dateRequested - b.dateRequested)
    .slice(0,5);//take latest 5

    return reviews;
}
helper.getReviewableById = (id)=>{

    return datastore.get("reviews").find(i=>i.id == id);

}

helper.getFilteredReviews = (search)=>{
    return getCompletedReviews().filter(i=> (i.brand+" "+i.productName+" "+i.reviewContent).includes(search));
}

helper.createReviewRequest = (email,brand,product)=>{

    var reviewItem = {
        email:email,
        brand:brand,
        productName:product,
        dateRequested: Date.now(),
    };

    datastore.store("reviews",reviewItem);

}

helper.updateReview = (reviewContent,productName,brand,id)=>{
    var review = helper.getReviewableById(id);
    if(!review){
        return;
    }
    //TODO put check in here to see if the date is > than 1 year?

    review.reviewContent = reviewContent;
    review.brand = brand;
    review.productName = productName;
    datastore.store("reviews",review);

}

module.exports = helper;