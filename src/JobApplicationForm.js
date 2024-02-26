import React, { useState } from 'react';
import { Formik, Form, } from 'formik';
import axios from 'axios';
import {
  TextField, Button, Radio, RadioGroup, FormControlLabel, FormControl,
  FormLabel, Box
} from '@mui/material';
import * as Yup from 'yup';


function JobApplicationForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    department: '',
    contactPreference: 'email',
    email: '',
    phone: '',
    country: 0, // Ülke için de state eklendi.
    city: '',
    detailedAddress: '',
    // Diğer form verileri...
  });
// Yup doğrulama şeması, dosya boyutu ve tipi için ek kısıtlamalar eklenmiş olabilir
const validationSchema = Yup.object({
    firstName: Yup.string().required('Ad alanı zorunludur'),
    lastName: Yup.string().required('Soyad alanı zorunludur'),
    email: Yup.string().email('Geçersiz e-posta adresi').required('E-posta alanı zorunludur'),
    resume: Yup.mixed().required('Özgeçmiş dosyası zorunludur')
        .test("fileSize", "Dosya çok büyük", value => value && value.size <= 1024 * 1024) // Maksimum 1MB
        .test("fileType", "Desteklenmeyen dosya türü", value => value && ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(value.type)),
    phone: Yup.string().matches(/^\d{10}$/, 'Geçerli bir telefon numarası giriniz').required('Telefon numarası zorunludur'),
});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));

   

  };

  const [isFileUploaded, setIsFileUploaded] = useState(false);


  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Form verileri:', values); // Form verilerini konsola yazdır
    setSubmitting(false);

    // Form verilerini Axios ile POST isteği olarak gönderme
    axios.post('', formData)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Hata:', error);
    });
    // Burada form verilerini backend'e göndermek için API çağrısı yapabilirsiniz
    // Örneğin:
    // axios.post('api/submit', values)
    //   .then(response => { /* ... */ })
    //   .catch(error => { /* ... */ });
  };




  return (

    
    <Box sx={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("https://fabitech.com.tr/assets/media/logos/logo-landing.png")',
          backgroundSize:'content',
          opacity: 0.1,
          zIndex: -1,
        }}
      ></Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.paper',
          borderRadius: '4px',
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
          p: 4,
          maxWidth: '500px',
          mx: 'auto',
          my: 2,
          zIndex: 'tooltip',
          '& .MuiTextField-root, .MuiFormControl-root': { m: 1, width: '100%' }
        }}
      >
        <h1>İş Başvuru Formu</h1>
        <Formik
                    initialValues={{ firstName: '', lastName: '', email: '', phone: '', resume: null}}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {({ isSubmitting, setFieldValue }) => (
                        <Form>
                                <TextField
                                    required
                                    fullWidth
                                    label="Adı"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                                <TextField
                                    required
                                    fullWidth
                                    label="Soyadı"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                                <TextField
                                    required
                                    fullWidth
                                    label="Doğum Tarihi"
                                    name="birthDate"
                                    type="date"
                                    value={formData.birthDate}
                                    onChange={handleChange}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextField
                                    required
                                    fullWidth
                                    label="Bölüm"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                />
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">İletişim kurmamızı istediğiniz kanal</FormLabel>
                                    <RadioGroup
                                    row
                                    name="contactPreference"
                                    value={formData.contactPreference}
                                    onChange={handleChange}
                                    >
                                    <FormControlLabel value="email" control={<Radio />} label="Email" />
                                    <FormControlLabel value="phone" control={<Radio />} label="Phone" />
                                    </RadioGroup>
                                </FormControl>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth
                                    label="Tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder='(_ _ _) _ _ _  _ _  _ _'
                                />
                               
                                <TextField
                                    fullWidth
                                    label="Şehir"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth
                                    label="Açık Adres"
                                    name="detailedAddress"
                                    value={formData.detailedAddress}
                                    onChange={handleChange}
                                    multiline
                                    maxRows={4}
                                />
                            <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'center', // Butonu ortalar
                                  my:1
                                 
                                }}>
                            <input
                            accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            style={{ display: 'none' }}
                            id="resume-file"
                            type="file"
                            onChange={(event) => {
                              if (event.currentTarget.files[0]) {
                                setFieldValue("resume", event.currentTarget.files[0]);
                                setIsFileUploaded(true);
                              } else {
                                setIsFileUploaded(false);
                              }
                            }}
                          />
                          <label htmlFor="resume-file">
                            <Button variant="contained" color="primary" component="span" style={{alignItems:'center'}}>
                              CV Yükle
                            </Button>
                          </label>
                          
                          </Box>
                          {isFileUploaded && (
                                <Box
                                  sx={{
                                    display: 'flex',
                                    justifyContent: 'center', // Yatay olarak ortalar
                                    alignItems: 'center',    // Dikey olarak ortalar
                                    
                                  }}
                                >
                                  <p>Dosya yüklendi!</p>
                                </Box>
                              )}
                            <Button type="submit" color="success" variant="contained" disabled={isSubmitting} fullWidth   >
                                Gönder
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
    </Box>
  );
}

export default JobApplicationForm;
