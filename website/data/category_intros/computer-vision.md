Analyze images and video with OpenCV, and train object detectors with Ultralytics. For OCR, pytesseract reads clean print, and PaddleOCR rotated or noisy scans.

How to choose:

- Image and video processing, feature detection, and camera work: OpenCV
- Training your own detection, segmentation, or pose model: Ultralytics
- Clean printed text on a CPU, with the lightest setup: pytesseract
- Rotated, noisy, or low-resolution scans, Chinese text, and tables: PaddleOCR
- Image operations inside a PyTorch model, on GPU batches: Kornia
- A pretrained object detector for code that can't take AGPL: Kornia
- Curating a dataset and finding where your model fails: FiftyOne
- The quickest OCR to add to PyTorch code: EasyOCR

### OpenCV

Start with OpenCV for image and video work: filtering, geometric transforms, feature detection, camera calibration, and video analysis. Move to Kornia when the same operations run on GPU batches inside a PyTorch model. Kornia's own README says [OpenCV wins single-image `uint8` CPU work](https://github.com/kornia/kornia#when-to-use-kornia). OpenCV's Python bindings [work on NumPy arrays](https://docs.opencv.org/4.x/d0/de3/tutorial_py_intro.html): `cv2.imread()` loads an image as one, so you can pass it straight to other NumPy-based libraries.

### Ultralytics

Pick Ultralytics to train your own object detection, segmentation, or pose model. One package covers [the full lifecycle](https://docs.ultralytics.com/modes/): training, validation, prediction, export, and tracking. Start from the `YOLO` class with pretrained weights, and fine-tune it on your own data. Ultralytics is AGPL, and its [license page](https://www.ultralytics.com/license) says you need its paid Enterprise License to use it without open-sourcing your whole project. To run a pretrained detector without those terms, Kornia ships an [Apache-licensed one](https://kornia.readthedocs.io/en/latest/models/rt_detr.html).

### Kornia

Pick Kornia when image operations run inside a PyTorch model or training loop. Its FAQ says Kornia provides [differentiable operators to train networks](https://kornia.readthedocs.io/en/latest/community/faqs.html), so gradients pass through your image operations. For augmentation, [`AugmentationSequential`](https://kornia.readthedocs.io/en/latest/augmentation.html) applies one random draw to an image and its masks, boxes, and keypoints, so your labels stay in sync.

### FiftyOne

Pick FiftyOne to curate a dataset and see [where your models succeed and fail](https://docs.voxel51.com/). It works alongside the other picks rather than replacing them: you can [run your Ultralytics models](https://docs.voxel51.com/integrations/ultralytics.html) on a FiftyOne dataset. Evaluate predictions with `evaluate_detections()`, which can record results on every sample.

### pytesseract

Pick pytesseract for clean printed text on a CPU, with the lightest setup. It wraps the Tesseract engine, which you [install separately](https://github.com/madmaze/pytesseract#installation), and `image_to_string()` returns an image's text. Tesseract [works best at 300 DPI or more](https://tesseract-ocr.github.io/tessdoc/ImproveQuality.html), on straight and clean scans, so resize, deskew, and threshold your images with OpenCV first.

### EasyOCR

Pick EasyOCR for the quickest OCR in code already on PyTorch, which it runs on. When scans get hard, reach for PaddleOCR. Create one `easyocr.Reader` for your languages and reuse it, since loading the model [takes time but needs to run only once](https://github.com/JaidedAI/EasyOCR#usage).

### PaddleOCR

Pick PaddleOCR for hard input: rotated, noisy, or low-resolution scans, and Chinese or multilingual text. Its OCR pipeline can [correct rotated and warped pages](https://www.paddleocr.ai/latest/en/version3.x/pipeline_usage/OCR.html) before reading them, and its document parsing turns [PDFs and images into Markdown or JSON](https://github.com/PaddlePaddle/PaddleOCR), tables included. Integrate it through the `PaddleOCR` class, since its docs keep the command line for quick tests.
