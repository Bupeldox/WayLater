// const db = require('better-sqlite3')('foobar.db', {  });

// var createTable = `CREATE TABLE IF NOT EXISTS reviews
// (
// 'id' uniqueidentifier PRIMARY KEY,
// 'email' varchar, 
// 'dateRequested' DATE NULL,
// 'reviewContent' varchar,
// 'brand' varchar, 
// 'productName' varchar PRIMARY KEY, 
// );`;




// db.exec(createTable);

// const row = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
// console.log(row.firstName, row.lastName, row.email);





// const helper = {};

// const statements = {
//     getCompletedReviews:db.prepare("select * from reviews where reviewContent is not null")
// };


function getCompletedReviews(){
    //return statements.getCompletedReviews.get();
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
    return getCompletedReviews().filter(i=> (i.brand+" "+i.productName+" "+i.reviewContent).toLowerCase().includes(search.toLowerCase()));
}


helper.createReviewRequest = (email,brand,product)=>{


    var reviewItem = {
        email:email,
        brand:brand,
        productName:product,
        dateRequested: Date.now(),
        id:uuid.v4()
    };

    datastore.store("reviews",reviewItem);

    return reviewItem;

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