import sqlite3
import random
import re

# Conectar a la base de datos SQLite
conn = sqlite3.connect("imagenes.db")
cursor = conn.cursor()

# Obtener todas las URLs de la base de datos
cursor.execute("SELECT escudo FROM imagenes")
svg_urls = [row[0] for row in cursor.fetchall()]

# Verificar que haya suficientes URLs en la BBDD
if len(svg_urls) < 200:  # Ajusta según la cantidad de URLs en tu lista original
    print("Error: No hay suficientes URLs en la base de datos.")
    exit()

# Mezclar aleatoriamente las URLs para que no se repitan en orden
random.shuffle(svg_urls)

# Texto con las URLs originales
original_text = """(aquí pega el texto con las URLs actuales)"""

# Expresión regular para encontrar todas las URLs en el texto
url_pattern = re.compile(r"https://via\.placeholder\.com/\d+x\d+\.png/[0-9a-fA-F]+\?text=sports\+\w+")

# Reemplazar las URLs con las de la base de datos sin repetir
def replace_urls(match):
    return svg_urls.pop() if svg_urls else match.group(0)

new_text = url_pattern.sub(replace_urls, original_text)

# Guardar el texto con las URLs actualizadas
with open("updated_urls.txt", "w", encoding="utf-8") as f:
    f.write(new_text)

print("Se han reemplazado las URLs correctamente. Revisa el archivo 'updated_urls.txt'.")
