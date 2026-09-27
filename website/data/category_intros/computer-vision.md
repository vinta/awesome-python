Start with OpenCV when you need a Python computer vision library for images and video. To train and run detection models, use Ultralytics YOLO.

How to choose:

- Image and video processing: OpenCV
- Detection, segmentation, and pose models: Ultralytics YOLO
- Vision ops inside a PyTorch model: Kornia
- Dataset curation and model evaluation: FiftyOne
- OCR on clean, printed documents: pytesseract
- OCR on text in photos: EasyOCR

OpenCV comes as [four pip packages that share the `cv2` namespace](https://github.com/opencv/opencv-python), so install only one: opencv-python for the main modules, or opencv-contrib-python to add the extra modules. If you never call `cv2.imshow` or you build your GUI with another toolkit, install the headless variant of either one, which also makes Docker images smaller.

Ultralytics YOLO covers the [whole life of a model](https://docs.ultralytics.com/modes/): train, validate, predict, export, and track, from Python or the `yolo` command. Its docs recommend [starting training from a pretrained model](https://docs.ultralytics.com/modes/train/). To deploy, [export it](https://docs.ultralytics.com/modes/export/) to ONNX, TensorRT, CoreML, or another format. The code and the models you train with it are [AGPL-3.0](https://www.ultralytics.com/license), so unless you open-source your whole project, you need an Enterprise License.

Kornia is a [differentiable computer vision library like OpenCV, with strong GPU support](https://kornia.readthedocs.io/en/latest/get-started/introduction.html). Every operator works on PyTorch tensors and supports autograd, so vision ops can run on the GPU and sit inside your training loop.

FiftyOne works on the data side of a model. [Load your dataset and your model's predictions into it](https://docs.voxel51.com/user_guide/basics.html), then see where the model succeeds and fails, and find mistakes in your labels. It [integrates with Ultralytics](https://docs.voxel51.com/integrations/ultralytics.html), so you can run and fine-tune YOLO models on FiftyOne datasets.

pytesseract [wraps the Tesseract OCR engine](https://github.com/madmaze/pytesseract), which you install on its own, then put on your PATH or point `tesseract_cmd` at. Tesseract suits clean, printed text and needs no GPU. To get better results, [improve the image first](https://tesseract-ocr.github.io/tessdoc/ImproveQuality.html): Tesseract works best at 300 DPI or more, and retraining rarely helps unless you use an unusual font or a new language.

EasyOCR is a [general OCR that reads text in photos as well as in documents](https://www.jaided.ai/easyocr), in dozens of languages. It handles text in photos, where Tesseract struggles, but it's slow without a GPU. Create a `Reader` for your languages [once](https://github.com/JaidedAI/EasyOCR) and reuse it for every image, since that call loads the model into memory.

Ultralytics YOLO, Kornia, and EasyOCR run on PyTorch. When you need a specific CUDA build, install PyTorch before the library, as [Ultralytics](https://docs.ultralytics.com/quickstart/) and [Kornia](https://kornia.readthedocs.io/en/latest/get-started/installation.html) recommend. EasyOCR's README says the same for Windows.
