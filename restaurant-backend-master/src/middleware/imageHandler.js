import { validationResult } from 'express-validator';
import { unlink } from 'fs';

export const addUserValidationHandler = function (req, res, next) {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
      next();
    } else {
      // remove uploaded files
      if (req.files.length > 0) {
          console.log(req.files[0]);
        const { filename } = req.files[0];
        unlink(
          path.join(__dirname, `../../uploads//${filename}`),
          (err) => {
            if (err) console.log(err);
          }
        );
      }
      // response the errors
      res.status(500).json({
        errors: mappedErrors,
      });
    }
  };
