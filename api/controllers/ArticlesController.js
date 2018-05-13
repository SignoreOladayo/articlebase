/**
 * ArticlesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    list:async function (req, res) {

       var articlelist = await Articles.find();

       return res.view('pages/list', {articles:articlelist});
        
    },

    add:function (req, res) {
        return res.view('pages/add');
    },

    create:async function (req, res) {
        var title = req.body.title
        var body = req.body.body

        //store in db
       await Articles.create({
            title:title,
            body:body
        })

        return res.redirect('/articles/list');
    },

    delete:async function(req, res) {
       await Articles.destroy({
            id: req.param('id')
        });

       return res.redirect('/articles/list');
    },

    edit:async function(req, res) {

        var articleInstance = await Articles.findOne({id: req.param('id')});

        return res.view('pages/edit', {article: articleInstance});
    },

    update:async function(req, res) {
        var title = req.body.title
        var body = req.body.body

        await Articles.update({
            id: req.param('id')
        }).set({
            title: title,
            body:body
        })

        return res.redirect('/articles/edit/'+req.param('id'))
    }

};

