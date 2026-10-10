OpenCV processes images and video. Training your own detector needs more than a Python computer vision library scoped to inference, so reach for Ultralytics.

How to choose:

- Reading, editing, and analyzing images and video: OpenCV
- Detecting, segmenting, or tracking objects with a trained model: Ultralytics
- Image operations inside a PyTorch model or training loop: Kornia
- Browsing a dataset, finding label mistakes, and seeing where a model fails: FiftyOne
- Printed text in clean scans: pytesseract
- Text in photos or degraded scans: EasyOCR
- Tables and page layouts, turned into Markdown or JSON: PaddleOCR

OpenCV's Python bindings [convert every OpenCV array to and from a NumPy array](https://github.com/opencv/opencv/blob/5.x/doc/py_tutorials/py_setup/py_intro/py_intro.markdown), so the images you load work with any other library that uses NumPy.

Ultralytics runs YOLO models for detection, segmentation, pose estimation, and tracking from [one Python package and CLI](https://docs.ultralytics.com/). Load a pretrained model and [call `.train()` on your own dataset](https://docs.ultralytics.com/guides/finetuning-guide/): the weights carry over with no extra code. Ultralytics is AGPL, so [using it without open-sourcing your project](https://www.ultralytics.com/license) takes its Enterprise License.

Kornia is [a differentiable computer vision library like OpenCV, with strong GPU support](https://kornia.readthedocs.io/en/latest/get-started/introduction.html), built on PyTorch tensors. Its FAQ states the split: Kornia [provides operators to train networks, while OpenCV's scope is inference](https://kornia.readthedocs.io/en/latest/community/faqs.html).

FiftyOne is for building better datasets. [Load your images and labels as a Dataset](https://docs.voxel51.com/user_guide/basics.html) to search and sort samples and spot label mistakes. Then add your model's predictions and [evaluate them sample by sample](https://docs.voxel51.com/user_guide/evaluation/index.html) in the FiftyOne App to see where it goes wrong.

pytesseract is [a wrapper for Google's Tesseract engine](https://github.com/madmaze/pytesseract), which you install on its own. `image_to_string()` returns the text, and `image_to_data()` adds boxes and confidences.

EasyOCR reads [many languages and scripts](https://github.com/JaidedAI/EasyOCR) with deep learning models on PyTorch. [Create one `Reader` and reuse it](https://www.jaided.ai/easyocr/tutorial/): it loads the models into memory once, then reads as many images as you give it.

PaddleOCR does two jobs: [general OCR](https://www.paddleocr.ai/latest/en/version3.x/pipeline_usage/OCR.html) reads text, and document parsing [turns PDFs and document images into Markdown and JSON](https://www.paddleocr.ai/latest/en/index.html) that keep the original structure.

Load and crop images with OpenCV, then pass the NumPy arrays on: [EasyOCR](https://www.jaided.ai/easyocr/tutorial/), [PaddleOCR](https://www.paddleocr.ai/latest/en/version3.x/pipeline_usage/OCR.html), and [Ultralytics](https://docs.ultralytics.com/modes/predict/) all take them as input.
