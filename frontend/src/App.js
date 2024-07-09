import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState('');

  const handleDownload = async () => {
    setDownloading(true);
    setError('');
    try {
      const response = await axios({
        method: 'get',
        url: 'http://localhost:4000/download',
        params: { url },
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'video/mp4' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'video.mp4';
      link.click();
    } catch (error) {
      setError('Error downloading the video. Please check the URL and try again.');
      console.error('Error downloading the video', error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Container className="mt-5 text-center">
      <Helmet>
        <title>YouTube Video Downloader</title>
        <meta property="og:title" content="YouTube Video Downloader" />
        <meta property="og:description" content="Easily download YouTube videos with just a few clicks." />
        <meta property="og:image" content="https://your-website.com/preview-image.jpg" />
        <meta property="og:url" content="https://your-website.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <h1 className="mb-4">YouTube Video Downloader</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form className="mb-4">
        <Form.Group>
          <Form.Control
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter YouTube URL"
            className="mb-2 input-url"
          />
        </Form.Group>
        <Button onClick={handleDownload} disabled={downloading} className="btn-download">
          {downloading ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              {' '}Downloading...
            </>
          ) : (
            'Download'
          )}
        </Button>
      </Form>
      <footer>
        <p>
          <small>
            Disclaimer: This application is for educational purposes only. Downloading copyrighted material may be illegal in your country. Please use this application responsibly.
          </small>
        </p>
        <p>
          <small>
            Made with <i className="fas fa-heart text-danger"></i> by Your Name
          </small>
        </p>
      </footer>
    </Container>
  );
}

export default App;
