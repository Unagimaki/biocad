import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { isValidInput } from './helpers/isValidInput';
import { AMINO_ACIDS } from './data';
import { OrderContainer } from './components/OrderContainer/OrderContainer';
import { TextField, Button, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

type FormData = {
  input1: string;
  input2: string;
};

export default function App() {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: { input1: '', input2: '' },
  });

  const [confirmedInputs, setConfirmedInputs] = useState<{ first: string; second: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = (data: FormData) => {
    if (!data.input1 || !data.input2) {
      setErrorMessage('Оба поля должны быть заполнены');
      return;
    }
    if (data.input1.length !== data.input2.length) {
      setErrorMessage('Длина строк должна быть одинаковой');
      return;
    }
    setConfirmedInputs({ first: data.input1, second: data.input2 });
  };

  const handleCloseError = () => {
    setErrorMessage(null);
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
        sx={{
          maxWidth: 600,
          margin: '40px auto',
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          border: '1px solid #ddd',
          borderRadius: 2,
          boxShadow: 1,
          backgroundColor: '#fafafa',
        }}
      >
        <Typography variant="h5" component="h1" textAlign="center">
          Ввод аминокислотных последовательностей
        </Typography>

        <Controller
          name="input1"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Input 1"
              variant="outlined"
              fullWidth
              value={field.value.toUpperCase()}
              onChange={(e) => {
                const val = e.target.value.toUpperCase();
                if (isValidInput(AMINO_ACIDS, val)) {
                  field.onChange(val);
                }
              }}
            />
          )}
        />

        <Controller
          name="input2"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Input 2"
              variant="outlined"
              fullWidth
              value={field.value.toUpperCase()}
              onChange={(e) => {
                const val = e.target.value.toUpperCase();
                if (isValidInput(AMINO_ACIDS, val)) {
                  field.onChange(val);
                }
              }}
            />
          )}
        />

        <Button type="submit" variant="contained" color="primary" size="large" sx={{ mt: 1 }}>
          Отобразить
        </Button>
      </Box>

      {confirmedInputs && (
        <div style={{ maxWidth: 600, margin: '20px auto' }}>
          <OrderContainer str1={confirmedInputs.first} str2={confirmedInputs.second} />
        </div>
      )}

      {/* Модалка ошибки */}
      <Dialog open={!!errorMessage} onClose={handleCloseError}>
        <DialogTitle>Ошибка</DialogTitle>
        <DialogContent>{errorMessage}</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseError} autoFocus>
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
