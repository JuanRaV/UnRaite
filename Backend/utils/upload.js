import multer from 'multer';
import generateID from "../helpers/generateID.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("upload des req.body:",req.body)
    console.log("file: ",file)//here req.body is undefined
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
    console.log('---------------------------------')
    console.log(" filename:",file)//here also req.body is undefined
    const filename = generateID()
    console.log("id: ", filename)
    console.log('---------------------------------')
    if (file.fieldname == 'frontStudentCredential' || file.fieldname == 'backStudentCredential' || file.fieldname == 'frontDriversLicence' || file.fieldname == 'backDriversLicence' ) {
      
      cb(null, `${filename}.${file.mimetype.split('/')[1]}`);
    }else {
      cb(new Error('Invalid fieldname'), false);
    }
  },
});

const upload = multer({ storage });

export { upload };