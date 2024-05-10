import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("upload:",file)
    if (!file.fieldname) {
      // Ignore files without fieldname attribute
      return;
    }
    console.log("req body: ",req.body)
    if (file.fieldname == 'frontStudentCredential') {
      cb(null, 'uploads/frontStudentCredentials/');
    } else if (file.fieldname == 'backStudentCredential') {
      cb(null, 'uploads/backStudentCredentials/');
    } else {
      cb(new Error('Invalid fieldname'), false);
    }
  },
  filename: (req, file, cb) => {

    console.log("upload filename:",file)
    if (!file.fieldname) {
      // Ignore files without fieldname attribute
      return;
    }
    
    if (file.fieldname == 'frontStudentCredential' || file.fieldname === 'backStudentCredential' ) {
      console.log(req.body)
      cb(null, `${req.body.phoneNumber}.${file.mimetype.split('/')[1]}`);
    /*} else if (file.fieldname === 'cv') {
      cb(null, `${req.body.studentId}.pdf`);*/
    }else {
      cb(new Error('Invalid fieldname'), false);
    }
  },
});

const upload = multer({ storage });

export { upload };