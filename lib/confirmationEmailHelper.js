



async function renderViewToString(res,view,viewmodel) {
    return new Promise((resolve, reject) => {
        res.render(view,viewmodel).then((renderedHtml) => {
            resolve(renderedHtml);
        });
    });
}

module.exports.sendEmail = async (res,formData)=>{



        var viewmodel = {
            id:formData.id,
            productName:formData.productName,
            url:"rgegerg"
        };

       return await renderViewToString(res,'emails/confirmemail',viewmodel);
       

};