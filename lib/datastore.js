


var datastore = {
    reviews:[{
        productName: "Pogo stick",
        reviewContent: "Sick, my knees are broken but it good with air piston.",
        rating: 3,
        
    },
    {
        productName: "Ur nan",
        reviewContent: "Died 8 months after purchase",
        rating: 3
    },
    {
        productName: "GTX 9427 MNT ABFET 2nd edition",
        reviewContent: "Good gpu, outdated now tho",
        rating: 3
    }],
    
};


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
module.exports.get = (bin)=>{

    return datastore[bin];

};