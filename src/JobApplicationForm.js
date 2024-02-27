import React, { useState, useEffect } from 'react';
import { Formik, Form, Field,ErrorMessage } from 'formik';
import axios from 'axios';
import {
  TextField, Button, RadioGroup, FormControlLabel, FormControl,
  FormLabel, Box, Radio, LinearProgress, Typography, Snackbar, Alert
} from '@mui/material';
import { green } from '@mui/material/colors';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Ad alanı zorunludur'),
  surname: Yup.string().required('Soyad alanı zorunludur'),
  birthday: Yup.date().required('Doğum tarihi zorunludur'),
  section: Yup.string().required('Bölüm alanı zorunludur'),
  email: Yup.string().email('Geçersiz e-posta adresi').required('E-posta alanı zorunludur'),
  phone: Yup.string().matches(/^\d{10}$/, 'Geçerli bir telefon numarası giriniz').required('Telefon numarası zorunludur'),
  city: Yup.string().required('Şehir alanı zorunludur'),
  adress: Yup.string().required('Açık adres alanı zorunludur'),
  resume: Yup.mixed()
    .nullable(true) // Allow resume to be null
    .test(
      "fileSize",
      "Dosya çok büyük",
      value => !value || (value && value.size <= 1024 * 1024) // Check if the file size is less than or equal to 1MB
    )
    .test(
      "fileType",
      "Desteklenmeyen dosya türü",
      value => !value || (value && ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(value.type)) // Check for allowed file types
    ),
});
const initialValues = {
  name: '',
  surname: '',
  birthday: '',
  section: '',
  contactPrefence: 'email',
  email: '',
  phone: '',
  city: '',
  adress: '',
  resume: null,
};

function JobApplicationForm() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();

    const asyncOperations = Object.keys(values).map(key => {
      if (values[key] !== null && key === 'resume' && values[key] instanceof File) {
        return convertToBase64(values[key]).then(base64 => {
          formData.append(key, base64);
        });
      } else {
        formData.append(key, values[key]);
        return Promise.resolve();
      }
    });

    try {
      let url = `${process.env.REACT_APP_API_URL}/UsersInformation`;
      await Promise.all(asyncOperations);

      const jsonObject = {};
      for (const [key, value] of formData.entries()) {
        jsonObject[key] = value;
      }

      const jsonFormData = JSON.stringify(jsonObject);
      const response = await axios.post(url, jsonFormData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Sunucu yanıtı:', response.data);
    } catch (error) {
      console.error('Hata:', error);
      setSnackbarMessage('Form gönderilirken bir hata oluştu.');
      setOpenSnackbar(true);
    }

    setSubmitting(false);
  };

  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedFileName, setUploadedFileName] = useState(null);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        let base64Data = fileReader.result.split('base64,').pop();
        resolve(base64Data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  useEffect(() => {
    let timer;
    if (isFileUploaded) {
      timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(timer);
            return 100;
          }
          return Math.min(oldProgress + 10, 100);
        });
      }, 250);
    } else {
      setProgress(0);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isFileUploaded]);

  const handleFileRemove = (setFieldValue) => {
    setFieldValue("resume", null);
    setUploadedFileName(null);
    setIsFileUploaded(false);
  };

  return (
    <Box sx={{ position: 'relative', minWidth: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
      <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'url("https://fabitech.com.tr/assets/media/logos/yatay-logo.png")', backgroundSize: '300px 400px', opacity: 0.1, zIndex: 0 }}></Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: 'transparent', background: 'linear-gradient(180deg, rgba(74,63,146,1) 0%, rgba(156,63,146,1) 100%)', borderRadius: '10px', boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)', p: 4, maxWidth: '500px', mx: 'auto', my: 2, zIndex: 'tooltip', color: 'white', '& .MuiTextField-root, .MuiFormControl-root': { m: 1, width: '100%', backgroundColor: '#black', color: 'white', '& input': { color: 'white', }, '& label': { color: 'white', }, '& .MuiInput-underline:before': { borderBottomColor: 'white', }, '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: 'white', }, '& .MuiInput-underline:after': { borderBottomColor: 'white', }, '&::placeholder': { color: 'rgba(255, 255, 255, 0.6)', }, }, '& h1': { color: 'white', }, '& FormLabel': { color: 'white', }, '& .MuiButton-root': { color: 'white', }, }} >
        <h1>İş Başvuru Formu</h1>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <Field as={TextField} name="name" label="Adı" fullWidth required />
              <ErrorMessage name="name" component="div" />
              <Field as={TextField} name="surname" label="Soyadı" fullWidth required />
              <ErrorMessage name="surname" component="div" />
              <Field as={TextField} name="birthday" label="Doğum Tarihi" type="date" fullWidth required InputLabelProps={{ shrink: true }} />
              <ErrorMessage name="birthday" component="div" />
              <Field as={TextField} name="section" label="Bölüm" fullWidth required />
              <FormControl component="fieldset">
                <FormLabel component="legend" sx={{ color: 'white' }}>İletişim Tercihi</FormLabel>
                <Field as={RadioGroup} name="contactPrefence" row>
                  <FormControlLabel value="email" control={<Radio />} label="Email" />
                  
                 <FormControlLabel value="phone" control={<Radio />} label="Phone" />
                

                </Field>
              </FormControl>
              <Field as={TextField} name="email" label="Email" fullWidth required />
              <ErrorMessage name="email" component="div" />
              <Field as={TextField} name="phone" label="Telefon" placeholder="(5__) ___ __ __" fullWidth required InputLabelProps={{ shrink: true }} />
              <ErrorMessage name="phone" component="div" />
              <Field as={TextField} name="city" label="Şehir" fullWidth required />
              <ErrorMessage name="city" component="div" />
              <Field as={TextField} name="adress" label="Açık Adres" fullWidth required multiline InputProps={{ style: { color: 'white' }, }} />
              <ErrorMessage name="adress" component="div" />
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
                <input accept=".pdf,.doc,.docx" style={{ display: 'none' }} id="resume-file" type="file" onChange={(event) => {
                  if (event.currentTarget.files[0]) {
                    setFieldValue("resume", event.currentTarget.files[0]);
                    setUploadedFileName(event.currentTarget.files[0].name);
                    setIsFileUploaded(true);
                  } else {
                    setIsFileUploaded(false);
                  }
                }} />
                <label htmlFor="resume-file">
                  <Button variant="contained" color="primary" component="span" style={{ alignItems: 'center' }}>CV Yükle</Button>
                </label>
                {uploadedFileName && (
                  <Box sx={{ marginLeft: '10px', display: 'block', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
                    <Typography variant="body2">{uploadedFileName}</Typography>
                    <Button variant="text" color="secondary" onClick={() => handleFileRemove(setFieldValue)}>X</Button>
                  </Box>
                )}
              </Box>
              {isFileUploaded && (
                <Box sx={{ width: '100%', my: 2, position: 'relative' }}>
                  <LinearProgress variant="determinate" value={progress} sx={{ backgroundColor: green[100], height: 20, borderRadius: 5 }} />
                  {progress < 100 ? (
                    <Typography variant="body2" color="white" align="center" sx={{ position: 'absolute', width: '100%', lineHeight: '20px', top: 0, left: 0, fontSize: '0.875rem' }}>Yükleniyor...</Typography>
                  ) : (
                    <Typography variant="body2" color="white" align="center" sx={{ position: 'absolute', width: '100%', lineHeight: '20px', top: 0, left: 0, fontSize: '0.875rem' }}>Dosya yüklendi!</Typography>
                  )}
                </Box>
              )}
              <Button type="submit" color="success" variant="contained" disabled={isSubmitting} fullWidth>Gönder</Button>
            </Form>
          )}
        </Formik>
      </Box>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: '100%' }}>{snackbarMessage}</Alert>
      </Snackbar>
    </Box>
  );
}

export default JobApplicationForm;
