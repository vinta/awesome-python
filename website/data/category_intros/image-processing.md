Pillow handles everyday edits, so it's the default Python image processing library. Use scikit-image for scientific analysis, and pyvips when memory is tight.

How to choose:

- Resizing, cropping, and converting images: Pillow
- Scientific image analysis on NumPy arrays: scikit-image
- Large images, or many of them, with little memory: pyvips
- ImageMagick's features from Python: Wand
- Removing photo backgrounds: rembg
- Resizing and cropping images on demand over HTTP: thumbor
- QR codes: qrcode
- Barcodes: python-barcode

Pillow is [ideal for batch processing](https://pillow.readthedocs.io/en/stable/handbook/overview.html), like making thumbnails and converting between file formats. Open each file in a `with Image.open(path) as im:` block. Opening is [fast and independent of the file size](https://pillow.readthedocs.io/en/stable/handbook/tutorial.html), since Pillow reads the pixels only when it has to. To fit an image to a size, use `ImageOps.contain()`, `cover()`, `fit()`, or `pad()`. `thumbnail()` works too, but it [changes the image in place](https://pillow.readthedocs.io/en/stable/handbook/tutorial.html#relative-resizing).

scikit-image [aims to be the reference library for scientific image analysis](https://scikit-image.org/docs/stable/about/values.html) in Python, and puts science ahead of photo editing. Images are plain NumPy arrays, so [standard NumPy operations](https://scikit-image.org/docs/stable/user_guide/numpy_images.html) work on them. To change an image's dtype, use `img_as_float()` or `img_as_ubyte()`, [never `astype`](https://scikit-image.org/docs/stable/user_guide/data_types.html), which doesn't rescale the values to the new dtype's range.

pyvips builds a pipeline of operations and runs it only when you write the result. It streams the image a section at a time, so it [doesn't keep whole images in memory](https://github.com/libvips/pyvips). To shrink an image, use `pyvips.Image.thumbnail()` instead of resizing: it [loads and resizes in one step](https://www.libvips.org/API/current/developer-checklist.html), which is faster and uses less memory. When you read an image from top to bottom, open it with [`access="sequential"`](https://libvips.github.io/pyvips/intro.html).

Wand is a [ctypes-based ImageMagick binding](https://docs.wand-py.org/en/latest/), so install ImageMagick's MagickWand library first. Its objects are resources like open files: [use them in a `with` block](https://docs.wand-py.org/en/latest/guide/resource.html) so they get closed. Wand's docs say to [never use Wand directly in an HTTP service](https://docs.wand-py.org/en/latest/guide/security.html) or on any public server. Hand the images to a background worker through a queue, and limit ImageMagick's resources and formats in its `policy.xml`.

rembg runs as a [CLI, a Python library, an HTTP server, or a Docker container](https://github.com/danielgatis/rembg). In code, create a session once with `new_session()` and pass it to each `remove()` call, since `remove` otherwise [starts a new session every call](https://github.com/danielgatis/rembg/blob/main/USAGE.md). The model weights [carry their own licenses](https://github.com/danielgatis/rembg), separate from rembg's MIT license, so check the one you use before you ship it in a commercial product.

thumbor is an HTTP server: you [set the size and crop in the image URL](https://github.com/thumbor/thumbor), and it [detects faces and important features](https://thumbor.readthedocs.io/en/latest/) to crop around them. Set a `SECURITY_KEY` so [every URL is signed](https://thumbor.readthedocs.io/en/latest/security.html) and nobody can tamper with it, and build those URLs in Python with [libthumbor](https://thumbor.readthedocs.io/en/latest/libraries.html). In production, [turn off `ALLOW_UNSAFE_URL`](https://thumbor.readthedocs.io/en/latest/configuration.html) and run [more than one instance](https://thumbor.readthedocs.io/en/latest/hosting.html) behind a load balancer.

qrcode makes a QR code in one call: `qrcode.make("Some data")`. For more control, use the `QRCode` class, and pass `version=None` with `make(fit=True)` to pick the size for you. For SVG output, the README [recommends the path factory](https://github.com/lincolnloop/python-qrcode), `SvgPathImage`. If you style the code or embed an image, set error correction to high, since styled codes aren't guaranteed to work with all readers.

python-barcode writes SVG with [no external dependencies](https://python-barcode.readthedocs.io/en/latest/). For PNG and other images, install the `python-barcode[images]` extra, which adds Pillow. Its docs [recommend SVG](https://python-barcode.readthedocs.io/en/latest/getting-started.html) unless your target can't use it, since vectors scale better. It calculates the checksum for you.

Treat every uploaded image as untrusted. Pillow [guards against decompression bombs](https://pillow.readthedocs.io/en/stable/reference/Image.html) with a pixel limit, and its `Image.open(formats=...)` argument restricts the formats it tries. With pyvips, check the image dimensions before you process it, and [block the loaders](https://www.libvips.org/API/current/developer-checklist.html) libvips hasn't tested for security. With Wand, check each file's [magic bytes](https://docs.wand-py.org/en/latest/guide/security.html), never its extension or MIME type.
