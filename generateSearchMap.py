import os
import csv
import json
import re

import pandas as pd

# ВАЖНО из файла astro.config.mjs
site = 'https://q-li.ru/'
base = '/heaton'


def clean_string(input_string):
    # Регулярное выражение для поиска "( число)" или "(числочисло)"
    pattern = r" \(.{1,3}\)"
    # Удаление всех вхождений найденного шаблона
    cleaned_string = re.sub(pattern, "", input_string)
    return cleaned_string

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
                                link = os.path.join("Каталог",category, model, type_name, item_name)
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
def create_json_from_directory_powerSearch(root_dir):
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
                                link = os.path.join("Каталог",category, clean_string(model), item_name)
                                print(link)
                            except:
                                print(row)
                                continue

                            side = model in ["Compact (C)", "Hygiene Compact (HC)"]
                            hygiene = model in ["Hygiene Compact (HC)", "Hygiene Ventil Compact (HVC)"]
                            width = int(row['Длина, мм'])
                            height = int(row['Высота, мм'])
                            power = int(row['Теплоотдача, Вт'])
                            panels = int(type_name[0])

                            data.append({
                                "name": item_name,
                                "url": link,
                                "side": side,
                                "hygiene": hygiene,
                                "width": width,
                                "height": height,
                                "panels": panels,
                                "power": power
                            })
    # Сортируем данные по мощности
    data.sort(key=lambda x: x['power'])
    
    return data

def save_json_to_file(data, output_file):
    with open(output_file, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    root_directory = 'src/data'  # Укажите путь к корневой директории
    output_file = 'public/search_map_radiator_power.json'  # Укажите имя выходного JSON-файла
    # data = create_json_from_directory(root_directory)
    data = create_json_from_directory_powerSearch(root_directory)
    save_json_to_file(data, output_file)
    print(f"JSON-файл сохранен в {output_file}")