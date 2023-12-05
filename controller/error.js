const get404 = (req, res, next) => {
    res.status(404).render('404', { pageTitle: '404', productCSS: true, path:'/404' });
};

module.exports = {
    get404
}