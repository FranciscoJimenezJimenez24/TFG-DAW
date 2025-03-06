import cloudinary
import cloudinary.uploader
from bs4 import BeautifulSoup
import os

# Configuración de Cloudinary
cloudinary.config(
    cloud_name="diyzi4fll",
    api_key="537169441424168",
    api_secret="ObxNA8rrpsm9IeBuDKMtExcp5Nw"
)

# Leer el archivo HTML
with open('html.html', 'r', encoding='utf-8') as file:
    html_content = file.read()

# Parsear el HTML
soup = BeautifulSoup(html_content, 'html.parser')

# Buscar todas las etiquetas <svg>
svg_tags = soup.find_all('svg')

# Carpeta temporal para guardar los SVG
if not os.path.exists("svgs"):
    os.makedirs("svgs")

# Subir cada SVG a Cloudinary
for i, svg in enumerate(svg_tags):
    file_path = f"svgs/svg_{i}.svg"

    # Guardar el descripcion SVG en un archivo
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(str(svg))

    # Subir a Cloudinary
    try:
        response = cloudinary.uploader.upload(file_path, resource_type="raw")
        print(f"Imagen subida: {response['secure_url']}")
    except Exception as e:
        print(f"Error al subir {file_path}: {e}")
