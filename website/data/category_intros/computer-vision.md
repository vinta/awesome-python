For a Python computer vision library, start with OpenCV, and add Ultralytics YOLO to detect objects. For OCR, use pytesseract for scans and EasyOCR for photos.

How to choose:

- Reading, transforming, and writing images and video: OpenCV
- Detecting, segmenting, or tracking objects with a pretrained model: Ultralytics YOLO, which is AGPL-3.0 unless you buy an Enterprise License
- Image processing and augmentation on GPU batches, inside a PyTorch model or training loop: Kornia
- Browsing a dataset, finding label mistakes, and seeing where a model fails: FiftyOne
- Scanned pages and documents: pytesseract, on top of a Tesseract engine you install yourself
- Text in photos, without a separate OCR engine to install: EasyOCR

OpenCV ships as four wheels on PyPI, and you install exactly one, since they all use the same `cv2` namespace. On a server or in Docker, pick `opencv-python-headless`, which leaves out the GUI libraries. The opencv-python README says [you should always use it](https://github.com/opencv/opencv-python#installation-and-usage) unless you call `cv2.imshow`. The wheels are CPU-only; for CUDA, you build OpenCV from source.

With Ultralytics YOLO, load a pretrained checkpoint with `YOLO()`, fine-tune it with `model.train()`, and ship it with `model.export(format="onnx")`. Check the license before you build a product on it. Ultralytics says an Enterprise License is ["required if you want to use Ultralytics YOLO without open-sourcing your entire project"](https://www.ultralytics.com/license), even for models you trained yourself.

Kornia works on PyTorch tensors, so its operators ["run wherever the tensor lives"](https://kornia.readthedocs.io/en/latest/) and take a whole batch in one call. Gradients flow through them too, so they can sit inside your model or your loss. Its augmentations expect [float tensors in [0, 1]](https://kornia.readthedocs.io/en/latest/augmentation.html): one still in [0, 255] doesn't raise an error, it just clips.

With FiftyOne, load your images and your model's predictions into a `fo.Dataset` and browse them with `fo.launch_app()`. Then run `compute_mistakenness()` to rank likely label mistakes, which [create an artificial ceiling](https://docs.voxel51.com/brain/index.html) on how good your model can get. Before you trust a test score, run `compute_leaky_splits()` too: duplicates across train and test make it easy to [overestimate your model](https://docs.voxel51.com/brain/index.html#leaky-splits).

pytesseract wraps the `tesseract` command, so install Tesseract separately and make sure it's on your `PATH`. Pass `lang=` for anything but English. Tesseract works best at 300 DPI or more, so scale small images up. It also [expects a page of text](https://tesseract-ocr.github.io/tessdoc/ImproveQuality.html) by default, so for a single line, pass `config="--psm 7"`.

With EasyOCR, create one `easyocr.Reader` and reuse it: loading the model takes a while, and it [needs to be run only once](https://github.com/JaidedAI/EasyOCR#usage).

Watch the channel order when you pass images between libraries. OpenCV [loads color images as BGR](https://docs.opencv.org/4.x/d4/da8/group__imgcodecs.html). Ultralytics YOLO and EasyOCR take OpenCV images as they are, but pytesseract assumes RGB, so convert first with `cv2.cvtColor(img, cv2.COLOR_BGR2RGB)`.
