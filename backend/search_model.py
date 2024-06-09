import torch
from torchvision import transforms, models
from PIL import Image
import os

dir_path = os.path.dirname(os.path.realpath(__file__))

image_search_model = models.inception_v3(weights='DEFAULT')

NUM_FEATURES = image_search_model.fc.in_features
NUM_CLASSES = 19

image_search_model.fc = torch.nn.Sequential(
                        torch.nn.Linear(NUM_FEATURES, 512),
                        torch.nn.ReLU(inplace=True),
                        torch.nn.Dropout(0.5),
                        torch.nn.Linear(512, NUM_CLASSES),
                    )

image_search_model.load_state_dict = torch.load(os.path.join(dir_path,'static/model/torch_search_model.pth'))

image_search_model.eval()

transform_image = transforms.Compose([
    transforms.Resize((299, 299)),
    transforms.RandomAffine(0, shear=20, scale=(0.8, 1.2)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

def predict_image(image_path):
    image = transform_image(Image.open(image_path)).unsqueeze(0)
    with torch.no_grad():
        output = image_search_model(image)
    prob = torch.softmax(output[0], dim = 0)
    return prob
    
