import os
import csv
import json

import pandas as pd

# ВАЖНО из файла astro.config.mjs
site = 'https://q-li.ru/'
base = '/heaton'

def create_json_from_directory(root_dir):
    data = []

    for category in os.listdir(root_dir):
        if category.startswith('.'):
            continue
        category_path = os.path.join(root_dir, category)
        if os.path.isdir(category_path):
            for model in os.listdir(category_path):
                if model.startswith('.'):
                    continue
                model_path = os.path.join(category_path, model)
                if os.path.isdir(model_path):
                    for csv_file in os.listdir(model_path):
                        if csv_file.startswith('.') or not csv_file.endswith('.csv'):
                            continue
                        csv_path = os.path.join(model_path, csv_file)
                        
                        type_name = os.path.splitext(csv_file)[0]
                        df = pd.read_csv(csv_path, sep=";")
                        for index, row in df.iterrows():
                            
                            item_name = row['Модель']
                            
                            try:
                                # link = os.path.join(f"{base}/",category, model, type_name, item_name)
                                link = os.path.join(category, model, type_name, item_name)
                            except:
                                print(row)
                                continue
                            print(link)
                            data.append({
                                "Категория": category,
                                "Модель": model,
                                "Тип": type_name,
                                "Наименование": item_name,
                                "Ссылка": link
                            })

    return data

def save_json_to_file(data, output_file):
    with open(output_file, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    root_directory = 'src/data'  # Укажите путь к корневой директории
    output_file = 'public/search_map.json'  # Укажите имя выходного JSON-файла

    data = create_json_from_directory(root_directory)
    save_json_to_file(data, output_file)
    print(f"JSON-файл сохранен в {output_file}")