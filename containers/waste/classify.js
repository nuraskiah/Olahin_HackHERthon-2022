import { Button, CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import MainLayout from 'components/MainLayout';
import { kontenbase } from 'lib/client';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';

export default function Classify() {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [result, setResult] = useState();
  const router = useRouter();

  const classify = useMutation((body) =>
    axios.post('https://nuraskiah.free.beeceptor.com/classify', body, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
    })
  );

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleClick = () => {
    router.push('/wastes/' + result.predicted);
  };

  const handleFileChange = async (e) => {
    if (
      !e.target.files ||
      !e.target.files.length ||
      !e.target.files[0].type.match('image')
    ) {
      setSelectedFile(undefined);
      return;
    }

    const file = e.target.files[0];
    setSelectedFile(file);

    const formData = new FormData();
    formData.append('file', file);

    const { data } = await classify.mutateAsync(formData);

    const { data: cat } = await kontenbase
      .service('Categories')
      .find({ where: { key: data.predicted } });

    setResult({ ...data, name: cat[0].name });
  };

  return (
    <MainLayout value={2}>
      <h1>Identifikasi</h1>
      <Button variant="contained" component="label">
        Upload File
        <input type="file" hidden onChange={handleFileChange} />
      </Button>
      <Box sx={{ mt: 5 }}>
        {selectedFile && (
          <img
            src={preview}
            style={{
              width: '100%',
            }}
          />
        )}
        {classify.isLoading ? (
          <CircularProgress />
        ) : (
          result && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 5,
              }}
            >
              <Box>
                <Typography variant="h6">{result.name}</Typography>
                <Typography>{result.probability * 100 + '%'}</Typography>
              </Box>
              <Box>
                <Button variant="contained" onClick={handleClick}>
                  Lihat detail
                </Button>
              </Box>
            </Box>
          )
        )}
      </Box>
    </MainLayout>
  );
}
