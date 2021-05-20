exports.getIndex = (req, res, next) => {
    if (req.session.style === undefined) {
        req.session.style = 0;
    }
    if (req.session.counter === undefined) {
        req.session.counter = 0;
    }
    res.render('pages/teamActivities/ta05', {
        title: 'Team Activity 05', 
        path: '/ta05',
        style: req.session.style,
        counter: req.session.counter,
        cssFile: req.session.filePath,
        count: req.session.counter
    });
};

exports.changeStyle = (req, res, next) => {
    let cssFile = 'style0.css';
    const stylepicker = req.body.stylepicker;
    if (stylepicker == 'style1') {
        cssFile = 'style1.css';
    } else if (stylepicker =='style2') {
        cssFile = 'style2.css';
    } else {
        cssFile = 'style0.css';
    }
    req.session.filePath = cssFile;
    // console.log(cssFile);
    res.redirect('/teamActivities/ta05');
}

exports.countDown = (req, res, next) => {
    let count = req.session.counter;
    count -= 1;
    req.session.counter = count;
    res.redirect('/teamActivities/ta05');
}

exports.countUp = (req, res, next) => {
    let count = req.session.counter;
    count += 1;
    req.session.counter = count;
    res.redirect('/teamActivities/ta05');
}

exports.reset = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/teamActivities/ta05');
    })
};

