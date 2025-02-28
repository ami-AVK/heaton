import os
import json
import pandas as pd

# ВАЖНО из файла astro.config.mjs
site = 'https://q-li.ru/'
base = '/heaton'

# Пока оставил доп уровень
temp_add_catalog="Каталог/"
temp_add_catalog=""

def create_json_from_directory(root_dir):
    data = {}

    for excel_file in os.listdir(root_dir):
        if excel_file.startswith('.') or not excel_file.endswith('.xlsx'):
            continue
        excel_path = os.path.join(root_dir, excel_file)
        categoryName = os.path.splitext(excel_file)[0]
        print(f"Processing file: {categoryName}")
        # continue

        try:
            # Чтение листа description
            description_df = pd.read_excel(excel_path, sheet_name='description')
            description_df = description_df.fillna(False)
            description = dict(zip(description_df.iloc[:, 0], description_df.iloc[:, 1]))
            # print(f"Description for {excel_file}: {description}")

            # Чтение листа data
            data_df = pd.read_excel(excel_path, sheet_name='data')
            data_df = data_df.fillna(False)  # Заменяем NaN на False
            # print(f"Data for {excel_file}: {data_df.head()}")

            products = []
            for index, row in data_df.iterrows():
                item_name = row['Наименование']
                model_name = row['Модель']
                type_name = row.get('Тип', '') 
                try:
                    if type_name:
                        # link = f"{temp_add_catalog}{categoryName}/{model_name}/{type_name}/{item_name}"
                        link = f"{temp_add_catalog}{categoryName}/{model_name}/{item_name}"
                    else:
                        link = f"{temp_add_catalog}{categoryName}/{model_name}/{item_name}"
                except:
                    print(f"Error processing row: {row}")
                    continue

                product = row.to_dict()
                # Round weight if it's a float
                if isinstance(product.get('Масса НЕТТО, кг'), float):
                    product['Масса НЕТТО, кг'] = round(product['Масса НЕТТО, кг'], 1)
                
                # Convert power to integer
                if product.get('Теплоотдача, Вт'):
                    product['Теплоотдача, Вт'] = int(float(product['Теплоотдача, Вт']))
                product['url'] = link
                products.append(product)

            data[categoryName] = {
                **description,
                "url":f"{temp_add_catalog}{categoryName}",
                "products": products
            }
        except Exception as e:
            print(f"1111Error processing file {excel_file}: {e}")

    return data

def create_searchMap_from_json(data):
    # Configuration for each category's search map
    search_maps_config = {
        'Стальные панельные радиаторы': {
            'output_file': 'public/search_map_radiator2_power.json',
            'fields': {
                'Наименование': 'name',
                # "Модель": "m",
                'url': 'url',
                'Подключение': 'side',
                'Исполнение': 'hy',
                'Длина, мм': 'l',
                'Высота, мм': 'h',
                'Глубина, мм': 'd',
                'Тип': 't',
                'Теплоотдача, Вт': 'p'
            }
        },
        'Внутрипольные конвекторы': {
            'output_file': 'public/search_map_inFloor_power.json',
            'fields': {
                'Наименование': 'name',
                # "Модель": "m",
                'url': 'url',
                'Длина, мм': 'l',
                'Высота, мм': 'h',
                'Глубина, мм': 'd',
                'Теплоотдача, Вт': 'p',
                'Вентилятор': 'fan'
            }
        },
        'Напольные конвекторы': {
            'output_file': 'public/search_map_floor_power.json',
            'fields': {
                'Наименование': 'name',
                # "Модель": "m",
                'url': 'url',
                'Длина, мм': 'l',
                'Высота, мм': 'h',
                'Глубина, мм': 'd',
                'Теплоотдача, Вт': 'p'
            }
        }
    }

    for category, config in search_maps_config.items():
        if category in data:
            search_map = []
            for product in data[category]['products']:
                item = {}
                for orig_field, new_field in config['fields'].items():
                    if orig_field in product:
                        # Special handling for boolean fields
                        if orig_field == 'Подключение':
                            item[new_field] = product[orig_field] != 'Боковое'
                        elif orig_field == 'Исполнение':
                            item[new_field] = product[orig_field] == 'Гигиеническое'
                        elif orig_field == 'Тип':
                            # Extract number from type (e.g., "11" from "C 11")
                            # item[new_field] = int(product[orig_field].split()[-1][0])
                            item[new_field] = int(product[orig_field])
                        elif orig_field == 'Вентилятор':
                            item[new_field] = product[orig_field] == 'Есть'
                        else:
                            item[new_field] = product[orig_field]
                search_map.append(item)
            
            # Save the search map to a file
            with open(config['output_file'], 'w', encoding='utf-8') as f:
                json.dump(search_map, f, ensure_ascii=False, indent=4)

    return True

def save_json_to_file(data, output_file):
    with open(output_file, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    root_directory = 'data'  # Путь к папке с эксельками
    output_file = 'src/data/site.json'  # Укажите имя выходного JSON-файла
    data = create_json_from_directory(root_directory)
    searchesMaps = create_searchMap_from_json(data)
    save_json_to_file(data, output_file)
    print(f"JSON-файл сохранен в {output_file}")
