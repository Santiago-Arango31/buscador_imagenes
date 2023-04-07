import { Form, Field, Formik } from "formik";
import { useState } from "react";
import './header.css'
import './container.css'


function App() {
  const [photos, setPhotos] = useState([])
  const open = url => window.open(url)
  console.log({ photos })
  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: '' }}
          onSubmit={
            async values => {
              const resp = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, {
                headers: {
                  'Authorization': 'Client-ID fVInZfuMiOCbG2Hr4XMa5iYfXhj06g6F4S1S-wXItlA'
                }
              })
              const data = await resp.json()
              setPhotos(data.results)

            }}
        >
          <Form>
            <Field name='search'></Field>
          </Form>
        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {photos.map(photo =>
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.regular} />
              <p>{[photo.description, photo.alt_description].join('-')}</p>
            </article>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
