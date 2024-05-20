import multer from 'multer';
import generateID from "../helpers/generateID.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("destination: ",file)
    if (!file.fieldname) {
      // Ignore files without fieldname attribute
      return;
    }
   
    if (file.fieldname == 'frontStudentCredential') {
      cb(null, 'uploads/frontStudentCredentials/');
    } else if (file.fieldname == 'backStudentCredential') {
      cb(null, 'uploads/backStudentCredentials/');
    } else if (file.fieldname == 'frontDriversLicence') {
      cb(null, 'uploads/frontDriversLicences/');
    }else if (file.fieldname == 'backDriversLicence') {
      cb(null, 'uploads/backDriversLicences/');
    }else {
      cb(new Error('Invalid fieldname'), false);
    }
  },
  filename: (req, file, cb) => {
    console.log("filename: ",file)
    const filename = generateID()
  
    if (file.fieldname == 'frontStudentCredential' || file.fieldname == 'backStudentCredential' || file.fieldname == 'frontDriversLicence' || file.fieldname == 'backDriversLicence' ) {
      
      cb(null, `${filename}.${file.mimetype.split('/')[1]}`);
    }else {
      cb(new Error('Invalid fieldname'), false);
    }
  },
});

const upload = multer({ storage });

export { upload };