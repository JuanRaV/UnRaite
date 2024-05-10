import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'frontStudentCredential') {
      cb(null, 'uploads/frontStudentCredential/');
    } else if (file.fieldname === 'backStudentCredential') {
      cb(null, 'uploads/backStudentCredential/');
    } else {
      cb(new Error('Invalid fieldname'), false);
    }
  },
  filename: (req, file, cb) => {
    if (file.fieldname === 'frontStudentCredential' || file.fieldname === 'frontStudentCredential' ) {
      console.log(req.body)
      cb(null, `${req.body.passangerId}.${file.mimetype.split('/')[1]}`);
    /*} else if (file.fieldname === 'cv') {
      cb(null, `${req.body.studentId}.pdf`);*/
    } else {
      cb(new Error('Invalid fieldname'), false);
    }
  },
});

const upload = multer({ storage });

export { upload };