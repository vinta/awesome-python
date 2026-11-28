Pillow makes thumbnails, crops, and format conversions, and scikit-image analyzes images for science. pyvips streams large images instead of loading them whole.

How to choose:

- Thumbnails, crops, and format conversion: Pillow
- Scientific image analysis on NumPy arrays: scikit-image
- Large images or batch jobs short on memory: pyvips
- Removing photo backgrounds: rembg
- ImageMagick from Python: Wand
- QR codes: qrcode
- Linear barcodes like EAN-13 and Code 128: python-barcode
- Resizing and cropping on request over HTTP: thumbor

### Pillow

Start with Pillow for everyday work. Its docs pitch it for batch jobs that [create thumbnails and convert between file formats](https://pillow.readthedocs.io/en/stable/handbook/overview.html). Move to scikit-image when you need to analyze what an image shows, or to pyvips when images get big enough that memory runs short. Shrink images with [`thumbnail()`](https://pillow.readthedocs.io/en/stable/reference/Image.html#PIL.Image.Image.thumbnail), which keeps the aspect ratio for you.

### scikit-image

Pick scikit-image when you analyze images for research rather than edit them. The project [serves scientific applications over consumer image editing](https://scikit-image.org/docs/stable/about/values.html), and works on plain NumPy arrays instead of fancy image objects. Convert between data types with `img_as_float()` and its siblings, [never `astype()`](https://scikit-image.org/docs/stable/user_guide/data_types.html), which breaks the value ranges its functions expect.

### pyvips

Pick pyvips when images are large or a batch job runs short of memory. You build a pipeline of operations, and pyvips streams the image through it [a section at a time](https://github.com/libvips/pyvips), so it doesn't need to keep the whole image in memory. For thumbnails, call `pyvips.Image.thumbnail()` on the file, which [loads and resizes in one step](https://www.libvips.org/API/current/developer-checklist.html#if-you-can-use-vips_thumbnail-not-vips_resize).

### rembg

rembg is the one listed tool that removes image backgrounds, and it runs as a command-line tool, a Python library, or an HTTP server. For a batch, [create one session with `new_session()`](https://github.com/danielgatis/rembg#usage-as-a-library) and pass it to every `remove()` call. Each model's weights carry [their own license, apart from rembg's](https://github.com/danielgatis/rembg#models), so check it before commercial use.

### Wand

Pick Wand when you want ImageMagick's features from Python through a [Pythonic, modern interface](https://docs.wand-py.org/en/latest/#why-just-another-binding). Wand only binds to ImageMagick, so [install ImageMagick on the system](https://docs.wand-py.org/en/latest/guide/install.html) as well.

### qrcode and python-barcode

qrcode makes QR codes and python-barcode makes linear barcodes like EAN-13 and Code 128, so pick by the symbol you need. In qrcode, `qrcode.make()` covers the quick case, and the [`QRCode` class](https://github.com/lincolnloop/python-qrcode) sets size, border, and error correction. python-barcode's docs [recommend SVG](https://python-barcode.readthedocs.io/en/latest/getting-started.html) unless your target can't show it, since vectors scale better.

### thumbor

Run thumbor when your site needs images resized and cropped on request from a URL, not generated ahead of time. Its [smart detection](https://thumbor.readthedocs.io/en/latest/) finds faces and other important points for better crops. Before going live, [sign URLs with `SECURITY_KEY`](https://thumbor.readthedocs.io/en/latest/security.html) so nobody can tamper with them, and [turn off `ALLOW_UNSAFE_URL`](https://thumbor.readthedocs.io/en/latest/configuration.html#allow-unsafe-url), which its docs warn opens thumbor to DDoS attacks.

### Handling uploaded images

Treat every uploaded image as untrusted: Pillow's security guide names parsing untrusted image data as Pillow's main attack surface, and puts [sandboxed worker processes](https://pillow.readthedocs.io/en/stable/handbook/security.html#recommendations) first in its recommendations. Wand's docs say to [never run it inside an HTTP service](https://docs.wand-py.org/en/latest/guide/security.html), only in a background worker. With pyvips, [set `VIPS_BLOCK_UNTRUSTED`](https://www.libvips.org/API/current/developer-checklist.html#only-enable-the-load-libraries-you-need) and stick to the loaders libvips has tested for security.
