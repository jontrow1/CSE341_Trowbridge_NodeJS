const Product = require('../models/product');
const { validationResult } = require('express-validator/check');

exports.getAddProduct = (req, res, next) => {
    res.render('pages/shopProject/admin/edit-product', {
        pageTitle: 'Add Product',
        path: 'admin/add-product',
        editing: false,
        hasError: false,
        errorMessage: null,
        validationErrors: []
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422)
        .render('pages/shopProject/admin/edit-product', {
          pageTitle: 'Add Product',
          path: '/admin/add-product',
          editing: false,
          hasError: true,
          product: {
            title: title,
            imageUrl: imageUrl,
            price: price,
            description: description
          },
          errorMessage: errors.array()[0].msg,
          validationErrors: errors.array()
        });
    }

    const product = new Product({title: title, price: price, description: description, imageUrl: imageUrl, userId: req.user});
    product
        .save()
        .then(result => {
            // console.log(result);
            console.log('Created Product');
            res.redirect('./products');
        })
        .catch(err => {
          // return res.status(500)
          // .render('pages/shopProject/admin/edit-product', {
          //   pageTitle: 'Add Product',
          //   path: '/admin/add-product',
          //   editing: false,
          //   hasError: true,
          //   product: {
          //     title: title,
          //     imageUrl: imageUrl,
          //     price: price,
          //     description: description
          //   },
          //   errorMessage: 'Database operation failed, please try again.',
          //   validationErrors: []
          // });
          // res.redirect('./500');
          const error = new Error(err);
          error.httpStatusCode = 500;
          return next(error);
        });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect('pages/shopProject/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
      .then(product => {
        if (!product) {
          return res.redirect('../shop');
        }
        res.render('pages/shopProject/admin/edit-product', {
          pageTitle: 'Edit Product',
          path: '/admin/edit-product',
          editing: editMode,
          product: product,
          hasError: false,
          errorMessage: null,
          validationErrors: []
        });
      })
      .catch(err => {
        const error = new Error(err);
          error.httpStatusCode = 500;
          return next(error);
      });
};
  
exports.postEditProduct = (req, res, next) => {
const prodId = req.body.productId;
const updatedTitle = req.body.title;
const updatedPrice = req.body.price;
const updatedImageUrl = req.body.imageUrl;
const updatedDesc = req.body.description;
const errors = validationResult(req);

if (!errors.isEmpty()) {
  return res.status(422)
    .render('pages/shopProject/admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: true,
      hasError: true,
      product: {
        title: updatedTitle,
        imageUrl: updatedImageUrl,
        price: updatedPrice,
        description: updatedDesc,
        _id: prodId
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
}

Product.findById(prodId).then(product => {
  if (product.userId.toString() !== req.user._id.toString()) {
    return res.redirect('../shop');
  }
  product.title = updatedTitle;
  product.price = updatedPrice;
  product.description = updatedDesc;
  product.imageUrl = updatedImageUrl;
  return product
    .save().then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('./products');
    })
})  
  .catch(err => {
    const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
  });
};

exports.getProducts = (req, res, next) => {
    Product.find({userId: req.user._id})
        .then(products => {
            res.render('pages/shopProject/admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
        })
        .catch(err => {
          const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteOne({_id: prodId, userId: req.user._id})
      .then(() => {
        console.log('DESTROYED PRODUCT');
        res.redirect('./products');
      })
      .catch(err => {
        const error = new Error(err);
          error.httpStatusCode = 500;
          return next(error);
      });
};