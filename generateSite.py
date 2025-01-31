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
                        link = f"{temp_add_catalog}{categoryName}/{model_name}/{type_name}/{item_name}"
                    else:
                        link = f"{temp_add_catalog}{categoryName}/{model_name}/{item_name}"
                except:
                    print(f"Error processing row: {row}")
                    continue

                product = row.to_dict()
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

def save_json_to_file(data, output_file):
    with open(output_file, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    root_directory = 'data'  # Путь к папке с эксельками
    output_file = 'src/data/site.json'  # Укажите имя выходного JSON-файла

    data = create_json_from_directory(root_directory)
    save_json_to_file(data, output_file)
    print(f"JSON-файл сохранен в {output_file}")
